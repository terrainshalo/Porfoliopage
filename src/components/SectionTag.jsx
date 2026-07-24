import { motion } from 'framer-motion'
import { fadeUp3D, inView } from '../lib/motion'

// Figma-style eyebrow: a filled blue pill for the section name next to a soft
// light pill describing it. Centered above each section heading.
export default function SectionTag({ active, label, align = 'center' }) {
  return (
    <motion.div
      variants={fadeUp3D}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={`flex w-fit items-center gap-2 ${align === 'center' ? 'mx-auto' : ''}`}
    >
      <span className="rounded-full bg-brand-600 px-3.5 py-1 text-xs font-semibold text-white shadow-soft">
        {active}
      </span>
      {label && (
        <span className="rounded-full bg-white px-3.5 py-1 text-xs font-medium text-muted ring-1 ring-black/5">
          {label}
        </span>
      )}
    </motion.div>
  )
}
