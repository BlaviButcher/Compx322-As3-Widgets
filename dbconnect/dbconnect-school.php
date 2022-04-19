<?php
    try{
        $db = new PDO('mysql:host=learn-mysql.cms.waikato.ac.nz;dbname=rd97',
        'rd97','my189677sql');
    } catch (PDOException $e) {
        echo "Database connection error ". $e->getMessage();
    }