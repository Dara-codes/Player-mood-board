<?php

function getDBConnection() {
    $db = new PDO('sqlite:' . __DIR__ . '/../moods.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $db;
}

