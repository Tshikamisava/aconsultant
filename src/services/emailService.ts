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
}

class EmailService {
  private serviceId: string;
  private templateId: string;
  private publicKey: string;

  constructor() {
    // These will be set from environment variables
    this.serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
    this.templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
    this.publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
  }

  // Initialize EmailJS with your public key
  init(): void {
    if (this.publicKey) {
      emailjs.init(this.publicKey);
    }
  }

  // Check if service is properly configured
  isConfigured(): boolean {
    return !!(this.serviceId && this.templateId && this.publicKey);
  }

  // Send contact form email
  async sendContactEmail(formData: ContactFormData): Promise<EmailResponse> {
    try {
      // Check if service is configured
      if (!this.isConfigured()) {
        return {
          success: false,
          message: 'Email service not configured',
          error: 'Missing EmailJS configuration. Please set up environment variables.'
        };
      }

      // Initialize EmailJS
      this.init();

      console.log('📧 Sending email via EmailJS...', {
        service: this.serviceId,
        template: this.templateId,
        from: formData.from_name,
        email: formData.from_email
      });

      // Prepare template parameters
      const templateParams = {
        to_name: 'A Consultant Team', // Who receives the email
        from_name: formData.from_name,
        from_email: formData.from_email,
        message: formData.message,
        reply_to: formData.from_email,
        // Add timestamp
        sent_date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );

      console.log('✅ Email sent successfully:', response);

      return {
        success: true,
        message: 'Email sent successfully! We\'ll get back to you soon.'
      };

    } catch (error: any) {
      console.error('❌ Email sending failed:', error);
      
      let errorMessage = 'Failed to send email. Please try again.';
      
      // Handle specific EmailJS errors
      if (error?.text) {
        errorMessage = `Email service error: ${error.text}`;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      return {
        success: false,
        message: errorMessage,
        error: error?.text || error?.message || 'Unknown error'
      };
    }
  }

  // Get service status for debugging
  getStatus(): string {
    return `EmailJS Service - Configured: ${this.isConfigured()}`;
  }
}

// Create and export a singleton instance
const emailService = new EmailService();
export default emailService;