import { motion } from 'framer-motion'
import { fadeUp3D, inView } from '../lib/motion'

// A static "eyebrow" label above each section heading.
// Deliberately styled as plain text (no pill/border/background) so it does NOT
// read as a clickable button or tab.
export default function SectionTag({ active, label }) {
  return (
    <motion.div
      variants={fadeUp3D}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="mx-auto flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
      <span className="text-brand-600">{active}</span>
      {label && <span className="font-medium text-muted">· {label}</span>}
    </motion.div>
  )
}
