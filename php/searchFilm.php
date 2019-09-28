<?php
    include('dbAccess.php');
    
    $db = new DatabaseAccess("localhost", "root", "", "wbd");
    if(array_key_exists("name", $_GET)) {
        $keyword = "%";
        $keywordChar = str_split(strtolower($_GET["name"]));
        foreach ($keywordChar as $c) {
            $keyword .= $c."%";
        }
        $result = $db->query(
        "SELECT f.film_id, title, film_picture, detail, COALESCE(avg_rating, 0) as avg_rating
        FROM (   
            SELECT DISTINCT film_id, title, film_picture, detail
            FROM film
            WHERE LOWER(title) LIKE '%".$keyword."%'
        ) as f LEFT JOIN (
            SELECT film_id, avg(rating) AS avg_rating
            FROM film_review
            GROUP BY film_id
        ) as s ON f.film_id = s.film_id"
        );
        // echo json_encode($result->fetch_all());
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
    }else{
        echo json_encode("");
    }
?>