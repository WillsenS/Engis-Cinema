<?php
    include('dbAccess.php');
?>

<?php
    $db = new DatabaseAccess("localhost", "root", "", "wbd");
    $uid = $db->query('SELECT user_id FROM login WHERE cookies="'.$_POST["token"].'"');   
    $uidrows = $uid->fetch_assoc();
    $film_id = $_POST["film_id"];
    $query = "SELECT rating, review 
    FROM film_review 
    WHERE ((user_id='".$uidrows["user_id"]."') AND (film_id ='".$film_id."'))";
    // echo $query;
    $review = $db->query(
        $query
    );
    $review_rows = $review->fetch_assoc();
    $res = array();
    $res["status"] = 200;

    if($review->num_rows > 0) {
        $db->query("DELETE FROM film_review WHERE user_id='".$uidrows["user_id"]."'");
    }
    $query = "INSERT INTO film_review (user_id, film_id, rating, review) VALUES ('";
    $query .= $uidrows["user_id"];
    $query .= "', '";
    $query .= $film_id;
    $query .= "', '";
    $query .= $_POST["rating"];
    $query .= "', '";
    $query .= $_POST["review"];
    $query .= "')";
    // echo $query;
    $succ = $db->query($query);
    if(!$succ) {
        $res["status"] = 400;
    }
    $res = json_encode($res);
    echo $res;

?>