import { motion } from 'framer-motion'
import { Boxes, Megaphone, Sparkles, Palette, Code2, Smartphone, ArrowRight } from 'lucide-react'
import SectionTag from './SectionTag'
import { fadeUp3D, cardTilt, stagger, inView } from '../lib/motion'

const SERVICES = [
  {
    icon: Boxes,
    title: 'Custom ERP Systems',
    body: 'Tailored ERP for any business, at any scale — inventory, finance, sales, HR and operations, unified in one platform.',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    body: 'Performance-driven campaigns, SEO and social growth that turn your new systems into real revenue.',
  },
  {
    icon: Sparkles,
    title: 'AI Integration',
    body: 'We build AI into your workflows and use AI tools to fast-track delivery — automation, assistants and smart insights.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    body: 'Clean, user-centered interfaces so your team and customers actually enjoy using the software.',
  },
  {
    icon: Code2,
    title: 'Web Development',
    body: 'Fast, secure, scalable web apps built on modern stacks and cloud-native architecture.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    body: 'Cross-platform iOS and Android apps that keep your business running from anywhere.',
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
          From ERP to automation and growth, we build software that removes manual work — shaped to
          fit how you actually operate, and accelerated by AI.
        </motion.p>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ServiceCard({ icon: Icon, title, body, index }) {
  // No card is "selected" by default — the elevated look only appears on hover.
  return (
    <motion.article
      custom={index}
      variants={cardTilt}
      whileHover={{ y: -8, rotateX: 6, rotateY: -6, transformPerspective: 900 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className="group flex flex-col rounded-3xl bg-[#f6f7fb] p-6 ring-1 ring-transparent transition-all duration-300 [transform-style:preserve-3d] hover:bg-white hover:shadow-card hover:ring-brand-100"
    >
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-brand-600 shadow-soft transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
        <Icon size={20} />
      </span>
      <h3 className="mt-5 text-lg font-bold">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{body}</p>
      <a
        href="#contact"
        className="mt-6 inline-flex items-center justify-between rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink ring-1 ring-black/5 transition-colors group-hover:bg-brand-600 group-hover:text-white"
      >
        Get Started <ArrowRight size={16} />
      </a>
    </motion.article>
  )
}
