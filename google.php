<?php

session_start();

header('Content-Type: application/json');

require_once 'vendor/autoload.php';

$clientId = '699258154622-t9og9u5681snjbtjktobs02lmq4p19ds.apps.googleusercontent.com';

$idToken = isset($_POST ['id_token']) ? (string) $_POST ['id_token'] : null;

if (!$idToken) {
    http_response_code(406);
    echo json_encode([
        'error' => "token n'existe pas !",
    ]);
    die;
}

$client = new Google_Client([
    'client_id' => $clientId
]);

try {
    $payload = $client->verifyIdToken($idToken);
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode([
        'error' => "token ivalide !",
    ]);
    die;
}

$userId = $payload['sub'];

$_SESSION ['uid'] = $userId;
$_SESSION ['name'] = $payload['name'];
$_SESSION ['email'] = $payload['email'];
$_SESSION ['picture'] = $payload['picture'];

echo json_encode ($payload);


 ?>
