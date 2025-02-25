import React from 'react';
import { Cookie } from 'lucide-react';
import { SectionTitle } from '../components/SectionTitle';
import { containerStyles } from '../styles/common';

export const Cookies: React.FC = () => {
  return (
    <div className={containerStyles.content}>
      <SectionTitle icon={Cookie} title="Cookie Policy" />
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">
          This Cookie Policy explains how SHAKATAKA uses cookies and similar technologies to recognize you when you visit our website.
        </p>

        <h2>What are cookies?</h2>
        <p>
          Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide reporting information.
        </p>

        <h2>Types of Cookies We Use</h2>
        
        <h3>Essential Cookies</h3>
        <p>
          These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
        </p>

        <h3>Analytics Cookies</h3>
        <p>
          These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
        </p>

        <h3>Marketing Cookies</h3>
        <p>
          These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad.
        </p>

        <h2>Managing Cookies</h2>
        <p>
          You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. However, if you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.
        </p>

        <div className="mt-8">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('toggle-cookie-preferences'))}
            className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-lg transition-colors"
          >
            Manage Cookie Preferences
          </button>
        </div>
      </div>
    </div>
  );
};