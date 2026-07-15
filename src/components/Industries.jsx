import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import SectionTag from './SectionTag'
import { fadeUp3D, inView } from '../lib/motion'

const INDUSTRIES = [
  'Real Estate',
  'Education',
  'Pharmaceuticals',
  'Jewellery & Diamonds',
  'Fashion',
  'Technology',
  'Banking',
  'View more',
]

export default function Industries() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Floating stat cards drift on the Z/Y plane as the panel scrolls past.
  const yA = useTransform(scrollYProgress, [0, 1], [40, -40])
  const yB = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <section id="industries" className="scene-3d py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          ref={ref}
          variants={fadeUp3D}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#e9ecfb] to-[#eef1ff] p-8 md:p-14"
        >
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold md:text-4xl">Industries We Support</h2>
              <p className="mt-4 max-w-md text-muted">
                Deep domain expertise across 18+ verticals means we understand your business — not
                just your codebase.
              </p>

              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {INDUSTRIES.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 size={18} className="text-brand-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 3D-ish visual with parallax floating cards */}
            <div className="relative min-h-[260px]">
              <div className="absolute right-4 top-2 h-56 w-56 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 md:h-64 md:w-64">
                <div className="absolute inset-0 grid place-items-center text-7xl">👩‍💻</div>
              </div>
              <motion.div
                style={{ y: yA }}
                className="absolute right-0 top-6 rounded-xl bg-white px-4 py-3 shadow-card"
              >
                <div className="text-[11px] text-muted">Finished Projects</div>
                <div className="text-lg font-extrabold text-brand-600">143</div>
              </motion.div>
              <motion.div
                style={{ y: yB }}
                className="absolute bottom-2 left-0 rounded-xl bg-white px-4 py-3 shadow-card"
              >
                <div className="text-[11px] text-muted">Total Projects</div>
                <div className="text-lg font-extrabold">1234</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
