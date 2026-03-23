import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ScrollEngineContext = createContext(null)

export function ScrollEngineProvider({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const l = new Lenis({
      duration: 2.2, // Slower for premium cinematic feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    setLenis(l)

    // Sync Lenis with GSAP ScrollTrigger
    l.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      l.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      l.destroy()
      gsap.ticker.remove(l.raf)
    }
  }, [])

  return (
    <ScrollEngineContext.Provider value={lenis}>
      {children}
    </ScrollEngineContext.Provider>
  )
}

export function useScrollEngine() {
  return useContext(ScrollEngineContext)
}
