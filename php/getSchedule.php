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
    $query = "SELECT * FROM schedule WHERE film_id=".$_GET["id"]." ORDER BY date ASC, time ASC";
    $result = $conn->query($query);

    $hasil = array();

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()){
            $temp = new \stdClass();
            $temp->schedule_id = $row["schedule_id"];
            $temp->film_id = $row["film_id"];
            $temp->date = $row["date"];
            $temp->time = $row["time"];
            $temp->available_seat = $row["available_seat"];

            array_push($hasil, $temp);
        }
    }

    $hasil = json_encode($hasil);

    echo $hasil;
    $conn->close();
?>