<?php
$host = 'localhost';
$username = 'admin';
$password = 'admin';
$database = 'final';


$conn = new mysqli($host, $username, $password, $database);


if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


$username = $_POST['username'];
$inviteNumber = $_POST['inviteNumber'];


$sqlSelect = "SELECT invites FROM invites WHERE number = '$username'";
$result = $conn->query($sqlSelect);
if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  $invites = explode(' ', $row['invites']);
  $index = array_search($inviteNumber, $invites);
  if ($index !== false) {
    array_splice($invites, $index, 1);
  }

  $updatedInvites = implode(' ', $invites);


  if (empty($updatedInvites)) {
    $sqlUpdate = "UPDATE invites SET invites = NULL WHERE number = '$username'";
  } else {
    $sqlUpdate = "UPDATE invites SET invites = '$updatedInvites' WHERE number = '$username'";
  }
  
  if ($conn->query($sqlUpdate) === TRUE) {
    echo "Invites updated successfully.";
  } else {
    echo "Error updating invites: " . $conn->error;
  }
} else {
  echo "No user found with the given username.";
}

$conn->close();
?>
