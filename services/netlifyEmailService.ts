/**
 * Netlify Email Service
 * Connects to Netlify serverless functions for email sending
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
  apiUrl: string;
  initialized: boolean;
  timestamp: string;
}

class NetlifyEmailService {
  private baseUrl: string;
  private emailEndpoint = '/api/send-email';
  
  constructor() {
    // Use production URL when deployed, Netlify dev URL for development
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      // For local development, use the Netlify dev server port
      this.baseUrl = 'http://localhost:50808';
    } else {
      // For production, use your domain
      this.baseUrl = 'https://www.aconsultantant.co.za';
    }
    
    console.log('📧 Netlify Email Service initialized for:', this.baseUrl);
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
      console.log('📧 Sending email via Netlify Functions:', {
        from: from_name,
        email: from_email,
        to: 'lhlongwane81@gmail.com',
        endpoint: `${this.baseUrl}${this.emailEndpoint}`
      });

      console.log('📤 Connecting to Netlify serverless function...');

      const response = await fetch(`${this.baseUrl}${this.emailEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from_name,
          from_email,
          message
        })
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
        }
        console.error('❌ Netlify function error:', errorData);
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Email sent successfully via Netlify:', result);

      return {
        success: true,
        message: 'Email sent successfully via Netlify Functions',
        messageId: result.messageId || 'success',
        service: 'Netlify + Nodemailer'
      };

    } catch (error: any) {
      console.error('❌ Email sending failed:', error);
      
      // More specific error handling
      let errorMessage = 'Failed to send email';
      
      if (error.message.includes('fetch')) {
        errorMessage = 'Cannot connect to email service. Please check your internet connection.';
      } else if (error.message.includes('EAUTH')) {
        errorMessage = 'Email authentication failed.';
      } else if (error.message.includes('ENOTFOUND')) {
        errorMessage = 'Email server configuration error.';
      } else if (error.message.includes('CORS')) {
        errorMessage = 'Cross-origin request error. Please try again.';
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

  async checkServerHealth(): Promise<boolean> {
    try {
      // For Netlify, we can check if the site is reachable
      const response = await fetch(this.baseUrl, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  getStatus(): ServiceStatus {
    return {
      service: 'Netlify Serverless Functions',
      apiUrl: `${this.baseUrl}${this.emailEndpoint}`,
      initialized: true,
      timestamp: new Date().toISOString()
    };
  }
}

// Create singleton instance
const netlifyEmailService = new NetlifyEmailService();

export default netlifyEmailService;