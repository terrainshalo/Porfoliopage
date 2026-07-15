import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import SectionTag from './SectionTag'
import { fadeUp3D, cardTilt, stagger, inView } from '../lib/motion'

const REVIEWS = [
  {
    name: 'James Lin',
    role: 'Startup Founder',
    rating: 5,
    quote:
      'Working with Terrainshalo was a game-changer. They delivered a pixel-perfect product ahead of schedule.',
    initial: 'JL',
  },
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    rating: 4.9,
    quote:
      'Our digital transformation was seamless. Responsive, collaborative, and saved us thousands every quarter.',
    initial: 'SJ',
    featured: true,
  },
  {
    name: 'Thomas Nguyen',
    role: 'CTO',
    rating: 4.8,
    quote:
      'The engineering is world-class. Rock solid architecture and a team we genuinely trust with our roadmap.',
    initial: 'TN',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="scene-3d bg-[#fafbff] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionTag active="Trusted" label="Proof that it works" />

        <motion.h2
          variants={fadeUp3D}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mx-auto mt-5 max-w-2xl text-center text-3xl font-extrabold md:text-5xl"
        >
          Trusted by Teams Worldwide
        </motion.h2>
        <motion.p
          variants={fadeUp3D}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mx-auto mt-4 max-w-xl text-center text-muted"
        >
          Real results from real teams — see why companies choose us to build what matters.
        </motion.p>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-14 grid grid-cols-1 items-center gap-6 md:grid-cols-3"
        >
          {REVIEWS.map((r, i) => (
            <motion.article
              key={r.name}
              custom={i}
              variants={cardTilt}
              whileHover={{ y: -6, rotateY: 4, transformPerspective: 900 }}
              className={`rounded-3xl bg-white p-7 shadow-soft [transform-style:preserve-3d] ${
                r.featured ? 'md:-translate-y-4 md:scale-105 md:shadow-card' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-100 font-bold text-brand-700">
                  {r.initial}
                </span>
                <div>
                  <div className="font-bold leading-tight">{r.name}</div>
                  <div className="text-xs text-muted">{r.role}</div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    size={15}
                    className={s < Math.round(r.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-black/15'}
                  />
                ))}
                <span className="ml-1 text-xs font-semibold text-muted">{r.rating}/5</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink/80">&ldquo;{r.quote}&rdquo;</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
