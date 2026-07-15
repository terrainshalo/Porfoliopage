import { motion } from 'framer-motion'
import SectionTag from './SectionTag'
import { fadeUp3D, cardTilt, inView } from '../lib/motion'
import { FOUNDERS } from '../lib/site'

export default function Founders() {
  return (
    <section id="founders" className="scene-3d py-20 md:py-28">
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
              className="relative flex flex-col rounded-3xl bg-white p-6 shadow-soft ring-1 ring-black/5 [transform-style:preserve-3d]"
            >
              {f.photo ? (
                <img
                  src={f.photo}
                  alt={f.name}
                  onError={(e) => {
                    // If the photo isn't there yet, fall back to the initial avatar.
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling.style.display = 'grid'
                  }}
                  className="h-16 w-16 rounded-2xl object-cover shadow-soft"
                />
              ) : null}
              <span
                className="h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-xl font-extrabold text-white"
                style={{ display: f.photo ? 'none' : 'grid' }}
              >
                {f.initial}
              </span>
              <h3 className="mt-5 text-lg font-bold">{f.name}</h3>
              <div className="text-sm font-semibold text-brand-600">{f.role}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.bio}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
