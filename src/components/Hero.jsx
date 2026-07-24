import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeUp3D } from '../lib/motion'
import { LogoMark } from './Logo'
import { SITE } from '../lib/site'

const STATS = [
  { value: '3', label: 'Businesses Onboarded' },
  { value: 'Any', label: 'Industry or Scale' },
  { value: 'AI', label: 'Accelerated Delivery' },
  { value: 'Automate', label: 'Any Manual Task' },
]

// Hero content waits for the intro curtain (~1s) then flows in with a stagger,
// so first paint hands off seamlessly from the splash to the page.
const HERO_DELAY = 1.05
const heroStagger = {
  hidden: {},
  show: { transition: { delayChildren: HERO_DELAY, staggerChildren: 0.12 } },
}

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
        <motion.div variants={heroStagger} initial="hidden" animate="show">
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
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-brand-700 hover:shadow-[0_16px_40px_-10px_rgba(47,75,255,0.5)]"
            >
              {/* light sweep on hover */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span className="relative">Start Your Project</span>
              <ArrowRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>

          {/* stats */}
          <motion.div
            variants={fadeUp3D}
            className="mt-10 grid max-w-lg grid-cols-2 divide-x divide-black/5 overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-black/5 sm:grid-cols-4"
          >
            {STATS.map((s) => (
              <div key={s.label} className="px-2.5 py-4 text-center">
                <div className="text-lg font-extrabold tracking-tight text-brand-600">{s.value}</div>
                <div className="mt-1 text-[11px] font-medium leading-tight text-ink/70">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT: 3D parallax visual (fades in with the hero copy) */}
        <motion.div
          className="relative mx-auto h-[420px] w-full max-w-md md:h-[500px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: HERO_DELAY + 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            style={{ y: yImage, rotate }}
            className="absolute inset-0 grid place-items-center"
          >
            {/* layered blue circles behind the person */}
            <div className="relative grid h-80 w-80 place-items-center rounded-full bg-[#dfeaff] md:h-[26rem] md:w-[26rem]">
              <div className="absolute inset-5 rounded-full bg-[#b8ccff]" />
              <div className="absolute inset-10 rounded-full bg-gradient-to-b from-[#6b8cff] to-brand-600" />

              {/* hero person photo (drop file at public/hero-person.png) */}
              <img
                src="/hero-person.png"
                alt="Terrainshalo team member"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextElementSibling.style.display = 'grid'
                }}
                className="relative z-10 h-[112%] w-auto max-w-none translate-y-[-4%] object-contain drop-shadow-2xl"
                draggable={false}
              />
              {/* fallback: brand mark on a glass disc if the photo isn't added yet */}
              <div
                className="animate-float absolute inset-0 z-10 place-items-center"
                style={{ display: 'none' }}
              >
                <div className="grid h-40 w-40 place-items-center rounded-full bg-white/90 shadow-xl backdrop-blur md:h-48 md:w-48">
                  <LogoMark size={110} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* floating badge: automation callout */}
          <motion.div
            style={{ y: yBadgeA }}
            className="animate-float absolute left-0 top-16 z-20 flex items-center gap-2.5 whitespace-nowrap rounded-2xl bg-white px-4 py-3 shadow-card"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-base">🤖</span>
            <div>
              <div className="text-[11px] leading-tight text-muted">Manual work</div>
              <div className="text-sm font-bold leading-tight text-brand-600">Automated</div>
            </div>
          </motion.div>

          {/* floating badge: 100% custom */}
          <motion.div
            style={{ y: yBadgeB }}
            className="absolute -right-2 bottom-10 z-20 rounded-2xl bg-white px-4 py-3 shadow-card"
          >
            <div className="text-[11px] text-muted">Built to fit you</div>
            <div className="text-sm font-bold text-brand-600">100% custom</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
