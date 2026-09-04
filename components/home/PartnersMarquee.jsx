import { PARTNERS } from '../../data/site'

export default function PartnersMarquee() {
  const row = [...PARTNERS, ...PARTNERS]

  return (
    <section data-nav-theme="light" className="bg-cream py-20 border-y hairline">
      <div className="container-studio mb-10 text-center">
        <span className="eyebrow">Featured &amp; Trusted By</span>
      </div>
      <div className="overflow-hidden no-scrollbar">
        <div className="flex w-max animate-marquee gap-20 items-center">
          {row.map((p, i) => (
            <span
              key={i}
              className="text-2xl md:text-3xl font-serif text-ink/30 hover:text-gold transition-colors duration-500 whitespace-nowrap shrink-0"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
