export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section data-nav-theme="light" className="gradient-merge-cream pt-[180px] pb-20">
      <div className="container-studio max-w-3xl">
        <span className="eyebrow mb-6">{eyebrow}</span>
        <h1 className="font-serif text-[clamp(2.4rem,6vw,4.4rem)] leading-tight">{title}</h1>
        {subtitle && <p className="mt-6 text-ink/70 text-lg leading-relaxed max-w-xl">{subtitle}</p>}
      </div>
    </section>
  )
}
