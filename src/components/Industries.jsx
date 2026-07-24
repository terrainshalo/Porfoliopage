import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import SectionTag from './SectionTag'
import { fadeUp3D, inView, sectionReveal, sectionInView } from '../lib/motion'

const INDUSTRIES = [
  'Construction & Real Estate',
  'Finance',
  'Chit Funds',
  'Hospitality & F&B',
  'Retail & Trade',
  'Manufacturing',
  'Education',
  'Healthcare',
]

export default function Industries() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Floating stat cards drift on the Z/Y plane as the panel scrolls past.
  const yA = useTransform(scrollYProgress, [0, 1], [40, -40])
  const yB = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <motion.section
      id="industries"
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={sectionInView}
      className="scene-3d py-10 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          ref={ref}
          variants={fadeUp3D}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#eef1ff] to-[#e6ecff] p-8 md:p-14"
        >
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold text-[#0b1230] md:text-5xl">One ERP, Every Industry</h2>
              <p className="mt-4 max-w-md text-muted">
                Every business runs differently. We model your real workflows — from construction and
                chit funds to hospitality and finance — into an ERP that fits, instead of forcing you
                into off-the-shelf software.
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

            {/* 3D-ish visual with parallax floating cards showing real proof */}
            <div className="relative grid min-h-[320px] place-items-center">
              {/* layered blue ellipse behind the person */}
              <div className="relative grid h-72 w-60 place-items-center md:h-80 md:w-72">
                <div className="absolute inset-x-2 inset-y-0 rounded-[50%] bg-[#c3d3ff]" />
                <div className="absolute inset-x-5 inset-y-3 rounded-[50%] bg-gradient-to-b from-[#6b8cff] to-brand-600" />
                {/* erp person photo (drop file at public/erp-person.png) */}
                <img
                  src="/erp-person.png"
                  alt="Team member using the ERP"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling.style.display = 'grid'
                  }}
                  className="relative z-10 h-[108%] w-auto max-w-none object-contain drop-shadow-2xl"
                  draggable={false}
                />
                <div className="absolute inset-0 z-10 place-items-center text-7xl" style={{ display: 'none' }}>
                  🏗️
                </div>
              </div>

              <motion.div
                style={{ y: yA }}
                className="absolute right-0 top-[58%] z-20 flex items-center gap-2.5 rounded-xl bg-white px-4 py-3 shadow-card md:-right-6"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-600">
                  <CheckCircle2 size={18} />
                </span>
                <div>
                  <div className="text-[11px] text-muted">Finished Projects</div>
                  <div className="text-lg font-extrabold text-ink">5</div>
                </div>
              </motion.div>

              <motion.div
                style={{ y: yB }}
                className="absolute -bottom-2 left-0 z-20 flex items-center gap-2.5 rounded-xl bg-white px-4 py-3 shadow-card md:-left-6"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-base">💼</span>
                <div>
                  <div className="text-[11px] text-muted">Businesses live on our ERP</div>
                  <div className="text-lg font-extrabold text-brand-600">3 and growing</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
