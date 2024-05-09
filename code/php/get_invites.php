<?php

$host = 'localhost';
$username = 'admin';
$password = 'admin';
$database = 'final';


$conn = new mysqli($host, $username, $password, $database);


if ($conn->connect_error) {
    die(json_encode(array('error' => 'Database connection failed: ' . $conn->connect_error)));
}


$username = $_GET['username'];


$stmt = $conn->prepare("SELECT invites FROM invites WHERE number = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->bind_result($invites);

$response = array();

if ($stmt->fetch()) {

    $invitesArray = explode(" ", $invites);
                    // kaboom
    $invitesArray = array_filter($invitesArray, function($value) {
        return $value !== '';
    });

    $response['invites'] = array_values($invitesArray); 
} else {
    $response['error'] = "No invites found for this username";
}


$stmt->close();
$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
?>
