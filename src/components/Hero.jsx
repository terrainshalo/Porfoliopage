import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { fadeUp3D, stagger } from '../lib/motion'
import { SITE } from '../lib/site'

const STATS = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '80+', label: 'Happy Clients' },
  { value: '18+', label: 'Industries Served' },
  { value: '5+', label: 'Years Experience' },
]

export default function Hero() {
  const ref = useRef(null)
  // Scroll progress across the hero drives the parallax + depth of the visual.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Different Z/Y speeds create layered parallax (the "3D bridge" into section 2).
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -80])
  const yBadgeA = useTransform(scrollYProgress, [0, 1], [0, -140])
  const yBadgeB = useTransform(scrollYProgress, [0, 1], [0, 120])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -6])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4])

  return (
    <section id="top" ref={ref} className="scene-3d relative overflow-hidden pt-28 md:pt-32">
      {/* soft background wash matching the design */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#eef2f9] via-white to-white" />
      <div className="glow-blob pointer-events-none absolute -right-24 top-24 -z-10 h-96 w-96 rounded-full bg-brand-200/50" />

      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-8 md:grid-cols-2 md:px-8"
      >
        {/* LEFT: copy */}
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.span
            variants={fadeUp3D}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-ink/70 shadow-soft"
          >
            <span className="h-2 w-2 rounded-full bg-green-500" /> Now accepting new projects for 2026
          </motion.span>

          <motion.h1
            variants={fadeUp3D}
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl"
          >
            We Build Digital Products <br className="hidden md:block" />
            That <span className="gradient-text">Scale &amp; Grow.</span>
          </motion.h1>

          <motion.p variants={fadeUp3D} className="mt-5 max-w-md text-base text-muted">
            Terrainshalo delivers end-to-end web and mobile solutions — from UI/UX design to
            full-stack development.
          </motion.p>

          <motion.div variants={fadeUp3D} className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-card transition-transform hover:-translate-y-0.5"
            >
              Start Your Project
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

          {/* stats */}
          <motion.div
            variants={fadeUp3D}
            className="mt-10 grid max-w-lg grid-cols-2 gap-px overflow-hidden rounded-2xl bg-black/5 sm:grid-cols-4"
          >
            {STATS.map((s) => (
              <div key={s.label} className="bg-[#f3f4f8] px-4 py-4 text-center">
                <div className="text-xl font-extrabold text-ink">{s.value}</div>
                <div className="mt-1 text-[11px] leading-tight text-muted">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT: 3D parallax visual */}
        <div className="relative mx-auto h-[420px] w-full max-w-md md:h-[500px]">
          <motion.div
            style={{ y: yImage, rotate }}
            className="absolute inset-0 grid place-items-center"
          >
            <div className="relative h-80 w-80 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 md:h-96 md:w-96">
              <div className="absolute inset-6 rounded-full bg-white/10 backdrop-blur-sm" />
              {/* person placeholder — swap with real asset */}
              <div className="absolute inset-x-8 bottom-0 top-8 overflow-hidden rounded-b-full">
                <div className="h-full w-full bg-gradient-to-t from-brand-900/30 to-transparent" />
              </div>
              <div className="absolute inset-0 grid place-items-center text-7xl">🧑‍💼</div>
            </div>
          </motion.div>

          {/* floating badge: rating */}
          <motion.div
            style={{ y: yBadgeA }}
            className="animate-float absolute left-0 top-16 rounded-2xl bg-white px-4 py-3 shadow-card"
          >
            <div className="flex -space-x-2">
              {['🧑', '👩', '🧔', '👧'].map((e, i) => (
                <span key={i} className="grid h-7 w-7 place-items-center rounded-full bg-brand-100 text-sm ring-2 ring-white">
                  {e}
                </span>
              ))}
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs font-semibold">
              <Star size={12} className="fill-yellow-400 text-yellow-400" /> 4.9
              <span className="text-muted">(1k trust)</span>
            </div>
          </motion.div>

          {/* floating badge: project card */}
          <motion.div
            style={{ y: yBadgeB }}
            className="absolute -right-2 bottom-10 rounded-2xl bg-white px-4 py-3 shadow-card"
          >
            <div className="text-[11px] text-muted">Delivered on time</div>
            <div className="text-sm font-bold text-brand-600">+120% growth</div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
