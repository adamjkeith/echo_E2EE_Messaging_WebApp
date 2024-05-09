<?php

$host = 'localhost';
$username = 'admin';
$password = 'admin';
$database = 'final';


$conn = new mysqli($host, $username, $password, $database);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if(isset($_POST['username']) && isset($_POST['phoneNumber'])) {
    $username = $_POST['username'];
    $phoneNumber = $_POST['phoneNumber'];

 
    $checkQuery = "SELECT * FROM invites WHERE number = '$phoneNumber'";
    $checkResult = $conn->query($checkQuery);

    if ($checkResult->num_rows > 0) {
       
        $row = $checkResult->fetch_assoc();
        $existingInvite = $row['invites'];

        if (strpos($existingInvite, $username) !== false) {
            echo json_encode(array('success' => false, 'error' => 'Invite already sent to this user.'));
        } else {

            $newInvite = trim($existingInvite . ' ' . $username);
            

            $updateQuery = "UPDATE invites SET invites = '$newInvite' WHERE number = '$phoneNumber'";
            if ($conn->query($updateQuery) === TRUE) {
                echo json_encode(array('success' => true));
            } else {
                echo json_encode(array('success' => false, 'error' => 'Error updating record.'));
            }
        }
    } else {

        $insertQuery = "INSERT INTO invites (number, invites) VALUES ('$phoneNumber', '$username')";
        if ($conn->query($insertQuery) === TRUE) {
            echo json_encode(array('success' => true));
        } else {
            echo json_encode(array('success' => false, 'error' => 'Error inserting record.'));
        }
    }
} else {
    echo json_encode(array('success' => false, 'error' => 'Username or phone number not provided.'));
}

$conn->close();
?>
