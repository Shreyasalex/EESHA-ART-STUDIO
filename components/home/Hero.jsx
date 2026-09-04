'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NEXT_WORKSHOP } from '../../data/site'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Hero() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=90%',
          scrub: 1,
          pin: true,
        },
      })
      tl.to(textRef.current, { opacity: 0, y: -60, scale: 0.94, ease: 'none' })
      return () => tl.scrollTrigger?.kill()
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative h-screen w-full overflow-hidden text-cream"
    >
      <Image
        src="/EESHA PRODUCT IMAGES/PRODUCT 1.jpeg"
        alt="Hand-painted dot mandala artwork"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/55" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 15% 100%, rgba(205,154,63,0.45) 0%, transparent 55%), radial-gradient(110% 80% at 90% 0%, rgba(143,191,187,0.35) 0%, transparent 55%)',
        }}
      />

      <div
        ref={textRef}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <span className="eyebrow text-sandal mb-6">EeshaArtStudio · Bengaluru</span>
        <h1 className="font-serif text-[clamp(2.8rem,9vw,7.5rem)] leading-[0.98] max-w-5xl">
          One Dot
          <br />
          <span className="italic text-gold">at a Time</span>
        </h1>
        <p className="mt-7 max-w-xl text-[1.05rem] text-cream/80 leading-relaxed">
          Dot mandala, Tanjore painting, and brush strokes — taught by Dr. Bindu Lavanya as a
          living craft, one patient circle at a time.
        </p>

        <div className="mt-14 flex flex-col items-center gap-3 opacity-80">
          <div className="w-6 h-10 rounded-full border border-cream/60 relative">
            <span className="absolute left-1/2 top-2 -translate-x-1/2 w-[3px] h-[6px] rounded-full bg-cream animate-bounce" />
          </div>
          <span className="text-[0.65rem] tracking-[0.3em] uppercase text-cream/60">Scroll</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="absolute bottom-10 right-6 sm:right-10 z-10 w-[min(88vw,300px)] group"
      >
        <div className="bg-cream/95 text-ink rounded-md p-5 border border-gold/40">
          <span className="eyebrow mb-3">Next Workshop</span>
          <h3 className="font-serif text-xl mb-1">{NEXT_WORKSHOP.title}</h3>
          <div className="flex items-center justify-between mt-4 text-sm text-ink/70">
            <span>{NEXT_WORKSHOP.date}</span>
            <span>{NEXT_WORKSHOP.format}</span>
          </div>
          <div className="mt-4 h-px w-full bg-gold/30 relative overflow-hidden">
            <span className="absolute inset-y-0 left-0 w-0 group-hover:w-full bg-gold transition-all duration-700 ease-silk" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
