# PHP + React Deployment Guide for Hostking

This guide explains how to deploy your A Consultant website with PHP backend to Hostking hosting.

## 📁 Project Structure

```
your-domain.com/
├── index.html                 # React app entry point
├── assets/                   # React build assets (CSS, JS, images)
├── api/                      # PHP backend
│   ├── contact.php           # Contact form handler
│   ├── config.php            # Configuration
│   └── .htaccess             # Apache configuration
└── favicon.ico               # Site icon
```

## 🚀 Deployment Steps

### Step 1: Build the React App

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **This creates a `dist/` folder with:**
   - `index.html` - Main HTML file
   - `assets/` - All CSS, JS, and image files

### Step 2: Prepare Files for Upload

1. **Copy React build files:**
   - Copy everything from `dist/` to your upload folder
   - These files go in your domain's root directory

2. **Copy PHP API files:**
   - Copy the entire `api/` folder to your upload folder
   - Ensure `api/` is at the same level as `index.html`

### Step 3: Upload to Hostking

1. **Access your hosting control panel**
2. **Use File Manager or FTP to upload:**
   ```
   public_html/                 # Your domain root
   ├── index.html              # From dist/
   ├── assets/                 # From dist/assets/
   ├── api/                    # PHP backend folder
   │   ├── contact.php
   │   ├── config.php
   │   └── .htaccess
   └── favicon.ico             # From dist/
   ```

### Step 4: Configure PHP Settings

1. **Edit `api/config.php`:**
   ```php
   // Update your domain
   $ALLOWED_ORIGINS = [
       'https://yourdomain.com',
       'https://www.yourdomain.com'
   ];
   
   // Update email settings
   define('ADMIN_EMAIL', 'lhlongwane81@gmail.com');
   define('FROM_EMAIL', 'info@yourdomain.com'); // Use your domain
   ```

2. **Test email functionality:**
   - Visit: `https://yourdomain.com/api/contact.php`
   - Should show "Method not allowed" (this means PHP is working)

### Step 5: Test the Contact Form

1. **Visit your website:** `https://yourdomain.com`
2. **Fill out the contact form and submit**
3. **Check browser console for any errors**
4. **Check your email:** `lhlongwane81@gmail.com`

## 🔧 Configuration Options

### Email Settings (api/config.php)

```php
// Your email where contact forms are sent
define('ADMIN_EMAIL', 'lhlongwane81@gmail.com');

// From email (should match your domain)
define('FROM_EMAIL', 'info@yourdomain.com');

// Display name for emails
define('FROM_NAME', 'A Consultant Website');
```

### Security Settings

```php
// Rate limiting - max emails per IP per hour
define('MAX_EMAILS_PER_IP_PER_HOUR', 5);

// Message length limits
define('MAX_MESSAGE_LENGTH', 2000);
define('MIN_MESSAGE_LENGTH', 10);
```

### Domain CORS Settings

For production, update allowed origins:
```php
$ALLOWED_ORIGINS = [
    'https://aconsultant.co.za',
    'https://www.aconsultant.co.za'
];
```

## 🐛 Troubleshooting

### Contact Form Not Working

1. **Check PHP is enabled:**
   - Visit: `yourdomain.com/api/contact.php`
   - Should return JSON error (not PHP error)

2. **Check email configuration:**
   - Ensure `FROM_EMAIL` uses your domain
   - Verify `ADMIN_EMAIL` is correct

3. **Check browser console:**
   - Look for CORS errors
   - Check network tab for failed requests

### Email Not Arriving

1. **Check spam folder**
2. **Verify email configuration in `config.php`**
3. **Contact Hostking support about PHP mail() function**

### File Upload Issues

1. **Verify folder structure matches the guide**
2. **Check file permissions (755 for folders, 644 for files)**
3. **Ensure `.htaccess` is uploaded to `api/` folder**

## 📊 File Permissions

Set these permissions after upload:
```
api/ folder: 755
api/*.php files: 644
api/.htaccess: 644
api/email_log.txt: 666 (will be created automatically)
```

## ✅ Success Checklist

- [ ] React app builds successfully (`npm run build`)
- [ ] All files uploaded to correct locations
- [ ] PHP backend accessible at `/api/contact.php`
- [ ] Email configuration updated in `config.php`
- [ ] CORS origins updated for your domain
- [ ] Contact form submits without errors
- [ ] Test email received at `lhlongwane81@gmail.com`

## 🎯 Benefits of This Setup

✅ **Simple deployment** - Just upload files, no complex configuration
✅ **No environment variables** - Everything configured in PHP files
✅ **Native PHP email** - Uses hosting provider's mail system
✅ **No CORS issues** - Backend and frontend on same domain
✅ **Built-in security** - Rate limiting, input validation, spam protection
✅ **Easy maintenance** - Standard PHP hosting, widely supported

Your website will be live at `yourdomain.com` with a fully functional contact form!