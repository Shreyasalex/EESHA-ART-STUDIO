'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const ScrollEngineContext = createContext(null)

export function SmoothScrollProvider({ children }) {
  const [lenis, setLenis] = useState(null)
  const rafId = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return undefined

    const l = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    setLenis(l)
    l.on('scroll', ScrollTrigger.update)

    const raf = (time) => {
      l.raf(time)
      rafId.current = requestAnimationFrame(raf)
    }
    rafId.current = requestAnimationFrame(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      l.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <ScrollEngineContext.Provider value={lenis}>{children}</ScrollEngineContext.Provider>
  )
}

export function useScrollEngine() {
  return useContext(ScrollEngineContext)
}
