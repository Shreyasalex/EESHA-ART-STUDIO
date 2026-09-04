'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CONTACT } from '../../data/site'
import { COURSE_LADDER } from '../../data/courses'

function FloatCard({ img, className, speed, rotate }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${40 * speed}%`, `${-40 * speed}%`])

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate }}
      className={`absolute overflow-hidden rounded-sm border border-cream/30 shadow-2xl ${className}`}
    >
      <Image src={img} alt="" width={340} height={420} className="object-cover w-full h-full" />
    </motion.div>
  )
}

export default function CtaBlock() {
  return (
    <section data-nav-theme="dark" className="relative gradient-merge-gold py-32 md:py-44 overflow-hidden">
      <div className="hidden lg:block">
        <FloatCard
          img={COURSE_LADDER[0].img}
          className="w-[220px] h-[280px] left-[6%] top-[14%]"
          speed={0.6}
          rotate={-6}
        />
        <FloatCard
          img={COURSE_LADDER[1].img}
          className="w-[180px] h-[230px] left-[16%] top-[54%]"
          speed={1.1}
          rotate={4}
        />
        <FloatCard
          img={COURSE_LADDER[2].img}
          className="w-[200px] h-[260px] right-[8%] top-[10%]"
          speed={0.9}
          rotate={5}
        />
        <FloatCard
          img={COURSE_LADDER[3].img}
          className="w-[170px] h-[220px] right-[18%] top-[58%]"
          speed={0.5}
          rotate={-4}
        />
      </div>

      <div className="container-studio relative z-10 flex flex-col items-center text-center">
        <span className="eyebrow text-ink/70 mb-6">Enrollment Open</span>
        <h2 className="font-serif text-[clamp(2.4rem,6vw,5.2rem)] leading-[1.05] text-ink max-w-3xl">
          Come. Learn. Create. Grow.
        </h2>
        <p className="mt-6 max-w-md text-ink/75 text-[1.05rem] leading-relaxed">
          Join a living studio of dot mandala, Tanjore painting, and brush stroke courses —
          taught by hand, at your own pace.
        </p>
        <a
          href={`mailto:${CONTACT.email}?subject=Enroll Me in a Course`}
          className="mt-10 inline-flex items-center border border-ink/50 rounded-full px-8 py-3.5 text-xs font-bold tracking-[0.15em] uppercase text-ink hover:bg-ink hover:text-cream hover:border-ink transition-colors duration-500 ease-silk"
        >
          Enroll Now
        </a>
      </div>
    </section>
  )
}
