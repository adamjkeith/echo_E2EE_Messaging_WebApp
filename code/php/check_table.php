<?php

// Connection information
$host = 'localhost';
$dbUsername = 'admin';
$dbPassword = 'admin';
$database = 'final';

// Get the cookie value from the POST data
$cookieValue = $_POST['cookieValue'];

// Create connection
$conn = new mysqli($host, $dbUsername, $dbPassword, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Construct the SQL query to check if the table exists
$sql = "SHOW TABLES LIKE '$cookieValue'";

// Execute the query
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Table exists
    echo "0";
} else {
    // Table does not exist
    echo "1";
}

// Close connection
$conn->close();

?>
