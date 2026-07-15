import { motion } from 'framer-motion'
import { CLIENTS } from '../lib/site'
import { sectionReveal, sectionInView } from '../lib/motion'

// Infinite marquee of the businesses we currently build for.
export default function LogoMarquee() {
  const items = [...CLIENTS, ...CLIENTS, ...CLIENTS]
  return (
    <motion.div
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={sectionInView}
      className="border-y border-white/40 bg-white/50 py-8 backdrop-blur-sm"
    >
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wider text-muted">
        Trusted by growing businesses
      </p>
      <div className="marquee-mask mx-auto max-w-7xl overflow-hidden px-5">
        <div className="animate-marquee flex w-max items-center gap-16 whitespace-nowrap">
          {items.map((b, i) => (
            <span
              key={i}
              className="text-2xl font-bold tracking-tight text-ink/40 transition-colors hover:text-ink"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
