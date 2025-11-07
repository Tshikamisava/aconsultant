/**
 * Node.js Email Service
 * Connects to local Node.js server for email sending
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
  serverUrl: string;
  initialized: boolean;
  timestamp: string;
}

class NodeEmailService {
  private serverUrl = 'http://localhost:3001';
  private emailEndpoint = '/send-email';
  
  constructor() {
    console.log('📧 Node.js Email Service initialized');
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
      console.log('📧 Sending email via Node.js server:', {
        from: from_name,
        email: from_email,
        to: 'lhlongwane81@gmail.com'
      });

      console.log('📤 Connecting to Node.js email server...');

      const response = await fetch(`${this.serverUrl}${this.emailEndpoint}`, {
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
        const errorData = await response.json();
        console.error('❌ Server error:', errorData);
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Email sent successfully via Node.js:', result);

      return {
        success: true,
        message: 'Email sent successfully via Node.js server',
        messageId: result.messageId || 'success',
        service: 'Node.js + Nodemailer'
      };

    } catch (error: any) {
      console.error('❌ Email sending failed:', error);
      
      // More specific error handling
      let errorMessage = 'Failed to send email';
      
      if (error.message.includes('fetch')) {
        errorMessage = 'Cannot connect to email server. Please make sure the Node.js server is running.';
      } else if (error.message.includes('EAUTH')) {
        errorMessage = 'Email authentication failed. Please check email credentials.';
      } else if (error.message.includes('ENOTFOUND')) {
        errorMessage = 'Email server configuration error.';
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
      const response = await fetch(`${this.serverUrl}/health`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  getStatus(): ServiceStatus {
    return {
      service: 'Node.js Email Server',
      serverUrl: this.serverUrl,
      initialized: true,
      timestamp: new Date().toISOString()
    };
  }
}

// Create singleton instance
const nodeEmailService = new NodeEmailService();

export default nodeEmailService;