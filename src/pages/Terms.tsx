import React from 'react';
import { Shield } from 'lucide-react';
import { SectionTitle } from '../components/SectionTitle';
import { containerStyles } from '../styles/common';

export const Terms: React.FC = () => {
  return (
    <div className={containerStyles.content}>
      <SectionTitle icon={Shield} title="Terms of Service" />
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">
          Welcome to SHAKATAKA. By accessing our website, you agree to these terms and conditions.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the materials (information or software) on SHAKATAKA's website for personal, non-commercial transitory viewing only.
        </p>

        <h2>3. User Account</h2>
        <p>
          If you create an account on the website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account.
        </p>

        <h2>4. Intellectual Property</h2>
        <p>
          The Service and its original content, features, and functionality are owned by SHAKATAKA and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
        </p>

        <h2>5. Purchases</h2>
        <p>
          If you wish to purchase any product or service made available through the Service, you may be asked to supply certain information relevant to your Purchase including your credit card number, the expiration date of your credit card, your billing address, and your shipping information.
        </p>

        <h2>6. Termination</h2>
        <p>
          We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
        </p>

        <h2>7. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at support@shakataka.com.
        </p>
      </div>
    </div>
  );
};