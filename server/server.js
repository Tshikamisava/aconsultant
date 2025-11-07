const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Gmail SMTP configuration (you can change this to any email service)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com', // Your Gmail address
    pass: process.env.EMAIL_PASS || 'your-app-password'     // Your Gmail app password
  }
});

// Alternative configuration for other email services
// const transporter = nodemailer.createTransport({
//   host: 'smtp.example.com',
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'A Consultant Email Server is running!', 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'email-server',
    timestamp: new Date().toISOString()
  });
});

// Email sending route
app.post('/send-email', async (req, res) => {
  try {
    const { from_name, from_email, message } = req.body;

    // Validate required fields
    if (!from_name || !from_email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: from_name, from_email, and message are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(from_email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    console.log('📧 Processing email request:', {
      from: from_name,
      email: from_email,
      messageLength: message.length
    });

    // Email options
    const mailOptions = {
      from: `"A Consultant Website" <${process.env.EMAIL_USER || 'noreply@aconsultant.com'}>`,
      to: 'lhlongwane81@gmail.com', // Your email where you want to receive messages
      subject: `New Contact Form Message from ${from_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #333; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
              <div style="width: 50px; height: 3px; background-color: #007bff; margin: 10px auto;"></div>
            </div>
            
            <!-- Contact Information -->
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #333; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Contact Details</h3>
              
              <div style="margin-bottom: 12px;">
                <span style="font-weight: bold; color: #555; display: inline-block; width: 80px;">Name:</span>
                <span style="color: #333;">${from_name}</span>
              </div>
              
              <div style="margin-bottom: 12px;">
                <span style="font-weight: bold; color: #555; display: inline-block; width: 80px;">Email:</span>
                <a href="mailto:${from_email}" style="color: #007bff; text-decoration: none;">${from_email}</a>
              </div>
              
              <div>
                <span style="font-weight: bold; color: #555; display: inline-block; width: 80px;">Date:</span>
                <span style="color: #333;">${new Date().toLocaleString()}</span>
              </div>
            </div>
            
            <!-- Message Content -->
            <div style="margin-bottom: 20px;">
              <h3 style="color: #333; margin-bottom: 15px; font-size: 18px;">Message</h3>
              <div style="background-color: white; padding: 20px; border-left: 4px solid #007bff; border-radius: 0 8px 8px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                This message was sent from the A Consultant website contact form.
              </p>
              <p style="color: #666; font-size: 12px; margin: 5px 0 0 0;">
                Reply directly to this email to respond to ${from_name}.
              </p>
            </div>
            
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${from_name}
Email: ${from_email}
Date: ${new Date().toLocaleString()}

Message:
${message}

---
This message was sent from the A Consultant website contact form.
Reply to: ${from_email}
      `,
      replyTo: from_email // Allow direct reply to the sender
    };

    // Send email
    console.log('📤 Sending email via SMTP...');
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully:', {
      messageId: info.messageId,
      response: info.response
    });

    res.json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    
    let errorMessage = 'Failed to send email';
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please check your email credentials.';
    } else if (error.code === 'ENOTFOUND') {
      errorMessage = 'Email server not found. Please check your SMTP configuration.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    res.status(500).json({
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString()
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Email server running on http://localhost:${PORT}`);
  console.log(`📧 Ready to send emails to: lhlongwane81@gmail.com`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;