<?php
//Require functions for actions
require_once "includes/actions.php";

if (!isset($_GET['id'])) {
    $data = getProducts();
} else {
    $data = getProductDetails($_GET['id']);
}
header("Content-Type: application/json");
echo $data !== false ? json_encode($data) : json_encode(['error' => 'Not found']);
exit;

