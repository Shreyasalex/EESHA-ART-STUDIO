import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Home.css'
import { ALL_PRODUCTS as PRODUCTS } from '../data/products'
import { ALL_WORKSHOPS as WORKSHOPS_DATA } from '../data/workshops'
import { TESTIMONIALS } from '../data/testimonials'

gsap.registerPlugin(ScrollTrigger)

// Section 2 — "Does this sound like you?" recognition lines
const RECOGNITION_LINES = [
  "I'm always doing something for everyone else.",
  'My mind never switches off.',
  'I want to learn something new.',
  "I want something that's just mine.",
]

// Section 3 — "Discover Dot Mandala" process copy
const DISCOVER_STEPS = [
  {
    step: 1,
    title: 'A single dot',
    text: 'Every mandala begins the same way — one dot, placed at the center. No pressure to get it "right," just a starting point.',
  },
  {
    step: 2,
    title: 'A pattern takes shape',
    text: "Dot by dot, a rhythm builds outward. This is where the hour disappears — you're focused on the next dot, not the whole picture.",
  },
  {
    step: 3,
    title: 'A finished mandala',
    text: "What began as one dot becomes a complete, radiating pattern — a quiet, tangible record of the hour you just spent with yourself.",
  },
]

// Generates dot positions around a ring for the DotMandalaGlyph visual.
// `fraction` < 1 leaves the ring visibly incomplete, for the "in progress" step.
function ringDots(count, radius, fraction = 1, center = 100) {
  const total = Math.round(count * fraction)
  return Array.from({ length: total }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2
    return {
      cx: center + radius * Math.cos(angle),
      cy: center + radius * Math.sin(angle),
    }
  })
}

// Small inline SVG glyph used by the Section 3 process visual — draws the
// mandala with progressively more dot-rings so no new photography is needed.
function DotMandalaGlyph({ stage }) {
  const ringConfigs = {
    1: [],
    2: [{ count: 8, radius: 38, fraction: 1 }, { count: 14, radius: 66, fraction: 0.5 }],
    3: [
      { count: 8, radius: 38, fraction: 1 },
      { count: 14, radius: 66, fraction: 1 },
      { count: 20, radius: 92, fraction: 1 },
    ],
  }[stage] || []

  return (
    <svg viewBox="0 0 200 200" className="discover-glyph" aria-hidden="true">
      <circle cx="100" cy="100" r="96" className="discover-glyph-guide" />
      {ringConfigs.map((ring, ringIndex) =>
        ringDots(ring.count, ring.radius, ring.fraction).map((dot, i) => (
          <circle key={`${ringIndex}-${i}`} cx={dot.cx} cy={dot.cy} r="4" className="discover-glyph-dot" />
        ))
      )}
      <circle cx="100" cy="100" r="7" className="discover-glyph-dot discover-glyph-dot-center" />
    </svg>
  )
}

