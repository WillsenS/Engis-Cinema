<?php
    include('dbAccess.php');
?>


<?php
    $db = new DatabaseAccess("localhost", "root", "", "wbd");
    $result = $db->query('SELECT user_id FROM user WHERE user_id="'.$_POST["username"].'"');
    if($result->num_rows == 0) {
        $res = 404;
    }
    $res = json_encode($res);
    echo $res;
    }
?>