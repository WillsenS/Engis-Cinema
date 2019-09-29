<?php
    include('dbAccess.php');
    
    $db = new DatabaseAccess("localhost", "root", "", "wbd");

    //kumaha ieu skemana??
    $result = $db->query(
       "SELECT film_id, title, film_picture, film_schedule as avg_rating
        FROM film NATURAL JOIN schedule
        AS film(film_id, title, film_picture, film_schedule)"
        //NATURAL JOIN transactions
    );
    if($result){
        $res = array();
        while($data = $result->fetch_assoc()) {
            array_push($res, $data);
        }
        echo json_encode($res);
    }else{
        echo json_encode("");
    }
?>