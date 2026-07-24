import { motion } from 'framer-motion'
import SectionTag from './SectionTag'
import { fadeUp3D, cardTilt, inView, sectionReveal, sectionInView } from '../lib/motion'
import { FOUNDERS } from '../lib/site'

// Soft photo backdrops, cycled per card (matches the Figma pastel row).
const TINTS = ['bg-[#e7ecff]', 'bg-[#eef0f4]', 'bg-[#f7e9e3]', 'bg-[#e8f0ff]']

export default function Founders() {
  return (
    <motion.section
      id="founders"
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={sectionInView}
      className="scene-3d py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionTag active="Founders" label="Our team" />

        <motion.h2
          variants={fadeUp3D}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mx-auto mt-5 max-w-2xl text-center text-3xl font-extrabold md:text-5xl"
        >
          Meet the Founders
        </motion.h2>
        <motion.p
          variants={fadeUp3D}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mx-auto mt-4 max-w-2xl text-center text-muted"
        >
          A small, hands-on team that blends real industry experience with modern engineering — and
          uses AI tools to move fast without cutting corners.
        </motion.p>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FOUNDERS.map((f, i) => (
            <motion.article
              key={f.name}
              custom={i}
              variants={cardTilt}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -8, rotateX: 6, rotateY: -5, transformPerspective: 900 }}
              className={`group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-3xl p-4 shadow-soft ring-1 ring-black/5 [transform-style:preserve-3d] ${TINTS[i % TINTS.length]}`}
            >
              {f.photo ? (
                <img
                  src={f.photo}
                  alt={f.name}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling.style.display = 'grid'
                  }}
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              ) : null}
              {/* fallback initial block if the photo isn't present */}
              <span
                className="absolute inset-0 place-items-center bg-gradient-to-br from-brand-500 to-brand-700 text-5xl font-extrabold text-white"
                style={{ display: f.photo ? 'none' : 'grid' }}
              >
                {f.initial}
              </span>

              {/* name plate */}
              <div className="relative z-10 rounded-2xl bg-white/95 px-4 py-3 text-center shadow-soft backdrop-blur">
                <h3 className="text-base font-bold leading-tight">{f.name}</h3>
                <div className="text-xs font-semibold text-brand-600">{f.role}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
