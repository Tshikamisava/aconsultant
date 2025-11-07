interface ContactData {
  from_name: string;
  from_email: string;
  message: string;
}

interface EmailResponse {
  success: boolean;
  message?: string;
  error?: string;
  timestamp?: string;
}

class PHPEmailService {
  private baseUrl: string;

  constructor() {
    // Detect environment and set appropriate base URL
    if (typeof window !== 'undefined') {
      // Client-side detection
      const hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        // Local development - assume PHP server running on localhost
        this.baseUrl = 'http://localhost/api';
      } else {
        // Production - use relative path (same domain)
        this.baseUrl = '/api';
      }
    } else {
      // Server-side or fallback
      this.baseUrl = '/api';
    }
  }

  async sendContactEmail(data: ContactData): Promise<EmailResponse> {
    const url = `${this.baseUrl}/contact.php`;
    
    console.log('📧 Sending email via PHP backend to:', url);
    console.log('📧 Email data:', { ...data, message: data.message.substring(0, 50) + '...' });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: EmailResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      if (!result.success) {
        throw new Error(result.error || 'Email sending failed');
      }

      console.log('✅ Email sent successfully via PHP:', result);
      return result;

    } catch (error: any) {
      console.error('❌ PHP email service error:', error);
      
      // Provide helpful error messages
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to email service. Please check your internet connection.');
      }
      
      if (error.message.includes('404')) {
        throw new Error('Email service not found. Please contact support.');
      }
      
      if (error.message.includes('CORS')) {
        throw new Error('Cross-origin request blocked. Please contact support.');
      }

      throw error;
    }
  }

  getStatus(): string {
    return `PHP Email Service ready - Base URL: ${this.baseUrl}`;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  // For development: set custom base URL
  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }
}

// Export singleton instance
const phpEmailService = new PHPEmailService();
export default phpEmailService;