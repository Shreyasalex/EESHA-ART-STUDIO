import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Products from './pages/Products'
import Workshops from './pages/Workshops'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import DynamicBackground from './components/DynamicBackground'
import { ScrollEngineProvider, useScrollEngine } from './hooks/useScrollEngine.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  const lenis = useScrollEngine()

  useEffect(() => {
    // Reset scroll position immediately using Lenis
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }

    // Give the browser a moment to render the new page content 
    // and then recalculate all GSAP ScrollTrigger positions.
    const timer = setTimeout(() => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.refresh()
      })
    }, 250)

    return () => clearTimeout(timer)
  }, [pathname, lenis])
  return null
}

function App() {
  return (
    <ScrollEngineProvider>
      <ScrollToTop />
      <DynamicBackground />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/workshops" element={<Workshops />} />
        </Routes>
      </main>
      <Footer />
    </ScrollEngineProvider>
  )
}

export default App
