# Email Backend Setup Guide

## 🎯 Overview

This project now uses a **custom Node.js backend** instead of EmailJS. This gives you:
- ✅ Full control over email sending
- ✅ No third-party OAuth token expiration issues
- ✅ Better security (no exposed API keys in frontend)
- ✅ Rate limiting to prevent spam
- ✅ Custom email templates

## 📋 Prerequisites

- Node.js (v18 or higher)
- Gmail account (lhlongwane81@gmail.com)
- Gmail App Password (we'll generate this)

## 🚀 Quick Start

### Step 1: Generate Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Click **Security** (left sidebar)
3. Enable **2-Step Verification** if not already enabled
4. Search for **"App passwords"** in the search bar
5. Click **App passwords**
6. Select app: **Mail**
7. Select device: **Other (Custom name)**
8. Enter name: **A Consultant Website**
9. Click **Generate**
10. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

### Step 2: Configure Server Environment

1. Navigate to server directory:
   ```powershell
   cd server
   ```

2. Copy the example environment file:
   ```powershell
   Copy-Item .env.example .env
   ```

3. Edit `.env` file and add your Gmail App Password:
   ```env
   EMAIL_USER=lhlongwane81@gmail.com
   EMAIL_APP_PASSWORD=abcdefghijklmnop
   EMAIL_TO=lhlongwane81@gmail.com
   EMAIL_FROM_NAME=A Consultant Contact Form
   PORT=3001
   ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
   ```

### Step 3: Install Server Dependencies

```powershell
npm install
```

### Step 4: Start the Email Server

```powershell
npm start
```

You should see:
```
╔════════════════════════════════════════════════╗
║   📧 Email Server Started                      ║
║   🌐 Port: 3001                                ║
║   ✅ Status: Running                           ║
║   📬 Ready to receive contact form submissions ║
╚════════════════════════════════════════════════╝
✅ Email server is ready to send messages
```

### Step 5: Start Frontend (in a new terminal)

```powershell
# Go back to project root
cd ..

# Start Vite dev server
npm run dev
```

### Step 6: Test the Contact Form

1. Open http://localhost:5173 in your browser
2. Navigate to the contact section
3. Fill out the form and submit
4. Check your email at lhlongwane81@gmail.com

## 🗂️ Project Structure

```
aconctantwebsite/
├── server/                          # Email backend
│   ├── server.js                    # Express server with Nodemailer
│   ├── package.json                 # Server dependencies
│   ├── .env                         # Environment variables (DO NOT COMMIT)
│   ├── .env.example                 # Environment template
│   └── .gitignore                   # Ignore sensitive files
│
├── src/
│   └── components/
│       └── ContactSection.tsx       # Updated to use backend API
│
├── .env                             # Frontend environment (API URL)
└── .env.example                     # Frontend env template
```

## 🔧 Configuration

### Backend Configuration (server/.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `EMAIL_USER` | Gmail account to send FROM | lhlongwane81@gmail.com |
| `EMAIL_APP_PASSWORD` | 16-character App Password | abcdefghijklmnop |
| `EMAIL_TO` | Where to receive submissions | lhlongwane81@gmail.com |
| `EMAIL_FROM_NAME` | Display name for emails | A Consultant Contact Form |
| `PORT` | Server port | 3001 |
| `ALLOWED_ORIGINS` | CORS allowed origins (comma-separated) | http://localhost:5173 |

### Frontend Configuration (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | http://localhost:3001 |

## 🛡️ Security Features

✅ **Helmet.js** - Security headers
✅ **CORS** - Restricts access to allowed origins only
✅ **Rate Limiting** - Max 5 emails per 15 minutes per IP
✅ **Input Validation** - Email format validation
✅ **Environment Variables** - Sensitive data not in code

## 📧 Email Template

Emails are sent with a beautiful HTML template including:
- Sender's name and email (with reply-to)
- Message content
- Professional styling
- Auto-generated reply instructions

## 🧪 Testing

### Test Server Health

```powershell
curl http://localhost:3001/health
```

Expected response:
```json
{"status":"ok","message":"Email server is running"}
```

### Test Email Sending (PowerShell)

```powershell
$body = @{
    from_name = "Test User"
    from_email = "test@example.com"
    message = "This is a test message"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/send-email" `
  -Method POST `
  -Body $body `
  -ContentType "application/json"
```

## 🚨 Troubleshooting

### Error: "Cannot connect to email server"

**Problem:** Frontend can't reach backend
**Solution:**
1. Make sure server is running: `cd server && npm start`
2. Check server is on port 3001
3. Verify `VITE_API_URL` in frontend `.env`

### Error: "Invalid login"

**Problem:** Gmail credentials incorrect
**Solution:**
1. Verify `EMAIL_USER` is correct
2. Regenerate Gmail App Password
3. Make sure 2-Step Verification is enabled
4. Copy App Password without spaces

### Error: "Too many requests"

**Problem:** Rate limit exceeded (5 emails per 15 minutes)
**Solution:**
- Wait 15 minutes
- Or temporarily increase limit in `server.js`:
  ```javascript
  max: 10, // increase from 5
  ```

### Emails not arriving

**Problem:** Email sent but not received
**Solution:**
1. Check spam/junk folder
2. Verify `EMAIL_TO` address is correct
3. Check server logs for errors
4. Test with different email address

## 📦 Deployment

### Backend Deployment (Production)

1. **Deploy to a hosting service** (Heroku, Railway, Render, etc.)

2. **Set environment variables** in hosting platform:
   ```
   EMAIL_USER=lhlongwane81@gmail.com
   EMAIL_APP_PASSWORD=your_app_password
   EMAIL_TO=lhlongwane81@gmail.com
   EMAIL_FROM_NAME=A Consultant Contact Form
   PORT=3001
   ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   ```

3. **Update frontend** `.env`:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

### Frontend Deployment

1. Build the frontend:
   ```powershell
   npm run build
   ```

2. Deploy `dist` folder to your hosting (Netlify, Vercel, etc.)

3. Make sure `VITE_API_URL` points to your production backend

## 🔄 Switching from EmailJS

If you previously used EmailJS:

1. ✅ EmailJS dependency can be removed (optional):
   ```powershell
   npm uninstall @emailjs/browser
   ```

2. ✅ Frontend already updated to use new backend
3. ✅ Old EmailJS code removed from `ContactSection.tsx`
4. ✅ No EmailJS API keys needed anymore

## 📝 Development Scripts

### Server

```powershell
cd server

# Start server (production)
npm start

# Start server with auto-reload (development)
npm run dev
```

### Frontend

```powershell
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Features

✅ **No third-party dependencies** for email (except Gmail)
✅ **Instant email delivery** (no queues)
✅ **Beautiful HTML emails** with professional styling
✅ **Reply-To support** - clients can reply directly
✅ **Rate limiting** - prevents spam
✅ **Error handling** - clear error messages
✅ **CORS protection** - only your domain can use it
✅ **Environment based** - easy to configure per environment

## 🆘 Support

If you encounter issues:

1. Check server logs (terminal where server is running)
2. Check browser console (F12)
3. Verify all environment variables are set
4. Test server health endpoint
5. Regenerate Gmail App Password if needed

## 🔐 Security Best Practices

1. **Never commit** `.env` files to Git
2. **Use different** App Passwords for dev/production
3. **Rotate** App Passwords regularly
4. **Limit** ALLOWED_ORIGINS to your actual domains
5. **Monitor** server logs for suspicious activity
6. **Keep** dependencies updated

## ✨ Success!

You now have a robust, self-hosted email solution that:
- Won't expire or require re-authorization
- Gives you full control
- Is more secure
- Is free (just needs a Gmail account)
- Is production-ready

Happy emailing! 📧
