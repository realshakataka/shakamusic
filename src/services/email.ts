import emailjs from 'emailjs-com';

const EMAIL_CONFIG = {
  SERVICE_ID: 'service_sk7znnf',
  TEMPLATE_ID: 'template_nkwdf27',
  PUBLIC_KEY: 'GbWf9YHCjqtWPIG8y',
  TO_EMAIL: 'thatshakataka@gmail.com'
};

interface EmailParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const emailService = {
  init() {
    emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
  },

  async sendEmail(params: EmailParams) {
    try {
      const templateParams = {
        to_email: EMAIL_CONFIG.TO_EMAIL,
        from_name: params.name,
        from_email: params.email,
        subject: params.subject,
        message: params.message
      };

      await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        templateParams
      );
    } catch (error) {
      throw new Error('Failed to send email. Please try again later.');
    }
  }
};