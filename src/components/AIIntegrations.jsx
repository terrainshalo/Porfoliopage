import { motion } from 'framer-motion'
import SectionTag from './SectionTag'
import { fadeUp3D, inView, stagger, sectionReveal, sectionInView } from '../lib/motion'

// Orbiting integration nodes around the central message.
const NODES = ['💬', '📧', '🔔', '🤖', '📱', '📊', '⚡', '✅']

export default function AIIntegrations() {
  return (
    <motion.section
      id="ai"
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={sectionInView}
      className="scene-3d relative overflow-hidden py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionTag active="Integrations" label="Customer & ops alerts" />

        <div className="relative mt-14 grid place-items-center">
          {/* continuously orbiting nodes: the whole ring rotates forever, and
              each node counter-rotates so its icon stays upright + gently pulses */}
          <motion.div
            className="pointer-events-none absolute inset-0 -z-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
          >
            {NODES.map((n, i) => {
              const angle = (i / NODES.length) * Math.PI * 2
              const r = 42 // % radius
              const x = 50 + Math.cos(angle) * r
              const y = 50 + Math.sin(angle) * r
              return (
                <div
                  key={i}
                  className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <motion.span
                    // counter-rotate to cancel the ring spin (icons stay upright)
                    animate={{ rotate: -360, y: [0, -6, 0] }}
                    transition={{
                      rotate: { duration: 40, ease: 'linear', repeat: Infinity },
                      y: { duration: 3 + (i % 4), ease: 'easeInOut', repeat: Infinity },
                    }}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white text-lg shadow-card"
                  >
                    {n}
                  </motion.span>
                </div>
              )
            })}
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="relative z-10 max-w-xl text-center"
          >
            <motion.h2 variants={fadeUp3D} className="text-3xl font-extrabold md:text-4xl">
              Keep Everyone in the Loop <br /> with Built-in Integrations
            </motion.h2>
            <motion.p variants={fadeUp3D} className="mx-auto mt-4 max-w-md text-muted">
              Your ERP talks to your customers automatically. We wire in WhatsApp, email and smart
              notifications to keep clients updated and every operation moving — no manual follow-ups.
            </motion.p>
            <motion.a
              variants={fadeUp3D}
              href="#contact"
              className="mt-7 inline-flex rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white ring-1 ring-transparent transition-all hover:-translate-y-0.5 hover:bg-white hover:text-ink hover:ring-black/10 hover:shadow-card"
            >
              Try it Now
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
