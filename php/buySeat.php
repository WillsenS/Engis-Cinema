<?php
    include('dbAccess.php');
    
    $db = new DatabaseAccess("localhost", "root", "", "wbd");

    //Cari film_id
    $film = $db->query(
        "SELECT DISTINCT film_id
        FROM schedule
        WHERE schedule_id=".$_POST["id"]
    );
    $film_id = ($film->fetch_all())[0][0];

    $user = $db->query(
        "SELECT user_id
        FROM login
        WHERE cookies='".$_POST["accessToken"]."'"
    );
    // echo $_POST["accessToken"];
    if($user){
        $user_id = ($user->fetch_all())[0][0];

        $query = "INSERT INTO ticket (film_id, schedule_id, seat, user_id) VALUES (".$film_id.", ".$_POST["id"].", ".$_POST["seatNumber"].", ".$user_id.")";
        $avail = $db->query(
            $query
        );

        if($avail){
            echo json_encode(array("status" => 200));
        }else{
            echo json_encode(array("status" => 400));
        }
    }else{
        echo json_encode(array("status" => 401));
    }
?>