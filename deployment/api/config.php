<?php
// config.php - Configuration for A Consultant website PHP backend
// Adjust these settings for your Hostking hosting environment

// Email Configuration
define('ADMIN_EMAIL', 'lhlongwane81@gmail.com');
define('FROM_EMAIL', 'info@aconsultant.co.za'); // Should match your domain
define('FROM_NAME', 'A Consultant Website');

// Security Settings
define('MAX_MESSAGE_LENGTH', 2000);
define('MIN_MESSAGE_LENGTH', 10);
define('MAX_NAME_LENGTH', 100);
define('MIN_NAME_LENGTH', 2);

// Rate limiting (basic protection)
define('MAX_EMAILS_PER_IP_PER_HOUR', 5);

// Spam protection keywords
$SPAM_KEYWORDS = [
    'viagra', 'casino', 'lottery', 'winner', 'congratulations',
    'free money', 'click here', 'act now', 'urgent', 'limited time'
];

// CORS Settings (adjust for your domain in production)
$ALLOWED_ORIGINS = [
    'http://localhost:5173',  // Vite dev server (default)
    'http://localhost:5174',  // Vite dev server (alternate port)
    'http://localhost:3000',  // Common React dev port
    'https://aconsultant.co.za',  // Your production domain
    'https://www.aconsultant.co.za'  // WWW version
];

// Error handling
$environment = $_ENV['ENVIRONMENT'] ?? $_SERVER['ENVIRONMENT'] ?? 'development';
if ($environment === 'production') {
    error_reporting(0);
    ini_set('display_errors', 0);
} else {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
}

// Timezone
date_default_timezone_set('Africa/Johannesburg');
?>