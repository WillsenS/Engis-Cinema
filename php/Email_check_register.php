<?php
    include('dbAccess.php');
?>


<?php
    $db = new DatabaseAccess("localhost", "root", "", "wbd");
    $result = $db->query('SELECT email FROM user WHERE email="'.$_POST["email"].'"');
    $res = 200;
    if($result->num_rows >= 1) {
        $res = 404;
    }
    $res = json_encode($res);
    echo $res;
?>