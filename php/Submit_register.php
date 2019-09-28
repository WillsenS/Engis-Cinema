<?php
    function randString($length) {
        $charAvail = '0123456789abdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $len = strlen($charAvail);
        $has = '';
        for ($i=0; $i < $length; $i++) { 
            $has .=  $charAvail[rand(0, $len-1)];
        }
        return $has;
    }
?>

<?php
    $db = new DatabaseAccess("localhost", "root", "", "wbd");
    $res = array();
    $res["status"] = 200;
    $res["cookie"] = "";
    $res["cookie"] = randString(40);
    $query = "INSERT INTO login (user_id, cookies) VALUES ('";
    $query .= $_POST["username"];
    $query .= "', '";
    $query .= $res["cookie"];
    $query .= "')";
    $db->query($query);
    $res = json_encode($res);
    echo $res;

?>
