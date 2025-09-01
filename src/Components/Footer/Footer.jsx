import React from 'react';
import './footer.css';

const Footer = () => {
  const languages = [
    { name: 'English', code: 'en', flag: 'US' },
    { name: 'Spanish', code: 'es', flag: 'ES' },
    { name: 'French', code: 'fr', flag: 'FR' },
    { name: 'German', code: 'de', flag: 'DE' },
    { name: 'Italian', code: 'it', flag: 'IT' },
    { name: 'Portuguese', code: 'pt', flag: 'PT' },
    { name: 'Russian', code: 'ru', flag: 'RU' },
    { name: 'Japanese', code: 'ja', flag: 'JP' },
    { name: 'Korean', code: 'ko', flag: 'KR' },
    { name: 'Chinese', code: 'zh', flag: 'CN' },
    { name: 'Arabic', code: 'ar', flag: 'SA' },
    { name: 'Hindi', code: 'hi', flag: 'IN' },
    { name: 'Turkish', code: 'tr', flag: 'TR' },
    { name: 'Dutch', code: 'nl', flag: 'NL' },
    { name: 'Swedish', code: 'sv', flag: 'SE' },
    { name: 'Norwegian', code: 'no', flag: 'NO' },
    { name: 'Danish', code: 'da', flag: 'DK' },
    { name: 'Polish', code: 'pl', flag: 'PL' },
    { name: 'Czech', code: 'cs', flag: 'CZ' },
    { name: 'Hungarian', code: 'hu', flag: 'HU' },
    { name: 'Finnish', code: 'fi', flag: 'FI' },
    { name: 'Greek', code: 'el', flag: 'GR' },
    { name: 'Hebrew', code: 'he', flag: 'IL' },
    { name: 'Thai', code: 'th', flag: 'TH' },
    { name: 'Vietnamese', code: 'vi', flag: 'VN' },
    { name: 'Indonesian', code: 'id', flag: 'ID' },
    { name: 'Malay', code: 'ms', flag: 'MY' },
    { name: 'Filipino', code: 'tl', flag: 'PH' },
    { name: 'Ukrainian', code: 'uk', flag: 'UA' },
    { name: 'Romanian', code: 'ro', flag: 'RO' },
    { name: 'Bulgarian', code: 'bg', flag: 'BG' },
    { name: 'Croatian', code: 'hr', flag: 'HR' },
    { name: 'Serbian', code: 'sr', flag: 'RS' },
    { name: 'Slovenian', code: 'sl', flag: 'SI' },
    { name: 'Slovak', code: 'sk', flag: 'SK' },
    { name: 'Estonian', code: 'et', flag: 'EE' },
    { name: 'Latvian', code: 'lv', flag: 'LV' },
    { name: 'Lithuanian', code: 'lt', flag: 'LT' }
  ];

  const handleLanguageClick = (languageCode) => {
    // This could navigate to a language-specific page or set the language in the app
    console.log(`Selected language: ${languageCode}`);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Company Info */}
          <div className="footer-section">
            <h3 className="footer-title">Vocab Blender</h3>
            <p className="footer-description">
              Master languages through interactive learning experiences. 
              Build vocabulary, track progress, and achieve fluency.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="social-icon">📘</i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i className="social-icon">🐦</i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="social-icon">📷</i>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <i className="social-icon">💼</i>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <i className="social-icon">📺</i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/about">About Us</a></li>
              <li><a href="/learn">Start Learning</a></li>
              <li><a href="/progress">Track Progress</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/help">Help Center</a></li>
            </ul>
          </div>

          {/* Learning Resources */}
          <div className="footer-section">
            <h3 className="footer-title">Learning Resources</h3>
            <ul className="footer-links">
              <li><a href="/grammar">Grammar Guides</a></li>
              <li><a href="/pronunciation">Pronunciation</a></li>
              <li><a href="/culture">Cultural Notes</a></li>
              <li><a href="/blog">Language Blog</a></li>
              <li><a href="/tips">Study Tips</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/tutorials">Tutorials</a></li>
              <li><a href="/community">Community</a></li>
              <li><a href="/feedback">Feedback</a></li>
              <li><a href="/bug-report">Report Bug</a></li>
            </ul>
          </div>
        </div>

        {/* Languages Grid */}
        <div className="footer-languages">
          <h3 className="footer-title">Available Languages</h3>
          <div className="languages-grid">
            {languages.map((language) => (
              <button
                key={language.code}
                className="language-item"
                onClick={() => handleLanguageClick(language.code)}
                title={`Learn ${language.name}`}
              >
                <span className="language-flag">{language.flag}</span>
                <span className="language-name">{language.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Legal Footer */}
        <div className="footer-legal">
          <div className="legal-links">
            <a href="/terms">Terms of Service</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/cookies">Cookie Policy</a>
            <a href="/gdpr">GDPR Compliance</a>
            <a href="/accessibility">Accessibility</a>
            <a href="/sitemap">Sitemap</a>
          </div>
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} Vocab Blender. All rights reserved.</p>
            <p className="legal-disclaimer">
              Vocab Blender is an educational platform designed to help users learn languages 
              through interactive methods. We are committed to protecting your privacy and 
              providing a safe learning environment.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;