/**
 * Email Service - Mailtrap Integration
 * Professional email service for A Consultant website
 * API Key: 6d416d2dfcd048c27a8061cc86b88945
 */

interface FormData {
  from_name: string;
  from_email: string;
  message: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
  messageId: string;
  service: string;
}

interface ServiceStatus {
  service: string;
  apiKey: string;
  initialized: boolean;
  timestamp: string;
}

class EmailService {
  private apiKey = '6d416d2dfcd048c27a8061cc86b88945';
  private apiUrl = 'https://send.api.mailtrap.io/api/send';
  private fromEmail = 'mailtrap@demomailtrap.com'; // Default Mailtrap sender
  private toEmail = 'lhlongwane81@gmail.com';
  
  constructor() {
    console.log('📧 Mailtrap Email Service initialized');
  }

  async sendContactEmail(formData: FormData): Promise<EmailResponse> {
    const { from_name, from_email, message } = formData;

    // Validate required fields
    if (!from_name || !from_email || !message) {
      throw new Error('Missing required fields: name, email, and message are required');
    }

    // Validate email format
    if (!this.validateEmail(from_email)) {
      throw new Error('Please enter a valid email address');
    }

    try {
      console.log('📧 Sending email via Mailtrap:', {
        from: from_email,
        to: this.toEmail,
        subject: `New Contact Form Message from ${from_name}`
      });

      // Prepare email payload for Mailtrap API
      const emailPayload = {
        from: {
          email: this.fromEmail,
          name: "A Consultant Website"
        },
        to: [
          {
            email: this.toEmail,
            name: "A Consultant Team"
          }
        ],
        subject: `New Contact Form Message from ${from_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${from_name}</p>
              <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${from_email}</p>
              <p style="margin: 0 0 10px 0;"><strong>Message:</strong></p>
              <div style="background-color: white; padding: 15px; border-left: 4px solid #007bff; margin-top: 10px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">
              This message was sent from the A Consultant website contact form.
            </p>
          </div>
        `,
        text: `
New Contact Form Submission

Name: ${from_name}
Email: ${from_email}

Message:
${message}

---
This message was sent from the A Consultant website contact form.
        `,
        category: "Contact Form"
      };

      console.log('📤 Sending request to Mailtrap API...');

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(emailPayload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Mailtrap API error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error(`Mailtrap API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ Email sent successfully via Mailtrap:', result);

      return {
        success: true,
        message: 'Email sent successfully via Mailtrap',
        messageId: result.message_id || result.id || 'success',
        service: 'Mailtrap'
      };

    } catch (error: any) {
      console.error('❌ Email sending failed:', error);
      
      // More specific error handling
      let errorMessage = 'Failed to send email';
      
      if (error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (error.message.includes('401')) {
        errorMessage = 'Email service authentication error.';
      } else if (error.message.includes('429')) {
        errorMessage = 'Too many requests. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      throw new Error(errorMessage);
    }
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getStatus(): ServiceStatus {
    return {
      service: 'Mailtrap',
      apiKey: this.apiKey.substring(0, 8) + '...',
      initialized: true,
      timestamp: new Date().toISOString()
    };
  }
}

// Create singleton instance
const emailService = new EmailService();

export default emailService;