import { Link, useLocation } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const location = useLocation();
  const showSocials = location.pathname === '/products' || location.pathname === '/workshops';

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand-area">
            <div className="footer-brand">
              <img src="/logo.png" alt="Eesha Art Studio Logo" className="footer-logo" />
              <span className="footer-brand-name">Eesha Art Studio</span>
            </div>
            <p className="footer-description">
              Preserving the heritage of sacred geometry through handcrafted mandalas and meditative art therapy. Join us in bringing divinity to modern living.
            </p>
            {showSocials && (
              <div className="footer-socials">
                <a href="https://www.instagram.com/eeshaartstudio/" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="https://www.facebook.com/people/Eeshaartstudio/61583248612462/" target="_blank" rel="noopener noreferrer" className="social-link" title="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="https://www.youtube.com/@eeshaartstudio" target="_blank" rel="noopener noreferrer" className="social-link" title="YouTube">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
                </a>
                <a href="https://wa.me/917019266152" target="_blank" rel="noopener noreferrer" className="social-link" title="WhatsApp Business">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8Z"></path></svg>
                </a>
              </div>
            )}
          </div>

          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/products">Art Gallery</Link></li>
              <li><Link to="/workshops">Upcoming Workshops</Link></li>
              <li><a href="#about">Our Story</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Contact Us</h4>
            <ul>
              <li className="contact-item">
                <span className="material-symbols-outlined contact-icon">location_on</span>
                Bengaluru, Karnataka, India
              </li>
              <li className="contact-item">
                <span className="material-symbols-outlined contact-icon">mail</span>
                eeshaartstudio@gmail.com
              </li>
              <li className="contact-item">
                <span className="material-symbols-outlined contact-icon">phone</span>
                +91 7019266152
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Eesha Art Studio. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Mandala background pattern */}
      <div className="footer-mandala-bg">
        <span className="material-symbols-outlined">filter_vintage</span>
      </div>
    </footer>
  )
}
