<?php

$host = 'localhost';
$dbUsername = 'admin';
$dbPassword = 'admin';
$database = 'final';


$conn = new mysqli($host, $dbUsername, $dbPassword, $database);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$encryptedMessage = $_POST['encryptedMessage'];
$cookieValue = $_POST['cookieValue'];
$phoneNumber = $_POST['phoneNumber'];

$sql = "SELECT * FROM `$cookieValue` WHERE phoneNumber = '$phoneNumber'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

    $row = $result->fetch_assoc();
    $existingMessage = $row['message'];
    if ($existingMessage != '') {
 
        $newMessage = $existingMessage . ' ' . $encryptedMessage;
    } else {

        $newMessage = $encryptedMessage;
    }

    $updateSql = "UPDATE `$cookieValue` SET message='$newMessage' WHERE phoneNumber='$phoneNumber'";
    if ($conn->query($updateSql) === TRUE) {
        echo "Message updated successfully";
    } else {
        echo "Error updating message: " . $conn->error;
    }
} else {

    $insertSql = "INSERT INTO `$cookieValue` (phoneNumber, message) VALUES ('$phoneNumber', '$encryptedMessage')";
    if ($conn->query($insertSql) === TRUE) {
        echo "New message inserted successfully";
    } else {
        echo "Error inserting message: " . $conn->error;
    }
}

$conn->close();
?>
