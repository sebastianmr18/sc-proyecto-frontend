// app/components/Footer.tsx
"use client";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import useSidebarStore from '../globals/SidebarState';
import '@/public/styles/footer.css';

export default function Footer() {
    const { isSidebarOpen } = useSidebarStore();

    return (
      <footer className={`footer p-6 shadow-lg mt-auto text-white ${isSidebarOpen ? 'footer-shifted' : ''}`}>
        <div className="footer-content">
          <p className="footer-text">
            © {new Date().getFullYear()} My App. All rights reserved. Made with ❤️ by Sebastian Muñoz (@sebastianmr18).
          </p>
          <div className="social-icons">
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
