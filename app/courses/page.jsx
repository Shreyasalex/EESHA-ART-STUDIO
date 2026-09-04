import Image from 'next/image'
import PageHero from '../../components/PageHero'
import { COURSE_LADDER } from '../../data/courses'
import { ALL_WORKSHOPS } from '../../data/workshops'
import { CONTACT } from '../../data/site'

export const metadata = {
  title: 'Courses | EeshaArtStudio',
  description: 'Structured courses in Dot Mandala, Tanjore Painting, Brush Strokes and more, taught by Dr. Bindu Lavanya.',
}

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Courses"
        title="A Ladder, Not a Leap"
        subtitle="Each course builds on the last — from your first steady dot to a finished, gallery-ready piece."
      />

      <section data-nav-theme="light" className="bg-cream pb-28">
        <div className="container-studio flex flex-col gap-16">
          {COURSE_LADDER.map((course, i) => (
            <div
              key={course.slug}
              className={`grid lg:grid-cols-2 gap-10 items-center ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image src={course.img} alt={course.title} fill className="object-cover" />
              </div>
              <div>
                <span className="eyebrow mb-5">{course.tagline}</span>
                <h2 className="font-serif text-3xl md:text-4xl mb-4">{course.title}</h2>
                <p className="text-ink/70 leading-relaxed max-w-md">{course.desc}</p>
                <a
                  href={`mailto:${CONTACT.email}?subject=Enroll in ${course.title}`}
                  className="mt-6 inline-flex items-center border border-ink/40 rounded-full px-6 py-3 text-xs font-bold tracking-[0.12em] uppercase hover:bg-ink hover:text-cream transition-colors duration-400"
                >
                  Enroll in {course.title}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section data-nav-theme="light" className="bg-sandal/30 py-24 border-t hairline">
        <div className="container-studio">
          <span className="eyebrow mb-5">Upcoming Workshops</span>
          {ALL_WORKSHOPS.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {ALL_WORKSHOPS.map((ws) => (
                <div key={ws.id} className="bg-cream border border-gold/30 p-6 rounded-sm">
                  <span className="text-xs uppercase tracking-wide text-gold">{ws.date}</span>
                  <h3 className="font-serif text-xl mt-2 mb-2">{ws.title}</h3>
                  <p className="text-sm text-ink/65">{ws.desc}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 font-serif text-2xl text-ink/50 italic">
              New workshop dates are being finalized — check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
