'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HERO_CONTENT } from '../../data/site'

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
          end: '+=60%',
          scrub: 1,
        },
      })
      tl.to(textRef.current, { opacity: 0, y: -40, ease: 'none' })
      return () => tl.scrollTrigger?.kill()
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} data-nav-theme="light" className="relative h-screen w-full overflow-hidden text-ink">
      {/* TODO: replace with the real hero photograph (hand painting a dot mandala amid brass vase, books, pigment bowls) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 20% 15%, rgba(227,201,163,0.55) 0%, transparent 55%), radial-gradient(110% 90% at 85% 75%, rgba(205,154,63,0.25) 0%, transparent 55%), var(--color-cream)',
        }}
      />

      <div ref={textRef} className="relative z-10 h-full">
        <div className="container-studio h-full flex flex-col justify-center max-w-none">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-7">
              <span className="w-8 h-px bg-ink/50" />
              <span className="text-[0.72rem] font-bold tracking-[0.22em] uppercase text-ink/70 leading-relaxed whitespace-pre-line">
                {HERO_CONTENT.eyebrow}
              </span>
            </div>

            <h1 className="font-serif text-[clamp(3rem,7vw,5.6rem)] leading-[0.98] text-ink">
              {HERO_CONTENT.headline1}
              <br />
              {HERO_CONTENT.headline2}
              <span className="text-gold">{HERO_CONTENT.headlineAccent}</span>
            </h1>

            <p className="mt-7 text-ink/75 text-[1.05rem] leading-relaxed whitespace-pre-line">
              {HERO_CONTENT.subtext}
            </p>

            <motion.a
              href="#courses"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 inline-flex items-center gap-3 border border-ink/50 rounded-full px-7 py-3.5 text-xs font-bold tracking-[0.14em] uppercase hover:bg-ink hover:text-cream hover:border-ink transition-colors duration-400 ease-silk"
            >
              {HERO_CONTENT.cta}
              <span aria-hidden>→</span>
            </motion.a>
          </div>
        </div>

        {/* bottom-left icon + value tags */}
        <div className="absolute left-6 sm:left-[calc((100vw-1320px)/2+24px)] bottom-10 flex items-center gap-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-gold shrink-0">
            <path
              d="M12 21c0-5-4-7-4-11a4 4 0 0 1 8 0c0 4-4 6-4 11Z"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path d="M12 21V13" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <ul className="text-[0.62rem] font-bold tracking-[0.16em] uppercase text-ink/70 leading-[1.7]">
            {HERO_CONTENT.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>

        {/* right-edge vertical text */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2">
          <span
            className="text-[0.62rem] font-bold tracking-[0.22em] uppercase text-ink/60 whitespace-nowrap"
            style={{ writingMode: 'vertical-rl' }}
          >
            {HERO_CONTENT.sideText}
          </span>
        </div>

        {/* bottom-center scroll indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center gap-3">
          <span className="text-[0.62rem] font-bold tracking-[0.28em] uppercase text-ink/60">Scroll</span>
          <span className="w-px h-8 bg-ink/30" />
        </div>
      </div>
    </section>
  )
}
