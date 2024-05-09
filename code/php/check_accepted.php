<?php
$host = 'localhost';
$username = 'admin';
$password = 'admin';
$database = 'final';
$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$chatNum = $_GET['chatNum'];


$escapedChatNum = $conn->real_escape_string($chatNum);


$sql = "SHOW TABLES LIKE '$escapedChatNum'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {

    $sql = "SELECT accepted FROM `$escapedChatNum`";
    $result = $conn->query($sql);
    
    if ($result && $result->num_rows > 0) {
        $allAccepted = true;
        while ($row = $result->fetch_assoc()) {
            if ($row['accepted'] != 1) {
                $allAccepted = false;
                break;
            }
        }
        if ($allAccepted) {
            echo "accepted";
        } else {
            echo "unknown"; 
        }
    } else {
        echo "unknown";
    }
} else {

    echo "unknown"; 
}

$conn->close();
?>
