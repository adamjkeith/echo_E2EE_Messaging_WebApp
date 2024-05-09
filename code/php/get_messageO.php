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
$username2 = $_POST['username2'];


$cookieValue = $conn->real_escape_string($cookieValue);
$username2 = $conn->real_escape_string($username2);


$sql = "SELECT message FROM `$cookieValue` WHERE phoneNumber='$username2'";
$result = $conn->query($sql);

$response = ""; 

if ($result) {
    if ($result->num_rows > 0) {
  
        while ($row = $result->fetch_assoc()) {

            $response .= $row['message'] . "\n";
        }
    }
} else {
    echo "Error: " . $conn->error; 
}


$conn->close();


echo $response;
?>
