<?php
    include('dbAccess.php');
    $db = new DatabaseAccess("localhost", "root", "", "wbd");
    $result = $db->query('SELECT user_id FROM user WHERE username="'.$_POST["username"].'"');
    $res = 200;
    if($result->num_rows >= 1) {
        $res = 404;
    }
    $res = json_encode($res);
    echo $res;
?>