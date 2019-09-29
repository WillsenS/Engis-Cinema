<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "wbd";
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->set_charset('utf8');

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $query = "SELECT username, profile_picture, rating, review FROM user NATURAL JOIN film_review where film_id=".$_GET["id"];
    $result = $conn->query($query);

    $hasil = array();

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()){
            $temp = new \stdClass();
            $temp->username = $row["username"];
            $temp->profile_picture = $row["profile_picture"];
            $temp->rating = $row["rating"];
            $temp->review = $row["review"];
            
            array_push($hasil, $temp);
        }
    }

    $hasil = json_encode($hasil);

    echo $hasil;
    $conn->close();
?>