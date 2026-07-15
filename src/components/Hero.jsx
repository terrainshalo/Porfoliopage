import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeUp3D, stagger } from '../lib/motion'
import { LogoMark } from './Logo'
import { SITE } from '../lib/site'

const STATS = [
  { value: '3', label: 'Businesses Onboarded' },
  { value: 'Any', label: 'Industry or Scale' },
  { value: 'AI', label: 'Accelerated Delivery' },
  { value: 'Automate', label: 'Any Manual Task' },
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
      {/* global animated background (BackgroundFX) shows through here */}

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
            <span className="h-2 w-2 rounded-full bg-green-500" /> A new studio automating businesses with custom software
          </motion.span>

          <motion.h1
            variants={fadeUp3D}
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl"
          >
            Software That Automates <br className="hidden md:block" />
            Your <span className="gradient-text">Manual Work.</span>
          </motion.h1>

          <motion.p variants={fadeUp3D} className="mt-5 max-w-md text-base text-muted">
            We don't just build ERPs — Terrainshalo automates slow, repetitive work with custom
            software for any business, at any scale. Powered by AI to ship faster, plus digital
            marketing to help you grow.
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
            {/* branded blue hero visual: gradient orb + glass rings + logo mark */}
            <div className="relative h-80 w-80 rounded-full bg-gradient-to-br from-[#4F7CFF] via-brand-600 to-[#2E2D77] shadow-2xl md:h-96 md:w-96">
              <div className="absolute inset-6 rounded-full border border-white/20" />
              <div className="absolute inset-12 rounded-full border border-white/10" />
              <div className="absolute inset-8 rounded-full bg-white/5 backdrop-blur-sm" />
              {/* highlight sheen */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/25" />
              {/* brand mark on a white glass disc, floating at center */}
              <div className="absolute inset-0 grid place-items-center">
                <div className="animate-float grid h-40 w-40 place-items-center rounded-full bg-white/90 shadow-xl backdrop-blur md:h-48 md:w-48">
                  <LogoMark size={110} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* floating badge: automation callout */}
          <motion.div
            style={{ y: yBadgeA }}
            className="animate-float absolute left-0 top-16 rounded-2xl bg-white/90 px-4 py-3 shadow-card backdrop-blur"
          >
            <div className="text-[11px] text-muted">Manual work</div>
            <div className="text-sm font-bold text-brand-600">Automated ⚡</div>
          </motion.div>

          {/* floating badge: project card */}
          <motion.div
            style={{ y: yBadgeB }}
            className="absolute -right-2 bottom-10 rounded-2xl bg-white/90 px-4 py-3 shadow-card backdrop-blur"
          >
            <div className="text-[11px] text-muted">Built to fit you</div>
            <div className="text-sm font-bold text-brand-600">100% custom</div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
