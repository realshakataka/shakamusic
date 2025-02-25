import React, { useState, useEffect } from 'react';
import { Cookie, X, Settings, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }

    const handleTogglePreferences = () => {
      setShowPreferences(true);
      setShowBanner(true);
    };

    window.addEventListener('toggle-cookie-preferences', handleTogglePreferences);
    return () => window.removeEventListener('toggle-cookie-preferences', handleTogglePreferences);
  }, []);

  const handleAcceptAll = () => {
    setSettings({
      necessary: true,
      analytics: true,
      marketing: true
    });
    localStorage.setItem('cookie-consent', 'all');
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(settings));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Cookie className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-bold">Cookie Preferences</h2>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-sm dark:text-gray-400 text-gray-600">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies. 
              Read our <Link to="/cookies" className="text-purple-500 hover:text-purple-600">Cookie Policy</Link> and{' '}
              <Link to="/privacy" className="text-purple-500 hover:text-purple-600">Privacy Policy</Link> to learn more.
            </p>
          </div>

          {showPreferences ? (
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Shield className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Necessary Cookies</h3>
                    <input
                      type="checkbox"
                      checked={settings.necessary}
                      disabled
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </div>
                  <p className="text-sm dark:text-gray-400 text-gray-600 mt-1">
                    Essential for the website to function properly. Cannot be disabled.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Settings className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Analytics Cookies</h3>
                    <input
                      type="checkbox"
                      checked={settings.analytics}
                      onChange={(e) => setSettings({ ...settings, analytics: e.target.checked })}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </div>
                  <p className="text-sm dark:text-gray-400 text-gray-600 mt-1">
                    Help us understand how visitors interact with our website.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Cookie className="w-5 h-5 text-yellow-500 mt-1" />
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Marketing Cookies</h3>
                    <input
                      type="checkbox"
                      checked={settings.marketing}
                      onChange={(e) => setSettings({ ...settings, marketing: e.target.checked })}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </div>
                  <p className="text-sm dark:text-gray-400 text-gray-600 mt-1">
                    Used to deliver personalized advertisements and track their performance.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            {!showPreferences && (
              <button
                onClick={() => setShowPreferences(true)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cookie Settings
              </button>
            )}
            {showPreferences ? (
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-lg transition-colors"
              >
                Save Preferences
              </button>
            ) : (
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-lg transition-colors"
              >
                Accept All
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};