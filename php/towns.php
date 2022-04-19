<?php
    
    // errors
    ini_set('display_errors', '1');
    ini_set('display_startup_errors', '1');
    error_reporting(E_ALL);

    // connect to db
    require_once("../dbconnect/dbconnect-home.php");

    // join all tables and get filter by matching team name
    $query="SELECT * FROM `town`";
    $result =  $db->query($query);

    // query failed
    if (!$result) {
        header("HTTP/1.1 404 Resource not found");
        die("Database query failed.");
    }

    $data = array();
    // echo data into response body
    while($row = $result->fetch()) {
        // Each time you loop, you add a new array in your main array with a title and an URL
        // arr[] = array() is the same as array_push(arr, array());
        $data[] = array(
        "name" => $row["name"],
        "lon"   => $row["lon"],
        "lat" => $row["lat"],
        );

    }  
    echo json_encode($data);