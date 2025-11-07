<?php
// contact.php - Handle contact form submissions
// For use with Hostking or any PHP hosting provider

// Force JSON output and error handling
ini_set('display_errors', 0);
error_reporting(0);

// Start output buffering to catch any unexpected output
ob_start();

try {
    // Load configuration
    require_once 'config.php';

    // Set CORS headers based on configuration
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array($origin, $ALLOWED_ORIGINS)) {
        header("Access-Control-Allow-Origin: $origin");
    } else {
        header('Access-Control-Allow-Origin: *'); // Fallback for development
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
        throw new Exception('Method not allowed');
    }

    // Simple rate limiting based on IP
    function checkRateLimit($ip) {
        $log_file = 'email_log.txt';
        $current_time = time();
        $one_hour_ago = $current_time - 3600;
        
        // Read existing log
        $entries = [];
        if (file_exists($log_file)) {
            $entries = file($log_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
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
        
        // Add current entry
        $new_entry = $current_time . '|' . $ip . PHP_EOL;
        file_put_contents($log_file, $new_entry, FILE_APPEND | LOCK_EX);
        
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
    $sender_name = filter_var(trim($data['from_name']), FILTER_SANITIZE_STRING);
    $sender_email = filter_var(trim($data['from_email']), FILTER_SANITIZE_EMAIL);
    $message = filter_var(trim($data['message']), FILTER_SANITIZE_STRING);
    
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
    $mail_sent = mail(ADMIN_EMAIL, $subject, $email_body, implode("\r\n", $headers));
    
    if (!$mail_sent) {
        throw new Exception('Failed to send email. Please try again later.');
    }
    
    // Success response
    ob_clean(); // Clear any unexpected output
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Email sent successfully',
        'timestamp' => date('Y-m-d H:i:s T')
    ]);
    
} catch (Exception $e) {
    // Error response
    ob_clean(); // Clear any previous output
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
} catch (Error $e) {
    // Fatal error response
    ob_clean(); // Clear any previous output
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Server error occurred'
    ]);
}

// Clean up output buffer
ob_end_flush();
?>