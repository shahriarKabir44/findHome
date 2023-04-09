<?php

include("connect.php");

extract($_POST);

$status=0;

if (isset($_POST['name']) && isset($_POST['number']) && isset($_POST['email']) && isset($_POST['subject']) && isset($_POST['message'])) {
    
    $sql="insert into contact (name,number,email,subject,message,status) values ('$name','$number','$email','$subject','$message','$status')";
    $result=mysqli_query($con,$sql);

}

?>