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
    $res = array();
    $res["status"] = 200;
    $res["cookie"] = "";
    $res["cookie"] = randString(40);
    $data = "";
    list($tipe, $data) = explode(';', $_POST["imgEncoded"]);
    list(, $data)      = explode(',', $data);
    $data = base64_decode($data);
    file_put_contents("../img/profilPicture/".$_POST["imgPath"], $data);
    $query1 = "INSERT INTO user (username, email, phone_number, password, profile_picture) VALUES ('";
    $query1 .= $_POST["username"];
    $query1 .= "', '";
    $query1 .= $_POST["email"];
    $query1 .= "', '";
    $query1 .= $_POST["phone"];
    $query1 .= "', '";
    $query1 .= $_POST["pass"];
    $query1 .= "', '";
    $query1 .= $_POST["imgPath"];
    $query1 .= "')";
    $db->query($query1);
    $query2 = "INSERT INTO login (user_id, cookies) VALUES ('";
    $query2 .= $_POST["username"];
    $query2 .= "', '";
    $query2 .= $res["cookie"];
    $query2 .= "')";
    $db->query($query2);
    $res = json_encode($res);
    echo $res;

?>
