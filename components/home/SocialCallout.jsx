'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { SOCIAL_POSTS, SOCIAL_LINKS } from '../../data/site'

function SocialCard({ post }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative shrink-0 w-[240px] sm:w-[280px] aspect-[3/4] overflow-hidden rounded-sm snap-start"
    >
      <Image
        src={post.img}
        alt={post.caption}
        fill
        className="object-cover transition-transform duration-700 ease-silk"
        style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
      />
      <div className="absolute inset-0 bg-ink/25" />
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="w-14 h-14 rounded-full bg-cream/90 flex items-center justify-center text-ink text-xl">
          ▶
        </span>
      </motion.div>
      <span className="absolute bottom-4 left-4 right-4 text-cream text-sm font-medium">
        {post.caption}
      </span>
    </motion.a>
  )
}

export default function SocialCallout() {
  return (
    <section data-nav-theme="light" className="bg-cream py-28 md:py-36">
      <div className="container-studio mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <span className="eyebrow mb-5">Studio Life</span>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,3.6rem)] leading-tight">
            What&rsquo;s Blooming on Socials
          </h2>
        </div>
        <div className="flex gap-6">
          {SOCIAL_LINKS.slice(0, 2).map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold tracking-[0.1em] uppercase text-gold hover:text-ink transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 px-6 -mx-6 no-scrollbar">
        {SOCIAL_POSTS.map((post) => (
          <SocialCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
