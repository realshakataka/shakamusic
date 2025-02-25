import React from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/videos", label: "Videos" },
  { href: "/shop", label: "Shop" },
  { href: "/support", label: "Support" }
];

export const Navigation: React.FC<NavigationProps> = ({
  isDark,
  setIsDark,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg dark:bg-black/20 bg-white/20 border-b dark:border-white/10 border-black/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold">SHAKATAKA</Link>
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`hover:text-purple-500 transition-colors ${
                    location.pathname === link.href ? 'text-purple-500' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full bg-opacity-20 backdrop-blur-sm
                dark:bg-white/10 dark:hover:bg-white/20
                bg-black/10 hover:bg-black/20
                transition-colors duration-200"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="md:hidden p-2 rounded-full bg-opacity-20 backdrop-blur-sm
                dark:bg-white/10 dark:hover:bg-white/20
                bg-black/10 hover:bg-black/20
                transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen 
          ? 'max-h-64 opacity-100' 
          : 'max-h-0 opacity-0 pointer-events-none'
      }`}>
        <div className="container mx-auto px-4 py-4 space-y-4">
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`block py-2 hover:text-purple-500 transition-colors ${
                location.pathname === link.href ? 'text-purple-500' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};