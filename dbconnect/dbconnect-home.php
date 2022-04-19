<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

    try{
        $db = new PDO('mysql:host=localhost;dbname=towns',
        'newuser', 'mypassword');
    } catch (PDOException $e) {
        echo "Database connection error ". $e->getMessage();
    }