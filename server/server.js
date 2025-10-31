import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration - adjust origins for production
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['POST'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting - prevent spam
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify transporter configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email transporter configuration error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Email server is running' });
});

// Send email endpoint
app.post('/api/send-email', limiter, async (req, res) => {
  try {
    const { from_name, from_email, message } = req.body;

    // Validation
    if (!from_name || !from_email || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        details: 'Please provide from_name, from_email, and message'
      });
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(from_email)) {
      return res.status(400).json({
        error: 'Invalid email address'
      });
    }

    // Email to send to the website owner
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'A Consultant Contact Form'}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || 'lhlongwane81@gmail.com',
      replyTo: from_email,
      subject: `New Contact Form Submission from ${from_name}`,
      text: `
Name: ${from_name}
Email: ${from_email}

Message:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px; border-bottom: 3px solid #0066cc; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="margin-bottom: 20px;">
              <p style="margin: 5px 0; color: #666;">
                <strong style="color: #333;">From:</strong> ${from_name}
              </p>
              <p style="margin: 5px 0; color: #666;">
                <strong style="color: #333;">Email:</strong> 
                <a href="mailto:${from_email}" style="color: #0066cc; text-decoration: none;">${from_email}</a>
              </p>
            </div>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; border-left: 4px solid #0066cc;">
              <p style="color: #333; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #999; font-size: 12px;">
              <p>This email was sent from the A Consultant website contact form.</p>
              <p>Reply directly to this email to respond to ${from_name}.</p>
            </div>
          </div>
        </div>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully:', {
      messageId: info.messageId,
      from: from_email,
      timestamp: new Date().toISOString()
    });

    res.json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    
    res.status(500).json({
      error: 'Failed to send email',
      message: error.message
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════╗
║   📧 Email Server Started                      ║
║   🌐 Port: ${PORT}                              ║
║   ✅ Status: Running                           ║
║   📬 Ready to receive contact form submissions ║
╚════════════════════════════════════════════════╝
  `);
});
