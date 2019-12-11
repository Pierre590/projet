const apiKey =  'AIzaSyCVSLXtRTC8faqAGPBehdWnVkY7reCe1ck'
const clientId = '699258154622-t9og9u5681snjbtjktobs02lmq4p19ds.apps.googleusercontent.com'

const displayUser = document.getElementById('user')
const displayName = document.getElementById('name')

const btnLogin = document.getElementById('login')
const btnLogout = document.getElementById('logout')

let auth
let user

function initGAuth () {
  console.log('init')
  auth = gapi.auth2.getAuthInstance()
  auth.isSignedIn.listen(sigin)
  sigin()
}

function sigin () {
  const isSignedIn = auth.isSignedIn.get()
  if (isSignedIn) {
    user = auth.currentUser.get()
    displayUser.style.display = 'inline-block'
    displayName.textContent = user.getBasicProfile().getName()
    btnLogin.style.display = 'none'
    btnLogout.style.display = 'inline-block'

  } else {
    user = null
    displayUser.style.display = 'none'
    btnLogin.style.display = 'inline-block'
    btnLogout.style.display = 'none'
  }
  console.log(user)
}

function loginGoogle () {
  auth.signIn()
}

function logoutGoogle () {
  auth.signOut();
}

if (typeof gapi === 'object' && gapi.load) {
  gapi.load('client', () => {
    gapi.client.init({
      apiKey: apiKey,
      clientId: clientId,
      scope: 'profile',
    }).
    then(initGAuth)
  })
}
