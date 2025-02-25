import React from 'react';
import { MessageCircle, Mail, Phone, Globe } from 'lucide-react';
import { SectionTitle } from '../components/SectionTitle';
import { Card } from '../components/Card';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { useForm } from '../hooks/useForm';
import { emailService } from '../services/email';
import { containerStyles, textStyles } from '../styles/common';

const CONTACT_INFO = [
  {
    icon: Mail,
    title: 'Email Us',
    content: 'thatshakataka@gmail.com',
    isLink: true
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '+39 380 385 2438'
  },
  {
    icon: Globe,
    title: 'Meet Up',
    content: 'Venezia, Italy'
  }
];

const FAQ_ITEMS = [
  {
    q: "How can I book SHAKATAKA for an event?",
    a: "Please use our contact form with event details for booking inquiries."
  },
  {
    q: "What's your refund policy for merchandise?",
    a: "We offer refunds based on situations within 30 days of purchase for unused items and services."
  },
  {
    q: "How can I get updates about new releases?",
    a: "Follow our social media channels or subscribe to our newsletter."
  }
];

export const Support: React.FC = () => {
  const {
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
    status,
    resetForm
  } = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    onSubmit: async (values) => {
      await emailService.sendEmail(values);
      return Promise.resolve();
    }
  });

  return (
    <div className={containerStyles.content}>
      <SectionTitle icon={MessageCircle} title="SUPPORT & CONTACT" />

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Card className="p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Have questions? We're here to help and answer any question you might have.
            </p>

            <div className="space-y-4">
              {CONTACT_INFO.map((info, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-full">
                    <info.icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">{info.title}</p>
                    {info.isLink ? (
                      <a
                        href={`mailto:${info.content}`}
                        className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">{info.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">FAQ</h3>
            <div className="space-y-4">
              {FAQ_ITEMS.map((faq, index) => (
                <details key={index} className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-medium">
                    {faq.q}
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-600 dark:text-gray-300">{faq.a}</p>
                </details>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-6">Send a Message</h3>
          
          {status.type && (
            <Alert
              type={status.type}
              message={status.message}
              className="mb-6"
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                className={textStyles.input}
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className={textStyles.input}
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <select
                name="subject"
                value={values.subject}
                onChange={handleChange}
                className={textStyles.input}
                required
              >
                <option value="">Select a subject</option>
                <option value="booking">Booking Inquiry</option>
                <option value="merchandise">Merchandise Support</option>
                <option value="press">Press Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                value={values.message}
                onChange={handleChange}
                className={textStyles.input}
                rows={6}
                placeholder="Your message..."
                required
              ></textarea>
            </div>

            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              fullWidth
            >
              Send Message
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};