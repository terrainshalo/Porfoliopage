import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionTag from './SectionTag'
import { fadeUp3D, inView, stagger, sectionReveal, sectionInView } from '../lib/motion'

export default function AIIntegrations() {
  const ref = useRef(null)
  // Scroll progress across the section drives the image's depth/tilt so the
  // whole integrations graphic reads as a card floating in 3D space.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [14, 0, -14])
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9])

  return (
    <motion.section
      id="ai"
      ref={ref}
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={sectionInView}
      className="scene-3d relative overflow-hidden py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionTag active="Integrations" label="Customer & ops alerts" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mx-auto mt-6 max-w-xl text-center"
        >
          <motion.h2 variants={fadeUp3D} className="text-3xl font-extrabold md:text-4xl">
            Keep Everyone in the Loop <br className="hidden md:block" /> with Built-in Integrations
          </motion.h2>
          <motion.p variants={fadeUp3D} className="mx-auto mt-4 max-w-md text-muted">
            Your ERP talks to your customers automatically. We wire in WhatsApp, email and smart
            notifications to keep clients updated and every operation moving — no manual follow-ups.
          </motion.p>
        </motion.div>

        {/* whole integrations graphic with a scroll-linked 3D tilt + gentle float */}
        <div className="mt-14 [perspective:1200px]">
          <motion.div
            style={{ rotateX, y, scale, transformStyle: 'preserve-3d' }}
            whileHover={{ rotateY: 6, transition: { type: 'spring', stiffness: 150, damping: 16 } }}
            className="mx-auto w-full max-w-3xl will-change-transform"
          >
            <motion.img
              src="/integrations.png"
              alt="Terrainshalo ERP wired to WhatsApp, email and smart notifications"
              className="w-full select-none drop-shadow-[0_30px_45px_rgba(31,58,230,0.18)]"
              draggable={false}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
            />
          </motion.div>
        </div>

        <div className="mt-14 text-center">
          <a
            href="#contact"
            className="inline-flex rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white ring-1 ring-transparent transition-all hover:-translate-y-0.5 hover:bg-white hover:text-ink hover:ring-black/10 hover:shadow-card"
          >
            Try it Now
          </a>
        </div>
      </div>
    </motion.section>
  )
}
