<?php
    $db = new DatabaseAccess("localhost", "root", "", "wbd");
    $uid = $db->query('SELECT user_id FROM login WHERE cookies="'.$_POST["token"].'"');   
    $uidrows = $uid->fetch_assoc();
    $film_id = $db->query('SELECT film_id FROM film WHERE title="'.$_POST["judul"].'"');
    $filmid_rows = $film_id->fetch_assoc();
    $review = $db->query("SELECT rating, review FROM film_review WHERE ((user_id='".$uidrows["user_id"]."') AND (film_id ='".$filmid_rows["film_id"]."')")
    $review_rows = $review->fetch_assoc();
    $res = array();
    $res["status"] = 200;

    if($review->num_rows > 0) {
        $db->query("DELETE FROM review WHERE user_id='".$uidrows["user_id"]."'");
    }
    $query = "INSERT INTO review (user_id, film_id, rating, review) VALUES ('";
    $query .= $uidrows["user_id"];
    $query .= "', '";
    $query .= $filmid_rows["film_id"];
    $query .= "', '";
    $query .= $_POST["rating"];
    $query .= "', '";
    $query .= $_POST["review"];
    $query .= "')";
    $db->query($query);
    $res = json_encode($res);
    echo $res;

?>