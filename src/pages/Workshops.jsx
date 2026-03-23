import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Workshops.css'
import { ALL_WORKSHOPS } from '../data/workshops'

gsap.registerPlugin(ScrollTrigger)


export default function Workshops() {
  const gridRef = useRef(null)

  useEffect(() => {
    const reveals = document.querySelectorAll('.scroll-reveal')
    reveals.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' }
        }
      )
    })

    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.stagger-card')
      gsap.fromTo(cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 75%', toggleActions: 'play none none none' }
        }
      )
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <div className="workshops-page">
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container page-hero-content">
          <Link to="/" className="back-link">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Home
          </Link>
          <h1 className="scroll-reveal">Creative Workshops</h1>
          <p className="scroll-reveal">Join our transformative mandala art workshops and begin your journey into sacred geometry, meditation, and self-expression.</p>
        </div>
      </section>

      {/* Workshops Grid */}
      <section className="section">
        <div className="container">
          <div ref={gridRef} className="workshops-page-grid">
            {ALL_WORKSHOPS.length > 0 ? (
              ALL_WORKSHOPS.map((ws) => (
                <div key={ws.id} className="workshop-page-card stagger-card card-hover">
                  <div className="workshop-page-image">
                    <img src={ws.img} alt={ws.title} />
                    <span className="workshop-level-badge">{ws.level}</span>
                  </div>
                  <div className="workshop-page-body">
                    <div className="workshop-meta">
                      <span className="workshop-page-date">
                        <span className="material-symbols-outlined meta-icon">calendar_today</span>
                        {ws.date}
                      </span>
                      <span className="workshop-page-time">
                        <span className="material-symbols-outlined meta-icon">schedule</span>
                        {ws.time}
                      </span>
                    </div>
                    <h3>{ws.title}</h3>
                    <p>{ws.desc}</p>
                    <div className="workshop-page-footer">
                      <span className="workshop-page-price">{ws.price}</span>
                      <a href="mailto:hello@eesha-art.studio?subject=Workshop Registration" className="btn-register">
                        Register Now
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="coming-soon-wrapper" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '100px 0' }}>
                <h2 className="coming-soon-text" style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontSize: '3rem', 
                  color: 'var(--royal-gold)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase'
                }}>Coming Soon</h2>
                <p style={{ color: 'var(--sandstone)', marginTop: '20px' }}>Stay tuned for our upcoming transformative mandala workshops.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
