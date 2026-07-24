import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import SectionTag from './SectionTag'
import { fadeUp3D, cardTilt, stagger, inView, sectionReveal, sectionInView } from '../lib/motion'

const REVIEWS = [
  {
    name: 'Harini Builders',
    role: 'Construction & Real Estate',
    rating: 5,
    quote:
      'The ERP maps to exactly how we run projects and sites. Everything from materials to billing finally lives in one place.',
    initial: 'HB',
    logo: '/clients/harini.jpg', // drop the logo at public/clients/harini.jpg
  },
  {
    name: 'KJR Chit Funds',
    role: 'Finance & Chit Funds',
    rating: 5,
    quote:
      'They understood chit fund operations deeply and built a system around them. Members, collections and payouts are effortless now.',
    initial: 'KJR',
    logo: '/clients/kjr.jpg', // drop the logo at public/clients/kjr.jpg
    featured: true,
  },
  {
    name: 'Cowboy Bar',
    role: 'Hospitality & F&B',
    rating: 5,
    quote:
      'From inventory to daily sales, the whole bar runs on it. Fast to set up and genuinely built for how we operate.',
    initial: 'CB',
  },
]

export default function Testimonials() {
  return (
    <motion.section
      id="testimonials"
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={sectionInView}
      className="scene-3d py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionTag active="Clients" label="Who we build for" />

        <motion.h2
          variants={fadeUp3D}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mx-auto mt-5 max-w-2xl text-center text-3xl font-extrabold md:text-5xl"
        >
          Trusted by Real Businesses
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
                {r.logo ? (
                  <img
                    src={r.logo}
                    alt={r.name}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.nextElementSibling.style.display = 'grid'
                    }}
                    className="h-11 w-11 rounded-full object-cover ring-1 ring-black/5"
                  />
                ) : null}
                <span
                  className="h-11 w-11 place-items-center rounded-full bg-brand-100 font-bold text-brand-700"
                  style={{ display: r.logo ? 'none' : 'grid' }}
                >
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

        {/* pagination dots (decorative, matches Figma) */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {REVIEWS.map((r, i) => (
            <span
              key={r.name}
              className={`h-2 rounded-full transition-all ${
                i === 1 ? 'w-6 bg-brand-600' : 'w-2 bg-brand-200'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
