<?php
    include('dbAccess.php');
?>


<?php
    $db = new DatabaseAccess("localhost", "root", "", "wbd");
    $result = $db->query('SELECT phone_number FROM user WHERE phone_number="'.$_POST["phone"].'"');
    $res = 200;
    if($result->num_rows >= 1) {
        $res = 404;
    }
    $res = json_encode($res);
    echo $res;
?>