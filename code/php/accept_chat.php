<?php

if (!isset($_POST['chatNum'], $_POST['username'], $_POST['phoneNumber'])) {
    http_response_code(400);
    echo json_encode(array("error" => "Missing parameters"));
    exit;
}


$chatNum = $_POST['chatNum'];
$username = $_POST['username'];
$phoneNumber = $_POST['phoneNumber'];


$host = 'localhost';
$dbUsername = 'admin';
$dbPassword = 'admin';
$database = 'final';


$conn = new mysqli($host, $dbUsername, $dbPassword, $database);


if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(array("error" => "Connection failed: " . $conn->connect_error));
    exit;
}


$updateQuery = "UPDATE `$chatNum` SET accepted=1 WHERE phoneNumber='$username'";
$stmt = $conn->prepare($updateQuery);


if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(array("message" => "Chat accepted successfully"));
    } else {
        http_response_code(404);
        echo json_encode(array("error" => "No rows updated. Username: $username not found in the chat: $chatNum"));
    }
} else {
    http_response_code(500);
    echo json_encode(array("error" => "Error executing statement: " . $stmt->error));
}


$stmt->close();


$conn->close();
?>
