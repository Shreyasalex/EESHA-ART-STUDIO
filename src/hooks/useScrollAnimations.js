import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useScrollEngine } from './useScrollEngine.jsx'

gsap.registerPlugin(ScrollTrigger)

/**
 * Hook for section reveal animations.
 * Elements with class .scroll-reveal will animate in on scroll.
 */
export function useSectionReveals() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.scroll-reveal')
    
    reveals.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      )
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])
}

/**
 * Hero parallax zoom effect.
 * The mandala scales down and moves up as user scrolls.
 */
export function useHeroParallax(heroRef, mandalaRef) {
  useEffect(() => {
    if (!heroRef?.current || !mandalaRef?.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: false,
      }
    })

    tl.to(mandalaRef.current, {
      scale: 0.7,
      y: -120,
      opacity: 0.85,
      ease: 'none',
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [heroRef, mandalaRef])
}

/**
 * Card stagger animation.
 * Cards fade in and slide up in sequence.
 */
export function useCardStagger(containerRef) {
  useEffect(() => {
    if (!containerRef?.current) return

    const cards = containerRef.current.querySelectorAll('.stagger-card')
    
    gsap.fromTo(cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        }
      }
    )

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [containerRef])
}

/**
 * Navbar scroll behavior.
 * Hidden initially, fades in after scrolling past hero.
 */
export function useNavbarScroll(navRef, threshold = 600) {
  const lenis = useScrollEngine()

  useEffect(() => {
    if (!navRef?.current) return

    // Initial positioning based on threshold
    const initialY = threshold > 0 ? -100 : 0
    const initialOpacity = threshold > 0 ? 0 : 1
    gsap.set(navRef.current, { y: initialY, opacity: initialOpacity })

    if (threshold === 0) return

    let lastScroll = 0
    const handleScroll = (e) => {
      // Lenis provides e.scroll, window scroll uses window.scrollY
      const currentScroll = e?.scroll !== undefined ? e.scroll : window.scrollY

      if (currentScroll > threshold) {
        gsap.to(navRef.current, { 
          y: 0, 
          opacity: 1, 
          duration: 0.4, 
          ease: 'power2.out',
          overwrite: 'auto'
        })
      } else {
        gsap.to(navRef.current, { 
          y: -100, 
          opacity: 0, 
          duration: 0.4, 
          ease: 'power2.out',
          overwrite: 'auto'
        })
      }
      lastScroll = currentScroll
    }

    if (lenis) {
      lenis.on('scroll', handleScroll)
    } else {
      window.addEventListener('scroll', handleScroll)
    }

    // Secondary safety: check position after DOM settles
    const safetyTimer = setTimeout(() => {
      handleScroll({ scroll: lenis ? lenis.scroll : window.scrollY })
    }, 500)

    return () => {
      if (lenis) {
        lenis.off('scroll', handleScroll)
      } else {
        window.removeEventListener('scroll', handleScroll)
      }
      clearTimeout(safetyTimer)
    }
  }, [navRef, threshold, lenis]) // Re-run if lenis becomes available
}

/**
 * Testimonial floating entry effect.
 */
export function useTestimonialFloat(containerRef) {
  useEffect(() => {
    if (!containerRef?.current) return

    const notes = containerRef.current.querySelectorAll('.testimonial-note')

    gsap.fromTo(notes,
      { opacity: 0, y: 60, rotation: -5 },
      {
        opacity: 1,
        y: 0,
        rotation: (i) => (i % 2 === 0 ? -2 : 2),
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        }
      }
    )

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [containerRef])
}

/**
 * Parallax background layers.
 */
export function useParallaxLayers() {
  useEffect(() => {
    const layers = document.querySelectorAll('[data-parallax-speed]')
    
    layers.forEach((layer) => {
      const speed = parseFloat(layer.dataset.parallaxSpeed) || 0.5
      
      gsap.to(layer, {
        y: () => speed * 200,
        ease: 'none',
        scrollTrigger: {
          trigger: layer.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      })
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])
}
