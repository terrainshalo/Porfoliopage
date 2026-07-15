import { motion } from 'framer-motion'
import { fadeUp3D, inView } from '../lib/motion'

// The little pill label above each section heading in the design.
export default function SectionTag({ active, label }) {
  return (
    <motion.div
      variants={fadeUp3D}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="mx-auto flex w-fit items-center gap-1 rounded-full bg-brand-50 p-1 pr-3 text-xs font-semibold"
    >
      <span className="rounded-full bg-brand-600 px-3 py-1 text-white">{active}</span>
      <span className="px-1 text-muted">{label}</span>
    </motion.div>
  )
}
