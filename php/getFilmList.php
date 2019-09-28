<?php
    include('dbAccess.php');
    
    $db = new DatabaseAccess("localhost", "root", "", "wbd");

    $result = $db->query(
       "SELECT f.film_id, title, film_picture, COALESCE(avg_rating, 0) as avg_rating
        FROM (   
            SELECT DISTINCT film_id, title, film_picture
            FROM film NATURAL JOIN schedule
            WHERE date <> DATE(NOW())
        ) as f LEFT JOIN (
            SELECT film_id, avg(rating) AS avg_rating
            FROM film_review
            GROUP BY film_id
        ) as s ON f.film_id = s.film_id"
    );
    if($result){
        $res = array();
        while($data = $result->fetch_assoc()) {
            $data["avg_rating"] = number_format((float)$data["avg_rating"], 2, '.', '');
            array_push($res, $data);
        }
        echo json_encode($res);
    }else{
        echo json_encode("");
    }
?>