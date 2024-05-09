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
$sql = "SELECT `key` FROM logins WHERE number = '$phoneNumber'";
$result = $conn->query($sql);
$response = array();
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $encryptedSecret = $row['key'];
    $response['success'] = true;
    $response['data'] = array('secret' => $encryptedSecret);
} else {
    $response['success'] = false;
    $response['error'] = "No record found for phone number: $phoneNumber";
}
$conn->close();
header('Content-Type: application/json');
echo json_encode($response);
?>
