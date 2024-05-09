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

// Construct the SQL query to drop the table
$sql = "DROP TABLE IF EXISTS `$cookieValue`"; // Using backticks to treat the table name as a string

// Execute the query
if ($conn->query($sql) === TRUE) {
    echo "Table dropped successfully";
} else {
    echo "Error dropping table: " . $conn->error;
}

// Close connection
$conn->close();

?>
