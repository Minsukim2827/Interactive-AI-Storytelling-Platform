<?php
    require_once("../../../../../backend/.env");

    $db_connection = @mysqli_connect($DB_HOST, $DB_USER,  $DB_PASSWORD, $DB_NAME);

    if(!$db_connection){
        die();
    }

    $query = "SELECT * FROM users WHERE id = "

?>