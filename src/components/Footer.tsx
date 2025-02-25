import React from 'react';
import { Heart, Shield, Cookie, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t dark:border-white/10 border-black/10">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">SHAKATAKA</h3>
            <p className="text-sm dark:text-gray-400 text-gray-600">
              Bringing innovative sounds and authentic vibes to the global music scene.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/videos" className="hover:text-purple-500 transition-colors">Videos</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-purple-500 transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-purple-500 transition-colors">Support</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="hover:text-purple-500 transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-purple-500 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-purple-500 transition-colors">Cookie Policy</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Newsletter</h4>
            <p className="text-sm dark:text-gray-400 text-gray-600 mb-4">
              Subscribe to get updates on new releases and exclusive content.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-lg bg-transparent border dark:border-white/10 border-black/10 text-sm"
              />
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t dark:border-white/10 border-black/10">
          <p className="text-sm dark:text-gray-400 text-gray-600 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> by SHAKATAKA Team
          </p>
          <div className="flex items-center gap-4 text-sm dark:text-gray-400 text-gray-600">
            <Link to="/terms" className="hover:text-purple-500 transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-purple-500 transition-colors">Privacy</Link>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('toggle-cookie-preferences'))}
              className="hover:text-purple-500 transition-colors"
            >
              Cookie Preferences
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};