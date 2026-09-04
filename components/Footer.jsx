'use client'

import Link from 'next/link'
import MandalaMark from './MandalaMark'
import { NAV_LINKS, SOCIAL_LINKS, CONTACT, PARTNERS } from '../data/site'

export default function Footer() {
  return (
    <footer data-nav-theme="light" className="relative gradient-merge-cream text-ink pt-2">
      <svg
        aria-hidden
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block w-full h-[50px] sm:h-[80px] -mb-px text-cream"
        style={{ transform: 'translateY(-1px)' }}
      >
        <path
          d="M0,80 C 240,10 480,10 720,45 C 960,80 1200,20 1440,10 L1440,0 L0,0 Z"
          fill="currentColor"
        />
      </svg>
      <div className="container-studio pt-16 pb-20">
        <div className="grid md:grid-cols-[1.3fr_1fr_1fr_1.2fr] gap-12 pb-16 border-b hairline">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <MandalaMark size={30} className="text-gold" />
              <span className="font-sans font-bold tracking-[0.18em] text-[0.85rem]">
                EESHAARTSTUDIO
              </span>
            </Link>
            <p className="text-sm text-ink/65 max-w-xs leading-relaxed">
              A creative learning studio founded by Dr. Bindu Lavanya — dot mandala, Tanjore
              painting, brush strokes, and the quiet discipline of beginning again.
            </p>
          </div>

          <div>
            <h4 className="eyebrow mb-5">Pages</h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-gold transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-5">Follow On</h4>
            <ul className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-gold transition-colors duration-300"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-sm text-ink/65 mt-5">{CONTACT.email}</p>
            <p className="text-sm text-ink/65">{CONTACT.location}</p>
          </div>

          <div>
            <h4 className="eyebrow mb-5">Newsletter</h4>
            <p className="text-sm text-ink/65 mb-4">
              Slow letters on new workshops and studio openings. No noise.
            </p>
            <form
              className="flex items-center border-b hairline pb-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Your email"
                className="bg-transparent flex-1 text-sm outline-none placeholder:text-ink/40"
              />
              <button
                type="submit"
                className="text-xs font-bold tracking-[0.1em] uppercase text-gold shrink-0"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="py-16 border-b hairline">
          <h3 className="font-serif text-[clamp(2rem,6vw,4.2rem)] leading-[1.05] max-w-3xl">
            Always creating,
            <br />
            always growing.
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-ink/50 tracking-wide">
            © {new Date().getFullYear()} Eesha Art Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-ink/50 hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-ink/50 hover:text-gold transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

        <div className="mt-14 overflow-hidden no-scrollbar">
          <div className="flex w-max animate-marquee gap-16">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span
                key={i}
                className="text-lg font-serif italic text-ink/35 whitespace-nowrap shrink-0"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
