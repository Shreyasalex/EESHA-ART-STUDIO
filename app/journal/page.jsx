import PageHero from '../../components/PageHero'

export const metadata = {
  title: 'Journal | EeshaArtStudio',
  description: 'Notes on craft, colour, and the meditative practice of Indian art traditions from EeshaArtStudio.',
}

export default function JournalPage() {
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Notes From the Studio"
        subtitle="Reflections on colour, patience, and the practice of beginning again. First entries arriving soon."
      />
      <section data-nav-theme="light" className="bg-cream pb-40 pt-8">
        <div className="container-studio">
          <div className="border-t hairline pt-16 text-center">
            <span className="font-serif italic text-3xl text-ink/40">Coming soon</span>
          </div>
        </div>
      </section>
    </>
  )
}
