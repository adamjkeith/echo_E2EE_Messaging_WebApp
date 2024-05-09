<?php
$host = 'localhost';
$username = 'admin';
$password = 'admin';
$database = 'final';
$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$key = $_POST['key'];
$encryptedSecret = $_POST['encryptedSecret'];
$stmt = $conn->prepare("INSERT INTO logins (`number`, `key`) VALUES (?, ?)");
$stmt->bind_param("ss", $key, $encryptedSecret);
if ($stmt->execute()) {
    echo "Data inserted successfully";
} else {
    echo "Error: " . $stmt->error;
}
$stmt->close();
$conn->close();
?>
