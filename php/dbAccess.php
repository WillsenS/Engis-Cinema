<?php
    class DatabaseAccess {
        private $servername;
        private $username;
        private $password;
        private $dbname;
        private $conn;

        public function __construct($sName, $uName, $pwd, $db) {
            $this->servername = $sName;
            $this->username = $uName;
            $this->password = $pwd;
            $this->dbname = $db;
            $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
            $this->conn->set_charset('utf8');
            if ($this->conn->connect_error) {
                die("Connection failed: " . $this->conn->connect_error);
            }
        }

        public function __destruct() {
            $this->conn->close();
        }

        function query($queryStr) {
            return $this->conn->query($queryStr);
        }
    }
?>