// Image URLs from original code.html
// Image URLs from original code.html and high-quality local assets
const IMAGES = {
  mandala: '/background/texture.png',
  artist: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKzB9Tl15Vvly_BfFQOU29qH0hNAKYejxlt4NmyShkjRsM9AY4fVErJHKWondMPHAAmngMbkM77hq4G5aMcNRlTIpyWrll6RTNwNBoCozgkMn0RHyngfH-__gBHIc6EsKhVEsj2yU9deAU7mrQB8tgigXVu-oAK2IL8tC9JOgVEgBC0295ModkwxBiIO87U9JU3nKiZtVKp15-xlAUtXOR4tRk50b4kJEOukCTH4tA_5paqhl_15nCJr4AgcpdE5WbdiNYqEZRBqqj',
  workshop: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ344skW8K95JPC8VVx_XXKOxkor-RIBe5Cjxw5DfIBRiT5n5A3lv9fjPnoAF6TGi1_Wl5Tm9xddXz34gjIh660mwiwsYqD-_uxPnFjqtB0DTr7HRjT1sQjK83Gomqzu8hOHicSEg7qwNjgrevJqd0BXsw41F8fHcy82ws9DpLloCJv49ZTJLzKQxMt0cCXK0iCTXQjjfIeK2WFCxrxBf6kuVAcwrlGqGRGKdMWfaZsZSuGJKKX4rGqu0qjgpZ1sZxjWdrgwLlxEq',
  custom: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiobaAK6VjkIN52W1PES4cDYusCfbjWdYf0vl82dy4rpNFv7-0YflT_TzcE2BobSH9d509oItct08Oosokl4mBBwGS_d4OeeSWFiAELgIf-NCC95PGfh1JS8eAbDG3xt3N2DhtjmnlMLBtXVBXTD4Bhz0rvtsU7pfDUFavxd1jHvrsZgmAGc4eWN-crBU0LIoq5ejT4Ir2ZyOpvAvbFRsUU0tS0Kvqt9o-nYYIBgMx2prmDKOHKmTEDe-Fw5NcWWqomVh-uvXKSvxZ',
  gallery1: '/Users/shreyasm/.gemini/antigravity/brain/c332e9c6-e3f8-40df-b407-c38da6222b12/golden_lotus_mandala_painting_1773857695180.png',
  gallery2: '/background/texture.png',
  gallery3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBTZhEWAVVZiVid3W1_YbFYMGb1z5XYGqL8Fz_Yxgs1EwqvYp-sFe0ZHhexCW4KDt_Q0Nl3R3jx2DnefO7UXOHj-ma7vLRv3igBjuHY1DtXVog1egHajNfXNzED9KQ473nMMlj8AXT6vW4Z-HKsUSuz7yEUpVQAd2jlUlB3LjtR3EuW0hOJLGneOV0RHpC11jSeO4-2fxTz8xgG16qmD7rMxilfEslEh-qU1iccZpXi3ZMsftKwR2d9_Ftev4HYgOYCyXIOPKnftvo',
  gallery4: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtYRPALkppu78i2paVKw3Y8YeSqghnXwnVcn3xT3zCgUGI3X2caI5K2v-G7YJvK-38jBgrStkB6dXaUWKV_Ud364VwAkSVhessvQRaQyGEpVU93baz2IadAdkFGaU7c1E4vbzU2cNZGrtbJoFKg-uG0UrxOTAeLi5u6-vDlaAUihqZxvdp2pD-xeeWhPdEWwrlbVKqvTtX8y-MjJ0K6abN1sYp_qrruYUsWst3YpMv_EwQ_jpLtIB_v7oa11VFdPQs-YGbPh_WtW9j',
}


