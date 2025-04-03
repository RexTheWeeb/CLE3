<?php
//Require functions for actions
require_once "includes/shopsdata.php";

if (!isset($_GET['id'])) {
    $data = getShopAdress();
}

header("Content-Type: application/json");
echo $data !== false ? json_encode($data) : json_encode(['error' => 'Not found']);
exit;