<?php
$db = new PDO('sqlite:' . __DIR__ . '/moods.db');

$db->exec("
    CREATE TABLE IF NOT EXISTS moods (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        emoji TEXT NOT NULL,
        timestamp TEXT NOT NULL
    )
");

echo "Database and table created successfully.";
