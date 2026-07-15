import { motion } from 'framer-motion'
import { Palette, Code2, Database, Smartphone, ArrowRight } from 'lucide-react'
import SectionTag from './SectionTag'
import { fadeUp3D, cardTilt, stagger, inView } from '../lib/motion'

const SERVICES = [
  {
    icon: Palette,
    title: 'UI/UX Design',
    body: 'Stunning, user-centered interfaces crafted to maximize engagement and conversions across every device.',
    featured: true,
  },
  {
    icon: Code2,
    title: 'Frontend Development',
    body: 'Pixel-perfect, performant frontends built with React, Next.js, and modern web standards.',
  },
  {
    icon: Database,
    title: 'Backend Development',
    body: 'Scalable, secure APIs and server architectures using Node.js, Python, and cloud-native solutions.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    body: 'Cross-platform iOS and Android apps with native performance and polished user experiences.',
  },
]

export default function Services() {
  return (
    <section id="services" className="scene-3d relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionTag active="Services" label="What we do" />

        <motion.h2
          variants={fadeUp3D}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mx-auto mt-5 max-w-2xl text-center text-3xl font-extrabold md:text-5xl"
        >
          End-to-End Digital Services
        </motion.h2>
        <motion.p
          variants={fadeUp3D}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mx-auto mt-4 max-w-xl text-center text-muted"
        >
          From concept to deployment, we handle every layer of your digital product with expertise
          and care.
        </motion.p>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ServiceCard({ icon: Icon, title, body, featured, index }) {
  return (
    <motion.article
      custom={index}
      variants={cardTilt}
      whileHover={{ y: -8, rotateX: 6, rotateY: -6, transformPerspective: 900 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className={`group flex flex-col rounded-3xl p-6 transition-shadow [transform-style:preserve-3d] ${
        featured
          ? 'bg-white shadow-card ring-1 ring-brand-100'
          : 'bg-[#f6f7fb] hover:bg-white hover:shadow-card'
      }`}
    >
      <span
        className={`grid h-11 w-11 place-items-center rounded-xl ${
          featured ? 'bg-brand-600 text-white' : 'bg-white text-brand-600 shadow-soft'
        }`}
      >
        <Icon size={20} />
      </span>
      <h3 className="mt-5 text-lg font-bold">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{body}</p>
      <a
        href="#contact"
        className={`mt-6 inline-flex items-center justify-between rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
          featured
            ? 'bg-brand-600 text-white'
            : 'bg-white text-ink ring-1 ring-black/5 group-hover:bg-brand-600 group-hover:text-white'
        }`}
      >
        Get Started <ArrowRight size={16} />
      </a>
    </motion.article>
  )
}
