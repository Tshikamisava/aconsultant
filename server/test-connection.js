import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('Testing Gmail SMTP connection...');
console.log('Email User:', process.env.EMAIL_USER);
console.log('Password length:', process.env.EMAIL_APP_PASSWORD?.length || 0);
console.log('');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Connection FAILED:');
    console.error(error.message);
    console.log('');
    console.log('Please check:');
    console.log('1. 2-Step Verification is enabled: https://myaccount.google.com/security');
    console.log('2. App Password is correct: https://myaccount.google.com/apppasswords');
    console.log('3. App Password has no spaces');
    console.log('4. You\'re using an App Password, NOT your regular Gmail password');
  } else {
    console.log('✅ Connection SUCCESSFUL!');
    console.log('Gmail SMTP is configured correctly and ready to send emails.');
  }
  process.exit(error ? 1 : 0);
});
