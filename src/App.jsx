import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LogoMarquee from './components/LogoMarquee'
import Services from './components/Services'
import Industries from './components/Industries'
import AIIntegrations from './components/AIIntegrations'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

/*
 * App = single-page scroll experience.
 *
 * How the 3D scroll logic bridges the viewport sections:
 * - A global scroll-progress spring drives the top progress bar, tying the whole
 *   page into one continuous scroll timeline.
 * - Each section is its own perspective scene (.scene-3d) so child transforms
 *   (rotateX / rotateY / Z-depth) render with real depth rather than flat 2D.
 * - Sections that need scroll-linked parallax (Hero, Industries) use useScroll()
 *   with a per-section `target` + `offset`, mapping that section's own progress
 *   onto Y/rotate/scale via useTransform. Because each section owns its scroll
 *   range, animations hand off cleanly from one viewport to the next — the Hero
 *   recedes on the Z axis just as Services tilts up into view.
 * - Reveal-on-scroll uses `whileInView` with a shared variant vocabulary
 *   (fadeUp3D / cardTilt) so every section speaks the same motion language.
 * - CSS `scroll-behavior: smooth` + GPU transforms (transform/opacity only)
 *   keep everything jitter-free and performant.
 */
export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return (
    <div className="relative">
      {/* scroll progress indicator spanning all sections */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-brand-500 to-brand-700"
      />

      <Navbar />

      <main>
        <Hero />
        <LogoMarquee />
        <Services />
        <Industries />
        <AIIntegrations />
        <Testimonials />
        {/* Pricing section intentionally removed per request. */}
        {/* FAQ replaced by the Contact Us section below. */}
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
