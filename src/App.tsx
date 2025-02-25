import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { useTheme } from './hooks/useTheme';
import { Home } from './pages/Home';
import { Videos } from './pages/Videos';
import { Shop } from './pages/Shop';
import { Support } from './pages/Support';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { Cookies } from './pages/Cookies';

function App() {
  const { isDark, setIsDark } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 
      dark:bg-gradient-to-br dark:from-purple-900 dark:via-blue-900 dark:to-black 
      bg-gradient-to-br from-blue-50 via-purple-50 to-white
      dark:text-white text-gray-900`}>
      
      <Navigation
        isDark={isDark}
        setIsDark={setIsDark}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/support" element={<Support />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
      </Routes>

      <Footer />
      <CookieConsent />
    </div>
  );
}

export default App;