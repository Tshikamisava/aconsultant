<?php
// contact.php - Handle contact form submissions
// For use with Hostking or any PHP hosting provider

// Set error handling FIRST before anything else
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// Start output buffering IMMEDIATELY to catch any output
ob_start();

// Function to ensure JSON output on any error
function sendJsonResponse($success, $message, $statusCode = 200) {
    // Clear any existing output
    while (ob_get_level() > 0) {
        ob_end_clean();
    }
    
    // Set headers
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
    http_response_code($statusCode);
    
    // Send JSON response
    echo json_encode([
        'success' => $success,
        'message' => $success ? $message : null,
        'error' => !$success ? $message : null,
        'timestamp' => date('Y-m-d H:i:s T')
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// Register shutdown function to catch fatal errors
register_shutdown_function(function() {
    $error = error_get_last();
    if ($error !== NULL && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        // Only send JSON if headers haven't been sent
        if (!headers_sent()) {
            // Clear output buffer
            while (ob_get_level() > 0) {
                ob_end_clean();
            }
            header('Content-Type: application/json; charset=utf-8');
            header('Access-Control-Allow-Origin: *');
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'A server error occurred. Please try again later.',
                'timestamp' => date('Y-m-d H:i:s T')
            ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        }
    }
});

try {
    // Load configuration with error handling
    if (!file_exists(__DIR__ . '/config.php')) {
        throw new Exception('Configuration file not found');
    }
    
    require_once __DIR__ . '/config.php';
    
    // Verify required constants are defined
    if (!defined('ADMIN_EMAIL') || !defined('FROM_EMAIL') || !defined('FROM_NAME')) {
        throw new Exception('Configuration incomplete: missing required email settings');
    }
    
    if (!defined('MAX_EMAILS_PER_IP_PER_HOUR')) {
        define('MAX_EMAILS_PER_IP_PER_HOUR', 5);
    }
    
    if (!defined('MIN_NAME_LENGTH')) {
        define('MIN_NAME_LENGTH', 2);
    }
    
    if (!defined('MAX_NAME_LENGTH')) {
        define('MAX_NAME_LENGTH', 100);
    }
    
    if (!defined('MIN_MESSAGE_LENGTH')) {
        define('MIN_MESSAGE_LENGTH', 10);
    }
    
    if (!defined('MAX_MESSAGE_LENGTH')) {
        define('MAX_MESSAGE_LENGTH', 2000);
    }
    
    if (!isset($SPAM_KEYWORDS) || !is_array($SPAM_KEYWORDS)) {
        $SPAM_KEYWORDS = [
            'viagra', 'casino', 'lottery', 'winner', 'congratulations',
            'free money', 'click here', 'act now', 'urgent', 'limited time'
        ];
    }
    
    if (!isset($ALLOWED_ORIGINS) || !is_array($ALLOWED_ORIGINS)) {
        $ALLOWED_ORIGINS = ['*'];
    }

    // Set CORS headers based on configuration
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (!empty($origin) && in_array($origin, $ALLOWED_ORIGINS)) {
        header("Access-Control-Allow-Origin: $origin");
    } elseif (in_array('*', $ALLOWED_ORIGINS)) {
        header('Access-Control-Allow-Origin: *');
    } else {
        // Default: allow from same origin
        header('Access-Control-Allow-Origin: ' . ($_SERVER['HTTP_ORIGIN'] ?? '*'));
    }

    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
    header('Content-Type: application/json; charset=utf-8');

    // Handle preflight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        ob_end_clean();
        exit();
    }

    // Only allow POST requests
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendJsonResponse(false, 'Method not allowed. Only POST requests are accepted.', 405);
    }

    // Simple rate limiting based on IP
    function checkRateLimit($ip) {
        $log_file = __DIR__ . '/email_log.txt';
        $current_time = time();
        $one_hour_ago = $current_time - 3600;
        
        // Read existing log (suppress warnings if file doesn't exist)
        $entries = [];
        if (file_exists($log_file) && is_readable($log_file)) {
            $file_contents = @file($log_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            if ($file_contents !== false) {
                $entries = $file_contents;
            }
        }
        
        // Filter entries from the last hour for this IP
        $recent_entries = array_filter($entries, function($entry) use ($ip, $one_hour_ago) {
            $parts = explode('|', $entry);
            return count($parts) >= 2 && 
                   $parts[1] === $ip && 
                   intval($parts[0]) > $one_hour_ago;
        });
        
        // Check if limit exceeded
        if (count($recent_entries) >= MAX_EMAILS_PER_IP_PER_HOUR) {
            return false;
        }
        
        // Add current entry (suppress warnings if write fails)
        $new_entry = $current_time . '|' . $ip . PHP_EOL;
        @file_put_contents($log_file, $new_entry, FILE_APPEND | LOCK_EX);
        
        return true;
    }

    $client_ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';

    // Check rate limiting
    if (!checkRateLimit($client_ip)) {
        throw new Exception('Too many emails sent from this IP. Please try again later.');
    }

    // Get and validate input data
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        throw new Exception('Invalid JSON data');
    }
    
    // Validate required fields
    $required_fields = ['from_name', 'from_email', 'message'];
    foreach ($required_fields as $field) {
        if (empty($data[$field]) || !isset($data[$field])) {
            throw new Exception("Missing required field: $field");
        }
    }
    
    // Sanitize input data
    $sender_name = htmlspecialchars(trim($data['from_name'] ?? ''), ENT_QUOTES, 'UTF-8');
    $sender_email = filter_var(trim($data['from_email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($data['message'] ?? ''), ENT_QUOTES, 'UTF-8');
    
    // Validate email format
    if (!filter_var($sender_email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email format');
    }
    
    // Validate lengths
    if (strlen($sender_name) < MIN_NAME_LENGTH || strlen($sender_name) > MAX_NAME_LENGTH) {
        throw new Exception('Name must be between ' . MIN_NAME_LENGTH . ' and ' . MAX_NAME_LENGTH . ' characters');
    }
    
    if (strlen($message) < MIN_MESSAGE_LENGTH || strlen($message) > MAX_MESSAGE_LENGTH) {
        throw new Exception('Message must be between ' . MIN_MESSAGE_LENGTH . ' and ' . MAX_MESSAGE_LENGTH . ' characters');
    }
    
    // Basic spam protection
    $message_lower = strtolower($message);
    foreach ($SPAM_KEYWORDS as $keyword) {
        if (strpos($message_lower, $keyword) !== false) {
            throw new Exception('Message flagged as potential spam');
        }
    }
    
    // Create email subject
    $subject = "New Contact Form Message from $sender_name";
    
    // Create email body (HTML format)
    $email_body = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <title>Contact Form Message</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
            .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { background-color: white; padding: 20px; margin: 20px 0; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; padding: 10px; background-color: #f8f9fa; border-left: 3px solid #2563eb; }
            .footer { text-align: center; color: #666; font-size: 12px; padding: 20px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>New Contact Form Message</h1>
                <p>A Consultant Website</p>
            </div>
            
            <div class='content'>
                <div class='field'>
                    <div class='label'>From:</div>
                    <div class='value'>$sender_name</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Email:</div>
                    <div class='value'>$sender_email</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Message:</div>
                    <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Received:</div>
                    <div class='value'>" . date('Y-m-d H:i:s T') . "</div>
                </div>
            </div>
            
            <div class='footer'>
                <p>This message was sent from the contact form on your website.</p>
                <p>Please reply directly to: $sender_email</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Set email headers
    $headers = array(
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=utf-8',
        'From: ' . FROM_NAME . ' <' . FROM_EMAIL . '>',
        "Reply-To: $sender_email",
        'Return-Path: ' . FROM_EMAIL,
        'X-Mailer: PHP/' . phpversion()
    );
    
    // Send email
    $mail_sent = @mail(ADMIN_EMAIL, $subject, $email_body, implode("\r\n", $headers));
    
    if (!$mail_sent) {
        throw new Exception('Failed to send email. Please try again later.');
    }
    
    // Success response
    sendJsonResponse(true, 'Email sent successfully', 200);
    
} catch (Exception $e) {
    // Error response
    sendJsonResponse(false, $e->getMessage(), 400);
} catch (Error $e) {
    // Fatal error response (PHP 7+)
    sendJsonResponse(false, 'A server error occurred. Please try again later.', 500);
} catch (Throwable $e) {
    // Catch any other throwable (PHP 7+)
    sendJsonResponse(false, 'An unexpected error occurred. Please try again later.', 500);
}
?>
