<?php

$host = 'localhost';
$dbUsername = 'admin';
$dbPassword = 'admin';
$database = 'final';

$conn = new mysqli($host, $dbUsername, $dbPassword, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$cookieValue = $_POST['cookieValue'];
$phoneNumber = $_POST['phoneNumber'];

$cookieValue = $conn->real_escape_string($cookieValue);
$phoneNumber = $conn->real_escape_string($phoneNumber);

$sql = "SELECT message FROM `$cookieValue` WHERE phoneNumber='$phoneNumber'";
$result = $conn->query($sql);

$response = ""; 

if ($result) {
    if ($result->num_rows > 0) {

        while ($row = $result->fetch_assoc()) {

            $response .= $row['message'] . "\n";
        }
    } else {

        $response = "No messages found for the given phoneNumber.";
    }
} else {

    $response = "Error: " . $conn->error;
}


$conn->close();

echo $response;
?>
