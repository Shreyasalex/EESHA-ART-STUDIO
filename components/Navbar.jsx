'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MandalaMark from './MandalaMark'
import { NAV_LINKS, CONTACT } from '../data/site'
import { CREATIONS } from '../data/creations'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const menuVariants = {
  closed: { clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] } },
  open: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState('light')
  const navRef = useRef(null)
  const pathname = usePathname()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
  }, [isMenuOpen])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('[data-nav-theme]')
      sections.forEach((section) => {
        const sectionTheme = section.getAttribute('data-nav-theme')
        ScrollTrigger.create({
          trigger: section,
          start: 'top 90px',
          end: 'bottom 90px',
          onEnter: () => setTheme(sectionTheme),
          onEnterBack: () => setTheme(sectionTheme),
        })
      })
    })
    return () => ctx.revert()
  }, [pathname])

  const isDark = theme === 'dark' && !isMenuOpen

  return (
    <>
      <nav
        ref={navRef}
        data-nav-theme={isDark ? 'dark' : 'light'}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ease-cinematic ${
          isDark ? 'text-cream' : 'text-ink'
        }`}
      >
        <div className="container-studio flex items-center justify-between h-[84px]">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <MandalaMark size={28} className="text-gold hidden sm:block" />
            <div className="flex flex-col leading-tight">
              <span className="font-sans font-bold tracking-[0.14em] text-[0.8rem] sm:text-[0.88rem]">
                EESHAARTSTUDIO
              </span>
              <span className="font-sans text-[0.58rem] tracking-[0.22em] uppercase opacity-60 mt-0.5">
                Learn · Create · Grow.
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-xs font-bold tracking-[0.1em] uppercase group py-2"
              >
                {link.label}
                <span className="absolute left-0 -bottom-0.5 h-px w-full bg-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-silk" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${CONTACT.email}?subject=Begin My Journey`}
              className={`hidden md:inline-flex items-center gap-2 border rounded-full px-5 py-2.5 text-xs font-bold tracking-[0.1em] uppercase transition-colors duration-400 ease-silk ${
                isDark
                  ? 'border-cream/50 hover:bg-cream hover:text-ink'
                  : 'border-ink/40 hover:bg-ink hover:text-cream'
              }`}
            >
              Begin Your Journey
              <span aria-hidden>→</span>
            </a>
            <button
              aria-label="Toggle Menu"
              onClick={() => setIsMenuOpen((v) => !v)}
              className="relative w-6 h-6 flex flex-col items-center justify-center gap-[5px] z-[60]"
            >
              <span
                className={`block h-px w-5 bg-current transition-transform duration-400 ease-silk ${
                  isMenuOpen ? 'translate-y-[3px] rotate-45' : ''
                }`}
                style={{ background: isMenuOpen ? 'var(--color-ink)' : 'currentColor' }}
              />
              <span
                className={`block h-px w-5 bg-current transition-transform duration-400 ease-silk ${
                  isMenuOpen ? '-translate-y-[3px] -rotate-45' : ''
                }`}
                style={{ background: isMenuOpen ? 'var(--color-ink)' : 'currentColor' }}
              />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-cream text-ink overflow-y-auto"
          >
            <div className="container-studio pt-[140px] pb-16 grid lg:grid-cols-2 gap-14">
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      className="block font-serif text-[clamp(2.2rem,6vw,4rem)] leading-[1.1] hover:text-gold transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.a
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  href={`mailto:${CONTACT.email}?subject=Begin My Journey`}
                  className="mt-8 inline-flex w-fit items-center border border-ink/40 rounded-full px-6 py-3 text-xs font-bold tracking-[0.12em] uppercase hover:bg-ink hover:text-cream transition-colors duration-400"
                >
                  Begin Your Journey
                </motion.a>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {CREATIONS.slice(0, 4).map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative aspect-[4/5] overflow-hidden rounded-sm group"
                  >
                    <Image
                      src={c.base}
                      alt={`${c.form} by ${c.student}`}
                      fill
                      className="object-cover grayscale sepia-[0.3] contrast-110 group-hover:grayscale-0 group-hover:sepia-0 group-hover:scale-105 transition-all duration-500 ease-silk"
                    />
                    <div className="absolute inset-0 bg-gold/25 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
