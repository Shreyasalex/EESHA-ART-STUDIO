import Image from 'next/image'
import PageHero from '../../components/PageHero'
import { TESTIMONIALS } from '../../data/testimonials'

export const metadata = {
  title: "Founder's Story | EeshaArtStudio",
  description: 'Dr. Bindu Lavanya founded EeshaArtStudio to bring the meditative discipline of Indian art traditions into modern life.',
}

const FEATURES = [
  {
    title: 'Precision & Perfection',
    desc: 'For her, art is more than expression — it is therapy, mindfulness, and a journey inward. Each painting reflects a harmony of discipline and creativity, inspired by years of experience and patience.',
  },
  {
    title: 'Art as Therapy',
    desc: 'Painting becomes a calming escape, promoting mental clarity and inner peace — for her students as much as for herself.',
  },
]

export default function FoundersStoryPage() {
  return (
    <>
      <PageHero eyebrow="Founder's Story" title="Every Circle Tells a Sacred Story" />

      <section data-nav-theme="light" className="bg-cream pb-28">
        <div className="container-studio grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src="/EESHA PRODUCT IMAGES/PRODUCT 2.jpeg"
              alt="A hand-painted mandala piece by Dr. Bindu Lavanya"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-ink/75 text-lg leading-relaxed">
              In the vibrant city of Bengaluru, where science meets innovation, Dr. Bindu Lavanya has
              built a life that blends precision with passion. A dedicated dentist by profession, she
              believes that true artistry lies not only in healing smiles but also in creating beauty
              beyond the clinic.
            </p>
            <p className="mt-5 text-ink/75 text-lg leading-relaxed">
              For her, art is more than expression — it is therapy, mindfulness, and a journey inward.
              Each painting reflects a harmony of discipline and creativity, inspired by years of
              experience, patience, and a deep love for handcrafted art.
            </p>

            <div className="mt-10 flex flex-col gap-8">
              {FEATURES.map((f) => (
                <div key={f.title} className="flex gap-4">
                  <span className="text-gold text-xl leading-none mt-1">✦</span>
                  <div>
                    <h4 className="font-sans font-bold text-sm uppercase tracking-wide mb-1.5">
                      {f.title}
                    </h4>
                    <p className="text-sm text-ink/65 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-nav-theme="light" className="bg-sandal/25 py-24 border-t hairline">
        <div className="container-studio">
          <span className="eyebrow mb-6">What Students Say</span>
          <div className="grid sm:grid-cols-2 gap-8 mt-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-cream border border-gold/30 rounded-sm p-7">
                <p className="italic text-ink/80 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <p className="mt-5 text-xs font-bold tracking-[0.12em] uppercase text-gold">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
