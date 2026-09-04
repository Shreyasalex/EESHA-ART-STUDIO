import PageHero from '../../components/PageHero'
import { CONTACT, SOCIAL_LINKS } from '../../data/site'

export const metadata = {
  title: 'Contact | EeshaArtStudio',
  description: 'Get in touch with EeshaArtStudio to commission a piece or join a workshop.',
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Create Something Sacred"
        subtitle="Ready to commission a piece or join a workshop? We'd love to hear from you."
      />
      <section data-nav-theme="light" className="bg-cream pb-32">
        <div className="container-studio grid md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-6">
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex w-fit items-center border border-ink/40 rounded-full px-7 py-3.5 text-xs font-bold tracking-[0.12em] uppercase hover:bg-ink hover:text-cream transition-colors duration-400"
            >
              {CONTACT.email}
            </a>
            <div className="text-ink/70">
              <p>{CONTACT.phone}</p>
              <p>{CONTACT.location}</p>
            </div>
            <div className="flex gap-6 mt-4">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold tracking-[0.1em] uppercase text-gold hover:text-ink transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <form action={`mailto:${CONTACT.email}`} method="get" className="flex flex-col gap-6">
            <div className="border-b hairline pb-2">
              <input
                name="subject"
                required
                placeholder="Your name"
                className="w-full bg-transparent outline-none placeholder:text-ink/40 py-2"
              />
            </div>
            <div className="border-b hairline pb-2">
              <input
                type="email"
                required
                placeholder="Your email"
                className="w-full bg-transparent outline-none placeholder:text-ink/40 py-2"
              />
            </div>
            <div className="border-b hairline pb-2">
              <textarea
                rows={4}
                placeholder="Tell us what you'd like to create"
                className="w-full bg-transparent outline-none placeholder:text-ink/40 py-2 resize-none"
              />
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex w-fit items-center border border-ink/40 rounded-full px-7 py-3.5 text-xs font-bold tracking-[0.12em] uppercase hover:bg-ink hover:text-cream transition-colors duration-400"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
