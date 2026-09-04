'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

function Half({ word, subtext, href, cta, img, tint }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <Link
      href={href}
      ref={ref}
      className="group relative flex-1 h-[70vh] lg:h-screen overflow-hidden flex items-end lg:items-center justify-center"
    >
      <motion.div style={{ y }} className="absolute inset-0 -m-8">
        <Image src={img} alt="" fill className="object-cover" />
      </motion.div>
      <div className={`absolute inset-0 ${tint} transition-opacity duration-500 group-hover:opacity-90`} />

      <div className="relative z-10 text-center px-6 pb-16 lg:pb-0">
        <h2 className="font-serif text-[clamp(3.2rem,11vw,8rem)] leading-none text-cream tracking-tight">
          {word}
        </h2>
        <p className="mt-4 text-cream/80 max-w-xs mx-auto text-sm leading-relaxed">{subtext}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-gold">
          {cta}
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  )
}

export default function ImpactSplit() {
  return (
    <section data-nav-theme="dark" className="flex flex-col lg:flex-row">
      <Half
        word="LEARN."
        subtext="Structured courses from first dot to finished Tanjore piece — taught live, at your pace."
        href="/courses"
        cta="Explore Courses"
        img="/EESHA PRODUCT IMAGES/PRODUCT 2.jpeg"
        tint="bg-ink/60"
      />
      <Half
        word="CREATE."
        subtext="A growing gallery of student work and studio pieces — proof that every hand can learn this."
        href="/gallery"
        cta="View Gallery"
        img="/EESHA PRODUCT IMAGES/PRODUCT 3.jpeg"
        tint="bg-ink/50"
      />
    </section>
  )
}
