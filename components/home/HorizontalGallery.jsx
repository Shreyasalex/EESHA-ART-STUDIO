'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HORIZONTAL_TRACK } from '../../data/site'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const SIZE_CLASS = {
  tall: 'w-[240px] sm:w-[280px] lg:w-[320px] aspect-[3/4]',
  wide: 'w-[300px] sm:w-[420px] lg:w-[520px] aspect-[16/10]',
  square: 'w-[260px] sm:w-[320px] aspect-square',
}

export default function HorizontalGallery() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(
      { isDesktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)' },
      () => {
        const track = trackRef.current
        const distance = track.scrollWidth - window.innerWidth + 96
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${distance}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          animation: gsap.to(track, { x: () => -distance, ease: 'none' }),
        })
        return () => st.kill()
      }
    )
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      data-nav-theme="light"
      className="relative bg-cream py-20 lg:py-0 lg:h-screen lg:overflow-hidden flex flex-col justify-center"
    >
      <div className="container-studio mb-10 lg:absolute lg:top-16 lg:left-0 lg:right-0 lg:mb-0 lg:z-10">
        <span className="eyebrow">The Studio Floor</span>
      </div>
      <div
        ref={trackRef}
        className="flex flex-col gap-6 px-6 lg:flex-row lg:items-center lg:gap-8 lg:px-16 lg:w-max"
      >
        {HORIZONTAL_TRACK.map((item, i) =>
          item.type === 'image' ? (
            <div
              key={i}
              className={`relative overflow-hidden rounded-sm shrink-0 mx-auto lg:mx-0 ${SIZE_CLASS[item.size]}`}
            >
              <Image src={item.img} alt={item.alt} fill className="object-cover" />
            </div>
          ) : (
            <div
              key={i}
              className="w-full max-w-[360px] lg:w-[420px] shrink-0 mx-auto lg:mx-0 px-4"
            >
              <p className="font-serif italic text-[clamp(1.5rem,3vw,2.2rem)] leading-snug text-ink">
                {item.text}
              </p>
            </div>
          )
        )}
      </div>
    </section>
  )
}
