<?php
    include('dbAccess.php');
?>


<?php
    $db = new DatabaseAccess("localhost", "root", "", "wbd");
    $result = $db->query('SELECT phone_number FROM user WHERE phone_number="'.$_POST["phone"].'"');
    if($result->num_rows == 0) {
        $res = 404;
    }
    $res = json_encode($res);
    echo $res;
    }
?>