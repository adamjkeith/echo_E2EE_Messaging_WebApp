<?php
$host = 'localhost';
$username = 'admin';
$password = 'admin';
$database = 'final';
$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$phone = $_POST['phone'];
$sql = "SELECT * FROM logins WHERE number = '$phone'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    header("Location: ../login.html");
} else {
    header("Location: ../register.html");
}
$conn->close();
?>
