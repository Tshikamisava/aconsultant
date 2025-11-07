<?php
// Simple test script
header('Content-Type: application/json');
echo json_encode([
    'status' => 'success',
    'message' => 'PHP server is working',
    'timestamp' => date('Y-m-d H:i:s')
]);
?>