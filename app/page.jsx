import Hero from '../components/home/Hero'
import MarqueeStatement from '../components/home/MarqueeStatement'
import HorizontalGallery from '../components/home/HorizontalGallery'
import ImpactSplit from '../components/home/ImpactSplit'
import CreationsGrid from '../components/home/CreationsGrid'
import CtaBlock from '../components/home/CtaBlock'
import PartnersMarquee from '../components/home/PartnersMarquee'
import SocialCallout from '../components/home/SocialCallout'

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeStatement />
      <HorizontalGallery />
      <ImpactSplit />
      <CreationsGrid />
      <CtaBlock />
      <PartnersMarquee />
      <SocialCallout />
    </>
  )
}
