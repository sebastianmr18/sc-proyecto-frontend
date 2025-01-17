// app/components/Footer.tsx
"use client";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import useSidebarStore from '../globals/SidebarState';
import '@/public/styles/footer.css';

export default function Footer() {
  const { isSidebarOpen } = useSidebarStore();

  return (
      <footer className={`footer p-6 shadow-lg mt-auto text-white ${isSidebarOpen ? 'footer-shifted' : ''}`}>
          <div className="footer-container">
              <div className="footer-brand">
                  <p className="footer-text">
                      © {new Date().getFullYear()} My App. All rights reserved. 
                      <br /> Made with ❤️ by Sebastian Muñoz (@sebastianmr18).
                  </p>
              </div>
              <div className="footer-links">
                  <a href="/privacy" className="footer-link">Privacy Policy</a>
                  <a href="/terms" className="footer-link">Terms of Service</a>
              </div>
              <div className="footer-social">
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <FaFacebook size={24} />
                  </a>
                  <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <FaTwitter size={24} />
                  </a>
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <FaInstagram size={24} />
                  </a>
                  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <FaLinkedin size={24} />
                  </a>
              </div>
          </div>
      </footer>
  );
}
