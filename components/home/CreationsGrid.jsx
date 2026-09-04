'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CREATIONS } from '../../data/creations'

function CreationCard({ item, index }) {
  const [tapped, setTapped] = useState(false)

  return (
    <motion.button
      type="button"
      onClick={() => setTapped((v) => !v)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative text-left w-full"
    >
      <div className="relative aspect-[4/5] overflow-hidden border border-gold/50 p-2">
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={item.base}
            alt={`${item.form} by ${item.student}`}
            fill
            className="object-cover transition-transform duration-700 ease-silk group-hover:scale-105"
          />
          <motion.div
            animate={{ opacity: tapped ? 1 : 0 }}
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-silk"
          >
            <Image src={item.reveal} alt={`${item.form} process by ${item.student}`} fill className="object-cover" />
          </motion.div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-serif text-lg">{item.student}</span>
        <span className="text-xs tracking-[0.1em] uppercase text-gold">{item.form}</span>
      </div>
    </motion.button>
  )
}

export default function CreationsGrid() {
  return (
    <section data-nav-theme="light" className="bg-cream py-28 md:py-36">
      <div className="container-studio">
        <div className="max-w-2xl mb-16">
          <span className="eyebrow mb-5">The Collection</span>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] leading-tight">
            Creations — A Growing Collection
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
          {CREATIONS.map((item, i) => (
            <CreationCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