export default function Home() {
  const heroRef = useRef(null)
  const mandalaRef = useRef(null)
  const productsRef = useRef(null)
  const workshopsRef = useRef(null)

  // Parallax / Pinning refs
  const benefitsPinRef = useRef(null)
  const benefitsScrollerRef = useRef(null)
  const testimonialsPinRef = useRef(null)

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add({
      // Desktop
      isDesktop: "(min-width: 861px)",
      // Mobile
      isMobile: "(max-width: 860px)"
    }, (context) => {
      let { isDesktop, isMobile } = context.conditions;

      // Hero pinned frame & parallax
      if (heroRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: isDesktop ? '+=1500' : '+=800', // Shorter pin on mobile
            scrub: 1,
            pin: true,
          }
        })
        .to(heroRef.current.querySelector('.hero-text p'), { opacity: 0, y: -40, duration: 0.4 }, 0.1)
        .to(heroRef.current.querySelector('.hero-text h1'), { opacity: 0, scale: 0.95, duration: 0.6 }, 0.2);
      }

      // Section reveals  
      const reveals = document.querySelectorAll('.scroll-reveal');
      reveals.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );
      });

      // Speedy Slide-In Stacked Cards for Benefits
      if (benefitsPinRef.current && benefitsScrollerRef.current) {
        const cards = benefitsScrollerRef.current.children;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: benefitsPinRef.current,
            pin: true,
            scrub: 1,
            start: "center center",
            end: `+=${cards.length * (isDesktop ? 800 : 500)}`,
          }
        });

        gsap.set(cards, { position: 'absolute', top: '50%', left: '50%', xPercent: -50, yPercent: -50 });
        gsap.set(cards[0], { x: 0, opacity: 1 });

        for (let i = 1; i < cards.length; i++) {
          gsap.set(cards[i], { x: window.innerWidth * (isDesktop ? 0.5 : 0.8), opacity: 0 });
        }

        for (let i = 0; i < cards.length - 1; i++) {
          const current = cards[i];
          const next = cards[i + 1];
          const step = `step${i}`;

          tl.to(current, { x: -window.innerWidth * (isDesktop ? 0.5 : 0.8), opacity: 0, duration: 1, ease: 'power2.inOut' }, step)
            .to(next, { x: 0, opacity: 1, duration: 1, ease: 'power2.inOut' }, step)
            .to({}, { duration: 0.3 });
        }
      }

      // Testimonials (3D Zoom Scroll)
      if (testimonialsPinRef.current) {
        const notes = testimonialsPinRef.current.querySelectorAll('.testimonial-note');
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: testimonialsPinRef.current,
            start: "top top",
            end: isDesktop ? "+=3000" : "+=2000",
            scrub: 1,
            pin: true,
          }
        });

        notes.forEach((note) => {
          tl.fromTo(note,
            { opacity: 0, scale: 0.2, z: -1000 },
            { opacity: 1, scale: 1, z: 0, duration: 1, ease: "power2.out" }
          )
          .to(note, { scale: isDesktop ? 1.1 : 1.05, duration: 0.5 })
          .to(note, { opacity: 0, scale: isDesktop ? 5 : 3, z: 1000, duration: 1, ease: "power2.in" });
        });
      }

      // Staggers
      [productsRef, workshopsRef].forEach(ref => {
        if (ref.current) {
          gsap.fromTo(ref.current.querySelectorAll('.stagger-card'),
            { opacity: 0, y: 50 },
            {
              opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
              scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none none' }
            }
          );
        }
      });

      // Parallax
      document.querySelectorAll('[data-parallax-speed]').forEach((layer) => {
        const speed = parseFloat(layer.dataset.parallaxSpeed) || 0.5;
        gsap.to(layer, {
          y: () => speed * (isDesktop ? 200 : 100),
          ease: 'none',
          scrollTrigger: { trigger: layer.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 }
        });
      });
    });

    return () => mm.revert();
  }, [])


  return (
    <div className="home-page">
      {/* ===== SECTION 1: HERO ===== */}
      <section ref={heroRef} className="hero-section" id="hero">
        {/* Parallax background layers */}
        <div className="hero-bg-layer">
          <div className="hero-radial-glow" data-parallax-speed="-0.3"></div>
          <div className="hero-pattern-overlay" data-parallax-speed="-0.2"></div>
        </div>

        <div className="container hero-content">
          <div className="hero-text">
            <h1>
              You don't need another hour of scrolling. <br />
              <span className="text-gold italic">You need an hour for yourself.</span>
            </h1>
            <p>
              For the ones who give their time to everyone else, Dot Mandala art offers one
              guided hour that belongs entirely to you — no experience needed, just dots,
              patterns, and a little quiet.
            </p>
            <a href="#offer" className="btn-primary hero-cta">
              Start Your Dot Mandala Journey
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
            </a>
            <div className="hero-scroll-indicator scroll-reveal">
              <div className="mouse">
                <div className="wheel"></div>
              </div>
              <span className="scroll-text">Scroll to Explore</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: DOES THIS SOUND LIKE YOU? =====
          Goal: WHO this is for. Pure recognition, no CTA — keep it text-forward and quiet. */}
      <section className="section recognition-section" id="recognition">
        <div className="container">
          <div className="section-header scroll-reveal">
            <h2>Does this sound like you?</h2>
            <div className="divider"></div>
          </div>
          <div className="recognition-grid">
            {RECOGNITION_LINES.map((line, i) => (
              <div key={i} className="recognition-card scroll-reveal">
                <span className="recognition-quote-mark">&ldquo;</span>
                <p>{line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: DISCOVER DOT MANDALA =====
          Goal: WHAT this is, in plain language, shown as a visual process (not just described). */}
      <section className="section discover-section" id="discover">
        <div className="container">
          <div className="discover-intro scroll-reveal">
            <span className="section-tag">The Practice</span>
            <h2>Discover Dot Mandala</h2>
            <p>
              Dot Mandala art is exactly what it sounds like: you place small dots, one at a
              time, in circular patterns that grow outward from a single point. There's no
              drawing skill required — just a fine tool, a little paint, and a steady, unhurried
              rhythm. {/* TODO(Bindu): confirm exact tools/materials used in a real session (stylus type, paint brand, surface — canvas/wood/stone) so this stays accurate. */}
            </p>
            <p>
              What makes it meditative rather than "just art" is the repetition. Each dot asks
              for nothing but your attention to this one, right now — and by the time a pattern
              has taken shape, your mind has usually gone quiet too.
            </p>
          </div>

          <div className="discover-steps">
            {DISCOVER_STEPS.map((step) => (
              <div key={step.step} className="discover-step scroll-reveal">
                <div className="discover-step-visual">
                  <DotMandalaGlyph stage={step.step} />
                </div>
                <span className="discover-step-index">0{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          TODO — NEXT PASS: Sections 4–10
          Build in sequence once 1–3 are reviewed:
            4. What You'll Learn        — scannable grid of real curriculum/skill
                                           points (get list from Bindu — do not invent).
            5. Your Transformation      — Stress → Focus → Creativity → Confidence,
                                           shown as a sequenced visual journey.
            6. Meet Bindu                — reposition existing About section content
                                           (below) here; rewrite as first-person story.
                                           NOTE: existing body copy says Bengaluru,
                                           Karnataka, but site meta/OG tags say Jaipur —
                                           flag to Bindu to confirm correct location
                                           before this section is finalized.
            7. Student Transformations   — reposition existing Testimonials section
                                           (below) here; TESTIMONIALS data has real
                                           quotes but no `role` field used by the
                                           template — confirm with Bindu or remove.
            8. Choose Your Journey       — pricing tiers (₹299/₹499 entry, ₹6,000–10,000
                                           core, Advanced tier). Needs id="offer" so the
                                           hero + closing CTA anchor links resolve.
                                           Do not invent tier inclusions — confirm with Bindu.
            9. FAQ                       — accordion (new component); content from Bindu.
            10. Start Today              — closing CTA, echoes Section 1 headline,
                                           links to #offer or direct enrollment.
          Existing sections below (About, Benefits, Products, Workshops, Testimonials,
          Contact) are left functioning as-is until reorganized into the structure above.
      ===================================================================== */}

      {/* ===== LEGACY: ABOUT / ARTIST & HER ART (destined for Section 6 — Meet Bindu) ===== */}
      <section className="section about-section" id="about">
        <div className="container">
          <div className="about-grid scroll-reveal">
            <div className="about-image-wrapper">
              <div className="about-image-glow"></div>
              <img src={IMAGES.artist} alt="Artist working on mandala" className="about-image" />
              <div className="about-badge">
                <p className="badge-number">15+</p>
                <p className="badge-label">Years of Craft</p>
              </div>
            </div>
            <div className="about-content">
              <span className="section-tag">The Eesha Philosophy</span>
              <h2>Every Circle Tells <br /> a Sacred Story</h2>
              <p>
                In the vibrant city of Bengaluru, where science meets innovation, Dr. Bindu Lavanya has built a life that blends precision with passion.
                A dedicated dentist by profession, she believes that true artistry lies not only in healing smiles but also in creating beauty beyond the clinic.
                For her, art is more than expression it is therapy, mindfulness, and a journey inward. Each painting reflects a harmony of discipline and creativity,
                inspired by years of experience, patience, and a deep love for handcrafted art.
              </p>
              <ul className="about-features">
                <li>
                  <span className="material-symbols-outlined feature-icon">check_circle</span>
                  <div>
                    <h4>PRECISON & PERFECTION</h4>
                    <p>For her, art is more than expression — it is therapy, mindfulness, and a journey inward. Each painting reflects a harmony of discipline and creativity, inspired by years of experience, patience, and a deep love for handcrafted art..</p>
                  </div>
                </li>
                <li>
                  <span className="material-symbols-outlined feature-icon">check_circle</span>
                  <div>
                    <h4>Art as Therapy</h4>
                    <p>Painting becomes a calming escape, promoting mental clarity and inner peace.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LEGACY: MANDALA BENEFITS, Sticky Horizontal Scroll (candidate content for Section 5 — Your Transformation) ===== */}
      <section ref={benefitsPinRef} className="section benefits-section">
        <div className="container" style={{ maxWidth: '100%' }}>
          <div className="section-header">
            <h2>Why Mandala Art</h2>
            <div className="divider"></div>
            <p>Discover the calming, meditation, and wellness benefits of sacred geometry</p>
          </div>

          <div className="benefits-scroller-wrapper">
            <div ref={benefitsScrollerRef} className="benefits-scroller">
              <div className="benefit-card">
                <div className="benefit-icon-wrap">
                  <span className="material-symbols-outlined">brush</span>
                </div>
                <h3>Handcrafted Art</h3>
                <p>Every stroke is a tribute to centuries of Indian artistic tradition and royal legacy.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon-wrap">
                  <span className="material-symbols-outlined">self_improvement</span>
                </div>
                <h3>Meditation Benefits</h3>
                <p>Designed to bring tranquility, focus, and spiritual alignment to your sacred living spaces.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon-wrap">
                  <span className="material-symbols-outlined">fort</span>
                </div>
                <h3>Heritage Inspiration</h3>
                <p>Inspired by the intricate stone carvings and floral motifs of royal Rajasthani palaces.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon-wrap">
                  <span className="material-symbols-outlined">spa</span>
                </div>
                <h3>Emotional Healing</h3>
                <p>The repetitive patterns and geometry naturally slow down brain waves bringing immense peace.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LEGACY: TOP PRODUCTS (not part of the 10-section funnel — keep, revisit placement in next pass) ===== */}
      <section className="section products-section">
        <div className="container">
          <div className="section-header scroll-reveal">
            <h2>Featured Masterpieces</h2>
            <div className="divider"></div>
            <p>A curated collection of our most transcendent mandala artworks</p>
          </div>
          <div ref={productsRef} className="products-grid">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="product-card stagger-card card-hover">
                <div className="product-card-image">
                  <img src={product.img} alt={product.name} />
                </div>
                <div className="product-card-body">
                  <div className="product-header-row">
                    <h4>{product.name}</h4>
                    <span className="product-size">{product.size}</span>
                  </div>
                  <p className="product-description">{product.desc}</p>

                  <div className="product-card-footer">
                    <span className="product-price">{product.price}</span>
                    <a href={`mailto:eeshaartstudio@gmail.com?subject=Enquiry for ${product.name}`} className="btn-enquire">
                      Enquire
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="see-more-wrap scroll-reveal">
            <Link to="/products" className="btn-see-more">
              See More
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== LEGACY: WORKSHOPS (candidate content for Section 8 — Choose Your Journey) ===== */}
      <section className="section workshops-section">
        <div className="container">
          <div className="section-header scroll-reveal">
            <h2>Our Creative Workshops</h2>
            <div className="divider"></div>
            <p>Learn the sacred geometry traditions from master artists</p>
          </div>
          <div ref={workshopsRef} className="workshops-grid">
            {WORKSHOPS_DATA.length > 0 ? (
              WORKSHOPS_DATA.map((ws) => (
                <div key={ws.id} className="workshop-card stagger-card card-hover">
                  <div className="workshop-card-image">
                    <img src={ws.img} alt={ws.title} />
                  </div>
                  <div className="workshop-card-body">
                    <span className="workshop-date">{ws.date}</span>
                    <h4>{ws.title}</h4>
                    <p>{ws.desc}</p>
                  </div>
                </div>
              ))
            ) : (
                <div className="coming-soon-wrapper" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0' }}>
                  <h3 className="coming-soon-text" style={{ 
                    fontFamily: 'var(--font-heading)', 
                    fontSize: '2.5rem', 
                    color: 'var(--royal-gold)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase'
                  }}>Coming Soon</h3>
                  <p style={{ color: 'var(--sandstone)', marginTop: '15px' }}>Stay tuned for our upcoming workshops.</p>
                </div>
            )}
          </div>
          <div className="see-more-wrap scroll-reveal">
            <Link to="/workshops" className="btn-see-more">
              See More Workshops
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== LEGACY: TESTIMONIALS, 3D Zoom Scroll (destined for Section 7 — Student Transformations) ===== */}
      <section ref={testimonialsPinRef} className="section testimonials-section">
        <div className="container testimonials-grid">
          <div className="testimonials-left">
            <div className="section-header">
              <h2>What Our <br /> <span className="text-gold">Patrons Say</span></h2>
              <div className="divider"></div>
              <p>Keep scrolling to read their stories of peace and transformation.</p>
            </div>
          </div>

          <div className="testimonials-right">
            <div className="testimonials-3d-wrapper">
              {TESTIMONIALS.map((t, i) => (
                <div key={t.id} className="testimonial-note" style={{ '--rotation': `${i % 2 === 0 ? -2 : 2.5}deg` }}>
                  <div className="note-pin"></div>
                  <p className="note-text">"{t.text}"</p>
                  <div className="note-author">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== LEGACY: CONTACT (destined for/superseded by Section 10 — Start Today) ===== */}
      <section className="section contact-section">
        <div className="container">
          <div className="contact-inner scroll-reveal">
            <div className="contact-mandala-bg" data-parallax-speed="0.3">
              <span className="material-symbols-outlined">filter_vintage</span>
            </div>
            <h2>Let's Create Something Sacred</h2>
            <p>
              Ready to commission a unique mandala masterpiece or join one of our transformative workshops?
              We'd love to hear from you.
            </p>
            <a href="mailto:eeshaartstudio@gmail.com" className="btn-primary contact-cta">
              <span className="material-symbols-outlined">mail</span>
              Contact Us
            </a>

            <div className="contact-socials">
              <a href="https://www.instagram.com/eeshaartstudio/" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.facebook.com/people/Eeshaartstudio/61583248612462/" target="_blank" rel="noopener noreferrer" className="social-link" title="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://www.youtube.com/@eeshaartstudio" target="_blank" rel="noopener noreferrer" className="social-link" title="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
              </a>
              <a href="https://wa.me/917019266152" target="_blank" rel="noopener noreferrer" className="social-link" title="WhatsApp Business">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8Z"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
