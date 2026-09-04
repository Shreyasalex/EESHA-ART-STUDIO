import { Playfair_Display, Manrope } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from '../components/SmoothScrollProvider'
import RouteEffects from '../components/RouteEffects'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const serif = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['500', '600', '700', '900'],
  style: ['normal', 'italic'],
})

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata = {
  metadataBase: new URL('https://www.eeshaartstudio.com'),
  title: 'EeshaArtStudio | One Dot at a Time',
  description:
    'EeshaArtStudio is a creative learning brand founded by Dr. Bindu Lavanya, teaching Dot Mandala, Tanjore Painting, Brush Strokes and more.',
  openGraph: {
    type: 'website',
    url: 'https://www.eeshaartstudio.com/',
    title: 'EeshaArtStudio | One Dot at a Time',
    description:
      'A creative learning brand founded by Dr. Bindu Lavanya, teaching Dot Mandala, Tanjore Painting, Brush Strokes and more.',
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: '/logo.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans">
        <SmoothScrollProvider>
          <RouteEffects />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
