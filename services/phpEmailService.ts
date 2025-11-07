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
        // Local development - PHP server running on port 8080
        this.baseUrl = 'http://localhost:8080/api';
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

      console.log('📧 Response status:', response.status);
      console.log('📧 Response headers:', Object.fromEntries(response.headers.entries()));

      // Get response text first to check if it's HTML or JSON
      const responseText = await response.text();
      console.log('📧 Raw response:', responseText.substring(0, 200) + '...');

      // Check if response is HTML (indicates PHP error)
      if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
        console.error('❌ PHP returned HTML instead of JSON - likely a PHP error');
        throw new Error(`Server returned HTML instead of JSON. This usually means there's a PHP error. Check ${url} directly in your browser.`);
      }

      // Try to parse as JSON
      let result: EmailResponse;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ Failed to parse JSON response:', responseText);
        throw new Error(`Invalid JSON response from server: ${responseText.substring(0, 100)}...`);
      }

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