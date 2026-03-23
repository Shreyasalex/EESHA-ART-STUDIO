import { useRef, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavbarScroll } from '../hooks/useScrollAnimations'
import './Navbar.css'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navRef = useRef(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useNavbarScroll(navRef, isHome ? 600 : 0)

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <nav ref={navRef} className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <img src="/logo.png" alt="Eesha Art Studio Logo" className="navbar-logo" />
          <span className="navbar-title">Eesha Art Studio</span>
        </Link>
        
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Gallery</Link>
          <Link to="/workshops" className="nav-link">Workshops</Link>
          
          <div className="mobile-actions">
            <a href="mailto:hello@eesha-art.studio?subject=Ordering a Mandala" className="btn-nav-outline">
              Order Mandala
            </a>
            <a href="mailto:hello@eesha-art.studio?subject=Booking a Workshop" className="btn-nav-cta">
              Book Workshop
            </a>
          </div>
        </div>

        <div className="navbar-actions">
          <a href="mailto:hello@eesha-art.studio?subject=Ordering a Mandala" className="btn-nav-outline desktop-only">
            Order Mandala
          </a>
          <a href="mailto:hello@eesha-art.studio?subject=Booking a Workshop" className="btn-nav-cta desktop-only">
            Book Workshop
          </a>
          
          <button 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  )
}

