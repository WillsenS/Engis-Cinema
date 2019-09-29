<?php
    include('dbAccess.php');
    
    $db = new DatabaseAccess("localhost", "root", "", "wbd");

    $result = $db->query('SELECT user_id FROM login WHERE cookies="'.$_GET["token"].'"');
    
    $rows = $result->fetch_all();

    $res = array();
    $res["user_id"] = -1;
    //Check password, asumsi email unique sehingga password cuman ada 1
    if($result->num_rows == 1) {
        $res["user_id"] = $rows[0];
    }
    $res = json_encode($res);
    echo $res;

?>
