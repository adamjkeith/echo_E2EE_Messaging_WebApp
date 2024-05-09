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


$cookieValue = $conn->real_escape_string($cookieValue);


$sql = "SELECT phoneNumber FROM `$cookieValue`"; 
$result = $conn->query($sql);

$response = "00000000000"; 

if ($result) {
    if ($result->num_rows > 0) {

        while ($row = $result->fetch_assoc()) {

            $localStoragePhoneNumber = $_POST['localStoragePhoneNumber'];
            if ($row['phoneNumber'] != $localStoragePhoneNumber) {

                $response = $row['phoneNumber'];
                break;
            }
        }
    }
} else {
    echo "Error: " . $conn->error; 
}

$conn->close();


echo $response;
?>
