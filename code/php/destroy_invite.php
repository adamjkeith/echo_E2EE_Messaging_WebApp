<?php
// Database connection parameters
$host = 'localhost';
$username = 'admin';
$password = 'admin';
$database = 'final';

// Establish connection to the database
$connection = mysqli_connect($host, $username, $password, $database);

// Check connection
if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

// Assuming $username contains the username and $invite contains the new invite
$username = mysqli_real_escape_string($connection, $_POST['username']); // Assuming you're getting username from a POST request
$invite = mysqli_real_escape_string($connection, $_POST['inviteNumber']); // Assuming you're getting inviteNumber from a POST request

// Retrieve the value from the 'invites' column where number matches the given username
$sqlSelect = "SELECT invites FROM invites WHERE number = '$username'";
$result = mysqli_query($connection, $sqlSelect);

if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $currentInvites = $row['invites'];
    
    // Explode the current invites to an array
    $currentInvitesArray = explode(',', $currentInvites);
    
    // Add the new invite to the array
    $currentInvitesArray[] = $invite;
    
    // Implode the updated invites array back to a string
    $updatedInvites = implode(',', $currentInvitesArray);
    
    // Update the 'invites' column with the updated invites
    $sqlUpdate = "UPDATE invites SET invites = '$updatedInvites' WHERE number = '$username'";
    
    if (mysqli_query($connection, $sqlUpdate)) {
        echo "Invites updated successfully";
    } else {
        echo "Error updating invites: " . mysqli_error($connection);
    }
} else {
    echo "No user found with the given username";
}

// Close the connection
mysqli_close($connection);
?>
