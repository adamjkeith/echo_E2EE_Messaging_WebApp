<?php
$host = 'localhost';
$username = 'admin';
$password = 'admin';
$database = 'final';


$conn = new mysqli($host, $username, $password, $database);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$phoneNumber = $_POST['phoneNumber'];


$sql = "SELECT * FROM logins WHERE number = '$phoneNumber'";
$result = $conn->query($sql);

$response = array();
if ($result->num_rows > 0) {

    $response['exists'] = true;
} else {

    $response['exists'] = false;
}

echo json_encode($response);

$conn->close();
?>
