<?php
    include('dbAccess.php');
    
    $db = new DatabaseAccess("localhost", "root", "", "wbd");

    $result = $db->query('SELECT username FROM login NATURAL JOIN user WHERE cookies="'.$_GET["token"].'"');
    
    $rows = $result->fetch_all();

    $res = array();
    $res["username"] = "";
    //Check password, asumsi email unique sehingga password cuman ada 1
    if($result->num_rows == 1) {
        $res["username"] = $rows[0][0];
    }
    $res = json_encode($res);
    echo $res;

?>