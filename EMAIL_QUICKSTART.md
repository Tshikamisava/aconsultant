# 📧 Quick Start - Email Backend

## TL;DR - Get Email Working in 3 Steps

### 1️⃣ Generate Gmail App Password (2 minutes)

1. Open: https://myaccount.google.com/apppasswords
2. Create App Password for "Mail"
3. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

### 2️⃣ Configure Server (1 minute)

Edit `server/.env`:
```env
EMAIL_APP_PASSWORD=abcdefghijklmnop  # ← Paste your App Password here
```

### 3️⃣ Start Everything (30 seconds)

**Terminal 1 - Email Server:**
```powershell
.\start-email-server.ps1
```

**Terminal 2 - Website:**
```powershell
npm run dev
```

**✅ Done!** Test the contact form at http://localhost:5173

---

## 🎯 What Was Built

### Before (EmailJS)
- ❌ Third-party service
- ❌ OAuth tokens expire
- ❌ "Invalid grant" errors
- ❌ API keys in frontend

### After (Custom Backend)
- ✅ Your own server
- ✅ No token expiration
- ✅ No OAuth issues
- ✅ Secure (no exposed keys)
- ✅ Full control

## 📁 New Files Created

```
server/
├── server.js           # Express + Nodemailer email server
├── package.json        # Server dependencies
├── .env               # Your email credentials (don't commit!)
└── .env.example       # Template for setup

EMAIL_BACKEND_SETUP.md  # Complete setup guide
start-email-server.ps1  # Quick start script
.env                    # Frontend config (API URL)
```

## 🚀 Running the Server

### Option 1: Use the Quick Start Script
```powershell
.\start-email-server.ps1
```

### Option 2: Manual Start
```powershell
cd server
npm start
```

You should see:
```
╔════════════════════════════════════════════════╗
║   📧 Email Server Started                      ║
║   🌐 Port: 3001                                ║
║   ✅ Status: Running                           ║
╚════════════════════════════════════════════════╝
```

## 🧪 Testing

### Test Server Health
```powershell
curl http://localhost:3001/health
```

### Test Email Form
1. Go to http://localhost:5173
2. Scroll to contact section
3. Fill out form
4. Click "Send Message"
5. Check lhlongwane81@gmail.com for the email

## 🔧 Configuration

### Server Environment (`server/.env`)

Required:
- `EMAIL_APP_PASSWORD` - Gmail App Password (16 characters)
- `EMAIL_USER` - Your Gmail (lhlongwane81@gmail.com)
- `EMAIL_TO` - Where to receive form submissions

Optional:
- `PORT` - Server port (default: 3001)
- `ALLOWED_ORIGINS` - CORS allowed domains
- `EMAIL_FROM_NAME` - Display name for emails

### Frontend Environment (`.env`)

```env
VITE_API_URL=http://localhost:3001
```

## 🛡️ Security Features

- ✅ **Rate Limiting**: Max 5 emails per 15 min per IP
- ✅ **CORS**: Only allowed origins can connect
- ✅ **Helmet.js**: Security headers
- ✅ **Input Validation**: Email format checking
- ✅ **Environment Variables**: No hardcoded credentials

## 🚨 Troubleshooting

### "Cannot connect to email server"
- Make sure server is running on port 3001
- Check `VITE_API_URL` in frontend `.env`

### "Invalid login"
- Verify Gmail App Password is correct
- Make sure 2-Step Verification is enabled
- Regenerate App Password if needed

### "Too many requests"
- Wait 15 minutes (rate limit)
- Or increase limit in `server.js`

## 📚 Documentation

- **EMAIL_BACKEND_SETUP.md** - Complete setup guide
- **server/.env.example** - Environment template
- **start-email-server.ps1** - Quick start script

## 🎉 What's Different?

### Frontend (`ContactSection.tsx`)
- ❌ Removed EmailJS dependency
- ✅ Now uses `fetch()` to call backend API
- ✅ Better error handling
- ✅ Toast notifications

### Backend (New!)
- ✅ Express.js server
- ✅ Nodemailer for email sending
- ✅ Gmail SMTP with App Password
- ✅ Professional HTML email templates
- ✅ Rate limiting & security

## 🚀 Deployment

### Backend
Deploy to: Heroku, Railway, Render, or any Node.js host

Set environment variables:
```
EMAIL_USER=lhlongwane81@gmail.com
EMAIL_APP_PASSWORD=your_app_password
EMAIL_TO=lhlongwane81@gmail.com
PORT=3001
ALLOWED_ORIGINS=https://yourdomain.com
```

### Frontend
Update `.env`:
```
VITE_API_URL=https://your-backend-url.com
```

Build and deploy:
```powershell
npm run build
```

## ✨ Benefits

1. **No Third-Party Issues**
   - No OAuth token expiration
   - No "Invalid grant" errors
   - No EmailJS account needed

2. **Better Security**
   - API keys not in frontend
   - Environment-based configuration
   - CORS protection

3. **Full Control**
   - Custom email templates
   - Rate limiting
   - Error handling
   - Logging

4. **Free**
   - Just needs Gmail account
   - No EmailJS subscription
   - No API usage limits

## 🆘 Need Help?

1. Check server terminal for errors
2. Check browser console (F12)
3. Read EMAIL_BACKEND_SETUP.md
4. Verify Gmail App Password is set
5. Test health endpoint: http://localhost:3001/health

---

**That's it!** Your email system is now self-hosted and won't have OAuth issues anymore. 🎊
