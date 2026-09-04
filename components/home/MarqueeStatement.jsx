'use client'

import { motion } from 'framer-motion'

function SignatureSVG() {
  return (
    <svg viewBox="0 0 320 90" className="w-full max-w-[280px] text-gold" fill="none">
      <motion.path
        d="M8 60 C 18 20, 34 20, 40 48 C 44 66, 30 70, 30 55 C 30 35, 55 15, 70 40 C 82 60, 60 68, 66 50 C 72 32, 100 22, 112 45 C 118 58, 104 62, 108 48 C 114 28, 145 18, 158 42 C 166 58, 180 60, 190 44 C 198 30, 208 30, 210 46 C 212 60, 226 62, 234 46 C 240 34, 252 30, 258 40 C 263 48, 270 44, 276 34 C 282 24, 296 22, 305 32"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  )
}

export default function MarqueeStatement() {
  return (
    <section data-nav-theme="light" className="relative gradient-merge-cream py-32 md:py-44 overflow-hidden">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-[0.08]"
        style={{
          backgroundImage: "url('/background/new_mandala.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          mixBlendMode: 'multiply',
        }}
      />
      <div className="container-studio relative flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-8"
        >
          The Eesha Philosophy
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[clamp(1.8rem,4.6vw,3.6rem)] leading-[1.2] max-w-4xl"
        >
          You don&rsquo;t need to be perfect. You don&rsquo;t need to be born an artist. You{' '}
          <span className="italic text-gold">simply need the courage</span> to begin.
        </motion.p>

        <div className="mt-14 flex flex-col items-center gap-3">
          <SignatureSVG />
          <span className="text-sm text-ink/60">Dr. Bindu Lavanya, Founder</span>
        </div>
      </div>
    </section>
  )
}
