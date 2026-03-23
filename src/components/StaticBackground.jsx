import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './StaticBackground.css'

// Using the provided black & white mandalas
import depthImg from '../../background/depth.png'
import textureImg from '../../background/texture.png'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = [
  { id: 'hero', corner: 'left', img: depthImg },
  { id: 'about', corner: 'right', img: textureImg },
  { id: '.benefits-section', corner: 'left', img: depthImg },
  { id: '.products-section', corner: 'right', img: textureImg },
  { id: '.workshops-section', corner: 'left', img: depthImg },
  { id: '.testimonials-section', corner: 'right', img: textureImg },
  { id: '.contact-section', corner: 'left', img: depthImg }
]

export default function StaticBackground() {
  const containerRef = useRef(null)
  const leftImgRef = useRef(null)
  const rightImgRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    // Preload images
    const p1 = new Image(); p1.src = depthImg;
    const p2 = new Image(); p2.src = textureImg;

    // Scroll Animation Logic for Home Page
    if (pathname === '/') {
      SECTIONS.forEach((section) => {
        ScrollTrigger.create({
          trigger: section.id,
          start: 'top 60%',
          end: 'bottom 40%',
          onToggle: (self) => {
            if (self.isActive) {
              updateBackground(section.corner, section.img)
            }
          }
        })
      })
    } else {
      // For other pages, show a default neutral state (e.g., subtle left corner)
      updateBackground('left', textureImg)
    }

    function updateBackground(corner, imgSource) {
      const activeRef = corner === 'left' ? leftImgRef : rightImgRef
      const inactiveRef = corner === 'left' ? rightImgRef : leftImgRef

      // Fade out inactive
      gsap.to(inactiveRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'power2.inOut'
      })

      // Fade in active with new image
      if (activeRef.current) {
        activeRef.current.src = imgSource
        gsap.to(activeRef.current, {
          opacity: 0.7, // As requested: 0.6 - 0.8
          scale: 1,
          duration: 1,
          ease: 'power2.inOut'
        })
      }
    }

    return () => ScrollTrigger.getAll().forEach(t => {
      // Only kill triggers created by this component if we can identify them,
      // but usually standard kill on unmount is fine for global triggers.
    })
  }, [pathname])

  return (
    <div className="static-bg-container" ref={containerRef}>
      <img ref={leftImgRef} className="bg-mandala corner-left" alt="" />
      <img ref={rightImgRef} className="bg-mandala corner-right" alt="" />
      <div className="bg-vignette"></div>
    </div>
  )
}
