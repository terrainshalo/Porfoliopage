import { motion } from 'framer-motion'
import SectionTag from './SectionTag'
import { fadeUp3D, inView, stagger } from '../lib/motion'

// Orbiting integration nodes around the central message.
const NODES = ['🔍', '📄', '✨', '🌐', '🔗', '📊', '⚡', '🎯']

export default function AIIntegrations() {
  return (
    <section id="ai" className="scene-3d relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionTag active="Solutions" label="Integrated Solutions" />

        <div className="relative mt-14 grid place-items-center">
          {/* orbiting nodes */}
          <div className="pointer-events-none absolute inset-0 -z-0">
            {NODES.map((n, i) => {
              const angle = (i / NODES.length) * Math.PI * 2
              const r = 42 // % radius
              const x = 50 + Math.cos(angle) * r
              const y = 50 + Math.sin(angle) * r
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, type: 'spring', stiffness: 180 }}
                  className="absolute grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-lg shadow-card"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {n}
                </motion.span>
              )
            })}
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="relative z-10 max-w-xl text-center"
          >
            <motion.h2 variants={fadeUp3D} className="text-3xl font-extrabold md:text-4xl">
              Power Up Your Content <br /> with AI Integrations
            </motion.h2>
            <motion.p variants={fadeUp3D} className="mx-auto mt-4 max-w-md text-muted">
              Enhance your product with seamless AI integrations. Connect leading tools for creative
              content, grammar perfection, multilingual support, and SEO optimization — all in one
              place.
            </motion.p>
            <motion.a
              variants={fadeUp3D}
              href="#contact"
              className="mt-7 inline-flex rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Try it Now
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
