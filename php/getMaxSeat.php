<?php
    include('dbAccess.php');
    
    $db = new DatabaseAccess("localhost", "root", "", "wbd");

    $avail = $db->query(
       "SELECT available_seat as max_seat
       FROM schedule NATURAL JOIN film
       WHERE schedule_id=".$_GET["id"]
    );

    if($avail){
        $maxSeat = $avail->fetch_all();
        echo json_encode(array("max_seat" => $maxSeat[0][0]));
    }else{
        echo json_encode("");
    }
?>