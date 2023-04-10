<?php
include("connect.php");

if(isset($_POST['view'])){

// $con = mysqli_connect("localhost", "root", "", "notif");

if($_POST["view"] != '')
{
    $update_query = "UPDATE `contact` SET status = 1 WHERE status=0";
    mysqli_query($con, $update_query);
}
$query = "SELECT * FROM contact ORDER BY id DESC LIMIT 5";
$result = mysqli_query($con, $query);
$output = '';
if(mysqli_num_rows($result) > 0)
{
 while($row = mysqli_fetch_array($result))
 {
   $output .= '
   <li>
   <form id="noti'.$row["id"].'" action="notification.php" method="POST">
   <a href="#" onclick="fromsubmit'.$row["id"].'()">
   <input type="hidden" name="id" value="'.$row["id"].'">
   <strong>'.$row["name"].'</strong><br/>
   <small><em>Send Some Messages</em></small>
   </a>
   </form>

       <script>
            function fromsubmit'.$row["id"].'() {
                document.getElementById("noti'.$row["id"].'").submit();
            }
        </script>

   </li>
   ';

 }
}
else{
     $output .= '
     <li><a href="#" class="text-bold text-italic">No Noti Found</a></li>';
}



$status_query = "SELECT * FROM contact WHERE `status`=0";
$result_query = mysqli_query($con, $status_query);
$count = mysqli_num_rows($result_query);
$data = array(
    'notification' => $output,
    'unseen_notification'  => $count
);

echo json_encode($data);

}

?>