import emailjs from '@emailjs/browser';

interface ContactFormData {
  from_name: string;
  from_email: string;
  message: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
  details?: any;
}

interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  recipientEmail: string;
}

class EmailService {
  private config: EmailConfig;
  private isInitialized: boolean = false;
  private retryAttempts: number = 3;
  private retryDelay: number = 1000; // 1 second

  constructor() {
    this.config = {
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
      recipientEmail: 'info@aconsultant.co.za' // Your email
    };

    // Log configuration status (without exposing sensitive data)
    this.logConfigStatus();
  }

  /**
   * Initialize EmailJS with public key
   */
  private init(): void {
    if (!this.isInitialized && this.config.publicKey) {
      try {
        emailjs.init(this.config.publicKey);
        this.isInitialized = true;
        console.log('✅ EmailJS initialized successfully');
      } catch (error) {
        console.error('❌ Failed to initialize EmailJS:', error);
        throw new Error('EmailJS initialization failed');
      }
    }
  }

  /**
   * Check if service is properly configured
   */
  isConfigured(): boolean {
    return !!(
      this.config.serviceId && 
      this.config.templateId && 
      this.config.publicKey
    );
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate form data
   */
  private validateFormData(formData: ContactFormData): string | null {
    if (!formData.from_name?.trim()) {
      return 'Name is required';
    }
    if (!formData.from_email?.trim()) {
      return 'Email is required';
    }
    if (!this.isValidEmail(formData.from_email)) {
      return 'Please enter a valid email address';
    }
    if (!formData.message?.trim()) {
      return 'Message is required';
    }
    if (formData.message.length < 10) {
      return 'Message must be at least 10 characters long';
    }
    if (formData.message.length > 2000) {
      return 'Message must be less than 2000 characters';
    }
    return null;
  }

  /**
   * Create template parameters for EmailJS
   */
  private createTemplateParams(formData: ContactFormData) {
    const now = new Date();
    
    return {
      // Recipient info
      to_email: this.config.recipientEmail,
      to_name: 'A Consultant Team',
      
      // Sender info
      from_name: formData.from_name.trim(),
      from_email: formData.from_email.trim(),
      reply_to: formData.from_email.trim(),
      
      // Message content
      message: formData.message.trim(),
      subject: `New Contact Form Message from ${formData.from_name.trim()}`,
      
      // Timestamps
      current_time: now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      }),
      sent_date: now.toISOString(),
      
      // Additional metadata
      user_agent: navigator.userAgent,
      page_url: window.location.href,
      referrer: document.referrer || 'Direct',
      timestamp: now.getTime()
    };
  }

  /**
   * Sleep function for retry delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Send email with retry logic
   */
  private async sendWithRetry(templateParams: any, attempt: number = 1): Promise<any> {
    try {
      console.log(`� Sending email (attempt ${attempt}/${this.retryAttempts})...`);
      
      const response = await emailjs.send(
        this.config.serviceId,
        this.config.templateId,
        templateParams,
        this.config.publicKey
      );

      if (response.status === 200) {
        console.log('✅ Email sent successfully:', response);
        return response;
      } else {
        throw new Error(`EmailJS returned status: ${response.status} - ${response.text}`);
      }

    } catch (error: any) {
      console.error(`❌ Email send attempt ${attempt} failed:`, error);

      // If this isn't the last attempt, retry
      if (attempt < this.retryAttempts) {
        console.log(`⏳ Retrying in ${this.retryDelay}ms...`);
        await this.sleep(this.retryDelay);
        return this.sendWithRetry(templateParams, attempt + 1);
      }

      // All attempts failed
      throw error;
    }
  }

  /**
   * Main method to send contact form email
   */
  async sendContactEmail(formData: ContactFormData): Promise<EmailResponse> {
    try {
      console.log('📧 Starting email send process...', {
        sender: formData.from_name,
        email: formData.from_email,
        messageLength: formData.message?.length || 0
      });

      // Validate configuration
      if (!this.isConfigured()) {
        console.error('❌ EmailJS not configured');
        return {
          success: false,
          message: 'Email service is not properly configured',
          error: 'Missing EmailJS configuration. Please contact support.'
        };
      }

      // Validate form data
      const validationError = this.validateFormData(formData);
      if (validationError) {
        console.error('❌ Form validation failed:', validationError);
        return {
          success: false,
          message: validationError,
          error: 'Invalid form data'
        };
      }

      // Initialize EmailJS
      this.init();

      // Prepare template parameters
      const templateParams = this.createTemplateParams(formData);
      
      console.log('📋 Template parameters prepared:', {
        to: templateParams.to_email,
        from: templateParams.from_name,
        subject: templateParams.subject,
        timestamp: templateParams.current_time
      });

      // Send email with retry logic
      const response = await this.sendWithRetry(templateParams);

      return {
        success: true,
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
        details: {
          messageId: response.status,
          timestamp: templateParams.current_time
        }
      };

    } catch (error: any) {
      console.error('❌ Email service error:', error);
      
      // Determine error message based on error type
      let errorMessage = 'Failed to send message. Please try again or contact us directly.';
      let errorCode = 'UNKNOWN_ERROR';

      if (error?.text) {
        if (error.text.includes('Invalid service ID')) {
          errorMessage = 'Email service configuration error. Please contact support.';
          errorCode = 'INVALID_SERVICE_ID';
        } else if (error.text.includes('template')) {
          errorMessage = 'Email template error. Please contact support.';
          errorCode = 'TEMPLATE_ERROR';
        } else if (error.text.includes('rate limit')) {
          errorMessage = 'Too many requests. Please wait a moment and try again.';
          errorCode = 'RATE_LIMITED';
        } else {
          errorMessage = `Email service error: ${error.text}`;
          errorCode = 'EMAILJS_ERROR';
        }
      } else if (error?.message) {
        if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.';
          errorCode = 'NETWORK_ERROR';
        } else {
          errorMessage = error.message;
          errorCode = 'GENERIC_ERROR';
        }
      }

      return {
        success: false,
        message: errorMessage,
        error: errorCode,
        details: {
          originalError: error?.text || error?.message,
          timestamp: new Date().toISOString()
        }
      };
    }
  }

  /**
   * Get detailed service status for debugging
   */
  getStatus(): object {
    return {
      configured: this.isConfigured(),
      initialized: this.isInitialized,
      serviceId: !!this.config.serviceId,
      templateId: !!this.config.templateId,
      publicKey: !!this.config.publicKey,
      recipientEmail: this.config.recipientEmail,
      retryAttempts: this.retryAttempts,
      environment: import.meta.env.MODE || 'unknown'
    };
  }

  /**
   * Log configuration status (for debugging)
   */
  private logConfigStatus(): void {
    const status = this.getStatus();
    
    if (status.configured) {
      console.log('✅ EmailJS configured successfully');
    } else {
      console.warn('⚠️ EmailJS configuration incomplete:', {
        serviceId: status.serviceId,
        templateId: status.templateId,
        publicKey: status.publicKey
      });
    }
  }

  /**
   * Test email service (for development)
   */
  async testEmailService(): Promise<EmailResponse> {
    const testData: ContactFormData = {
      from_name: 'Test User',
      from_email: 'test@example.com',
      message: 'This is a test message from the email service.'
    };

    console.log('🧪 Testing email service...');
    return this.sendContactEmail(testData);
  }
}

// Create and export a singleton instance
const emailService = new EmailService();
export default emailService;