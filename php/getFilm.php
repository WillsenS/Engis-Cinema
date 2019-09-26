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
    $query = "SELECT * FROM film WHERE film_id=".$_GET["id"];
    $result = $conn->query($query);

    $hasil = new \stdClass();
    $hasil->title = "Film Not Found";
    $hasil->film_picture = "no image.png";
    $hasil->genre = "";
    $hasil->durasi = 0;
    $hasil->released_date = 0;
    $hasil->detail = "";
    $hasil->avg_rating = 0;

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $hasil->title = $row["title"];
        $hasil->film_picture = $row["film_picture"];
        $hasil->genre = $row["genre"];
        $hasil->durasi = $row["durasi"];
        $hasil->released_date = $row["released_date"];
        $hasil->detail = $row["detail"];
    }

    $query = "SELECT avg(rating) as avg_rating FROM film_review where film_id=".$_GET["id"];
    $result = $conn->query($query);
    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $hasil->avg_rating = number_format((float)$row["avg_rating"], 2, '.', '');
    }

    $hasil = json_encode($hasil);

    echo $hasil;
    $conn->close();
?>