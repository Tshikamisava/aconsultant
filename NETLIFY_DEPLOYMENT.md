# Netlify Deployment Guide for A Consultant Email Service

## 🚀 Deploy to Netlify

### Step 1: Prepare Your Repository
1. **Commit all files** to your Git repository
2. **Push to GitHub** (or your git provider)

### Step 2: Deploy to Netlify
1. **Go to Netlify**: https://app.netlify.com/
2. **Click "New site from Git"**
3. **Connect your repository** (GitHub/GitLab/Bitbucket)
4. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`

### Step 3: Set Environment Variables
In your Netlify dashboard:

1. **Go to Site Settings → Environment Variables**
2. **Add these variables**:
   ```
   EMAIL_USER = your-gmail-address@gmail.com
   EMAIL_PASS = your-gmail-app-password
   ```

### Step 4: Install Function Dependencies
1. **In Netlify dashboard**: Site Settings → Functions
2. **Or add to your package.json**:
   ```json
   {
     "dependencies": {
       "nodemailer": "^6.9.7"
     }
   }
   ```

## 🔧 Local Development with Netlify

### Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Run Local Development
```bash
# In your project directory
netlify dev
```
This will:
- Start your Vite dev server
- Start Netlify Functions locally
- Enable testing of serverless functions

## 📧 Email Service Endpoints

### Production
- **Website**: https://www.aconsultantant.co.za
- **Email API**: https://www.aconsultantant.co.za/api/send-email

### Local Development
- **Website**: http://localhost:8888
- **Email API**: http://localhost:8888/api/send-email

## ✅ Testing Your Deployment

1. **Deploy your site** to Netlify
2. **Set environment variables** (EMAIL_USER and EMAIL_PASS)
3. **Test the contact form** on your live site
4. **Check email delivery** to your configured email address

## 🔐 Security Notes

- ✅ Environment variables are secure in Netlify
- ✅ Gmail app password is used (not your main password)
- ✅ CORS is properly configured
- ✅ Input validation is implemented

## 📱 Custom Domain Setup

Since you already have www.aconsultantant.co.za:

1. **In Netlify Dashboard**: Domain Settings
2. **Add custom domain**: www.aconsultantant.co.za
3. **Update DNS** to point to Netlify
4. **Enable HTTPS** (automatic with Netlify)

## 🚨 Troubleshooting

### Common Issues:
1. **Functions not deploying**: Check netlify.toml configuration
2. **Email not sending**: Verify environment variables
3. **CORS errors**: Check function headers
4. **Authentication errors**: Verify Gmail app password

### Debug Steps:
1. **Check Netlify Function logs** in dashboard
2. **Test function directly**: https://your-site.netlify.app/.netlify/functions/send-email
3. **Verify environment variables** are set correctly

## 📞 Support

If you need help:
1. Check Netlify Function logs
2. Test locally with `netlify dev`
3. Verify Gmail app password is correct