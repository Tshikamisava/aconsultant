# 🚀 Live Site Deployment Instructions

## Your Current Issue
Your live site at www.aconsultantant.co.za is showing "Please contact us directly at lhlongwane81@gmail.com" because it's running the old version without the PHP backend.

## 📁 Files Ready for Upload
All files are prepared in the `deployment/` folder:

```
deployment/
├── index.html              # React app main file
├── vite.svg               # Site icon
├── assets/                # All CSS, JS, and images
│   ├── index-*.css       # Main stylesheet
│   ├── index-*.js        # Main JavaScript
│   ├── phpEmailService-*.js # Email service
│   └── [images]          # All images
└── api/                   # PHP backend
    ├── contact.php       # Email handler
    ├── config.php        # Configuration
    └── .htaccess         # Server config
```

## 🎯 Upload Instructions

### Step 1: Access Your Hosting Control Panel
1. Log into your hosting provider (where www.aconsultantant.co.za is hosted)
2. Go to File Manager or use FTP

### Step 2: Backup Current Site (Optional)
1. Download or rename your current `public_html` folder
2. This gives you a backup of the old site

### Step 3: Upload New Files
1. **Upload ALL files from `deployment/` folder to your domain root:**
   ```
   public_html/              # Your domain root
   ├── index.html           # From deployment/
   ├── vite.svg            # From deployment/
   ├── assets/             # From deployment/assets/
   └── api/                # From deployment/api/
   ```

### Step 4: Update PHP Configuration
1. **Edit `public_html/api/config.php` on your server**
2. **Update these lines:**
   ```php
   // Change this array to include your actual domain
   $ALLOWED_ORIGINS = [
       'https://aconsultantant.co.za',      # Your actual domain
       'https://www.aconsultantant.co.za'   # With www
   ];
   ```

### Step 5: Test the Contact Form
1. Visit: `https://www.aconsultantant.co.za`
2. Fill out the contact form
3. Submit it
4. Check your email: `lhlongwane81@gmail.com`

## 🔧 If Contact Form Still Doesn't Work

### Check PHP Backend Directly:
Visit: `https://www.aconsultantant.co.za/api/contact.php`
- Should show: `{"error":"Method not allowed"}`
- If you see PHP errors, contact your hosting support

### Common Issues:

**1. Wrong Domain in config.php**
- Make sure `$ALLOWED_ORIGINS` includes your exact domain
- Check if it's `aconsultantant.co.za` or `aconsultant.co.za`

**2. PHP Not Enabled**
- Contact your hosting provider to ensure PHP is enabled
- Ask them to verify the `mail()` function works

**3. File Permissions**
- Set folder permissions to 755
- Set file permissions to 644

## ✅ Success Checklist
- [ ] All files uploaded to correct locations
- [ ] `api/config.php` updated with correct domain
- [ ] Contact form accessible at your domain
- [ ] Test email received at `lhlongwane81@gmail.com`

## 🆘 If You Need Help
If the contact form still doesn't work:
1. Check browser console for errors (F12)
2. Test the API directly: `yourdomain.com/api/contact.php`
3. Contact your hosting provider about PHP mail() function

Your site should now have a fully working contact form that sends emails to `lhlongwane81@gmail.com`!