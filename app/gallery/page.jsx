import Image from 'next/image'
import PageHero from '../../components/PageHero'
import { ALL_PRODUCTS } from '../../data/products'
import { CONTACT } from '../../data/site'

export const metadata = {
  title: 'Gallery | EeshaArtStudio',
  description: 'A curated collection of handcrafted mandala and Tanjore artworks from EeshaArtStudio.',
}

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Handcrafted, One Dot at a Time"
        subtitle="A curated collection of mandala and Tanjore masterpieces — each piece built stroke by stroke, dot by dot."
      />
      <section data-nav-theme="light" className="bg-cream pb-28">
        <div className="container-studio grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
          {ALL_PRODUCTS.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-[4/5] overflow-hidden border border-gold/50 p-2">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-silk group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-xl">{product.name}</h3>
                  <span className="text-xs uppercase tracking-wide text-gold shrink-0">{product.size}</span>
                </div>
                <p className="mt-2 text-sm text-ink/65 leading-relaxed">{product.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-serif text-lg">{product.price}</span>
                  <a
                    href={`mailto:${CONTACT.email}?subject=Enquiry for ${product.name}`}
                    className="text-xs font-bold tracking-[0.1em] uppercase text-ink border-b border-gold pb-0.5 hover:text-gold transition-colors"
                  >
                    Enquire →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
