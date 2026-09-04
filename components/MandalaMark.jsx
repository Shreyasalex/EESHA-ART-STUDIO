'use client'

import { motion } from 'framer-motion'

const RING_RADII = [10, 17, 24]

function round(n) {
  return Math.round(n * 1000) / 1000
}

function ringDots(radius, count) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2
    return {
      cx: round(28 + radius * Math.cos(angle)),
      cy: round(28 + radius * Math.sin(angle)),
    }
  })
}

export default function MandalaMark({ size = 32, className = '' }) {
  const rings = RING_RADII.map((r, i) => ringDots(r, 6 + i * 4))
  const dots = rings.flat()

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      className={className}
      role="img"
      aria-label="EeshaArtStudio dot mandala mark"
    >
      <motion.circle
        cx="28"
        cy="28"
        r="25"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.4 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: [0.65, 0, 0.35, 1], repeat: Infinity, repeatType: 'loop', repeatDelay: 1.2 }}
      />
      {dots.map((d, i) => (
        <motion.circle
          key={i}
          cx={d.cx}
          cy={d.cy}
          r="1.6"
          fill="currentColor"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.4 + i * 0.05,
            ease: 'backOut',
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 2.6,
          }}
          style={{ transformOrigin: `${d.cx}px ${d.cy}px` }}
        />
      ))}
      <circle cx="28" cy="28" r="3" fill="currentColor" />
    </svg>
  )
}
