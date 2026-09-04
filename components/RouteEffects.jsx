'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useScrollEngine } from './SmoothScrollProvider'

export default function RouteEffects() {
  const pathname = usePathname()
  const lenis = useScrollEngine()

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
    const timer = setTimeout(() => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => ScrollTrigger.refresh())
    }, 200)
    return () => clearTimeout(timer)
  }, [pathname, lenis])

  return null
}
