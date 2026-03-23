import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Products.css'
import { ALL_PRODUCTS } from '../data/products'

gsap.registerPlugin(ScrollTrigger)


export default function Products() {
  const gridRef = useRef(null)

  useEffect(() => {
    // Section reveal
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

    // Card stagger
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.stagger-card')
      gsap.fromTo(cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 75%', toggleActions: 'play none none none' }
        }
      )
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <div className="products-page">
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container page-hero-content">
          <Link to="/" className="back-link">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Home
          </Link>
          <h1 className="scroll-reveal">Our Art Gallery</h1>
          <p className="scroll-reveal">A curated collection of handcrafted mandala masterpieces, each infused with sacred geometry and royal heritage.</p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section">
        <div className="container">
          <div ref={gridRef} className="products-page-grid">
            {ALL_PRODUCTS.map((product) => (
              <div key={product.id} className="product-page-card stagger-card card-hover">
                <div className="product-page-image palace-arch">
                  <img src={product.img} alt={product.name} />
                  <div className="product-page-overlay"></div>
                </div>
                  <div className="product-page-body">
                    <div className="product-header-row">
                      <h3>{product.name}</h3>
                      <span className="product-size">{product.size}</span>
                    </div>
                    <p>{product.desc}</p>
                    <div className="product-page-footer">

                    <span className="product-page-price">{product.price}</span>
                    <button className="btn-enquire">
                      Enquire
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
