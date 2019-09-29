<?php
    include('dbAccess.php');
    
    $db = new DatabaseAccess("localhost", "root", "", "wbd");

    $avail = $db->query(
       "SELECT seat
       FROM ticket
       WHERE schedule_id=".$_GET["id"]
    );

    if($avail){
        $res = array();
        while($seat = $avail->fetch_assoc()){
            array_push($res, $seat);
        }
        echo json_encode($res);
    }else{
        echo json_encode("");
    }
?>