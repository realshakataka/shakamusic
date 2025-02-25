import React from 'react';
import { Lock } from 'lucide-react';
import { SectionTitle } from '../components/SectionTitle';
import { containerStyles } from '../styles/common';

export const Privacy: React.FC = () => {
  return (
    <div className={containerStyles.content}>
      <SectionTitle icon={Lock} title="Privacy Policy" />
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect information that you provide directly to us, including:
        </p>
        <ul>
          <li>Name and contact information</li>
          <li>Account credentials</li>
          <li>Payment information</li>
          <li>Communication preferences</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect to:
        </p>
        <ul>
          <li>Provide and maintain our services</li>
          <li>Process your transactions</li>
          <li>Send you marketing communications (with your consent)</li>
          <li>Improve our website and services</li>
        </ul>

        <h2>3. Information Sharing</h2>
        <p>
          We do not sell your personal information. We may share your information with:
        </p>
        <ul>
          <li>Service providers who assist in our operations</li>
          <li>Law enforcement when required by law</li>
          <li>Business partners (with your consent)</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2>5. Your Rights</h2>
        <p>
          You have the right to:
        </p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
          <li>Data portability</li>
        </ul>

        <h2>6. Contact Us</h2>
        <p>
          For any privacy-related questions or concerns, please contact us at privacy@shakataka.com.
        </p>
      </div>
    </div>
  );
};