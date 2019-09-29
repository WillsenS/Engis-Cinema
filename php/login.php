<?php
    include('dbAccess.php');
?>

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

    $result = $db->query('SELECT user_id, password FROM user WHERE email="'.$_POST["email"].'"');

    $rows = $result->fetch_assoc();
    // echo json_encode($rows);
    $res = array();
    $res["status"] = 500;
    $res["cookie"] = "";
    //Check password, asumsi email unique sehingga password cuman ada 1
    if($result->num_rows > 0) {
        if(strcmp($_POST["password"], $rows["password"]) == 0)
        {
            //Sama, tambahin random string ke cookie
            $res["status"] = 200;   //Success
            $res["cookie"] = randString(40);
            
            //Input cookie ke database
            $db->query("DELETE FROM login WHERE user_id='".$rows["user_id"]."'");
            $query = "INSERT INTO login (user_id, cookies) VALUES ('";
            $query .= $rows["user_id"];
            $query .= "', '";
            $query .= $res["cookie"];
            $query .= "')";
            // echo $query;
            $db->query($query);
        }else{
            //Beda
            $res["status"] = 401;   //Unauthorized
        }
    }else {
        $res["status"] = 404;   //Not Found
    }
    $res = json_encode($res);
    echo $res;

?>