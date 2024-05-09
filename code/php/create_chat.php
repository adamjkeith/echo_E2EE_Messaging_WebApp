<?php

$host = 'localhost';
$username = 'admin';
$password = 'admin';
$database = 'final';


$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$chatNum = $conn->real_escape_string($_POST['chatNum']);
$username = $conn->real_escape_string($_POST['username']);
$phoneNumber = $conn->real_escape_string($_POST['phoneNumber']);


$table_check_query = "SHOW TABLES LIKE '$chatNum'";
$table_check_result = $conn->query($table_check_query);

if ($table_check_result->num_rows == 0) {

    $create_table_sql = "CREATE TABLE `$chatNum` (
        phoneNumber VARCHAR(11) NOT NULL,
        accepted BOOLEAN NOT NULL,
        message TEXT NOT NULL
    )";

    if ($conn->query($create_table_sql) === TRUE) {
        echo "Table $chatNum created successfully\n";
    } else {
        echo "Error creating table: " . $conn->error . "\n";
    }
} else {
    echo "Table $chatNum already exists\n";
}


$insert_row1_sql = "INSERT INTO `$chatNum` (phoneNumber, accepted) VALUES ('$phoneNumber', 0)";

if ($conn->query($insert_row1_sql) === TRUE) {
    echo "Row inserted successfully\n";
} else {
    echo "Error inserting row: " . $conn->error . "\n";
}


$insert_row2_sql = "INSERT INTO `$chatNum` (phoneNumber, accepted) VALUES ('$username', 1)";

if ($conn->query($insert_row2_sql) === TRUE) {
    echo "Row inserted successfully\n";
} else {
    echo "Error inserting row: " . $conn->error . "\n";
}


$conn->close();
?>
