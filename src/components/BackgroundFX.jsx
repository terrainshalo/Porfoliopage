import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// Global animated backdrop behind every section.
// Perf notes: NO scroll-linked CSS filter (that re-rasterizes the whole blurred
// subtree every frame = jank). Orbs only translate (cheap on the compositor) and
// are promoted to their own GPU layers via will-change. Blur radii kept modest.
export default function BackgroundFX() {
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 50, damping: 20, mass: 0.4 })

  const yFar = useTransform(smooth, [0, 1], ['0%', '-12%'])
  const yMid = useTransform(smooth, [0, 1], ['0%', '18%'])
  const yNear = useTransform(smooth, [0, 1], ['0%', '-24%'])

  const particles = Array.from({ length: 10 })

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden [transform:translateZ(0)]">
      {/* animated mesh gradient (slow CSS pan/breathe) */}
      <div className="bg-mesh absolute inset-0" />

      {/* rotating aurora — transform-only, so its blur is cached once */}
      <motion.div
        className="bg-aurora absolute left-1/2 top-1/2 h-[130vmax] w-[130vmax] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        animate={{ rotate: 360 }}
        transition={{ duration: 70, ease: 'linear', repeat: Infinity }}
      />

      {/* drifting orbs (translate-only + parallax) */}
      <Orb y={yFar} pos="-left-40 top-[6%]" blob="h-[26rem] w-[26rem] bg-brand-300/45" dur={24}
           drift={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }} />
      <Orb y={yMid} pos="right-[-8rem] top-[30%]" blob="h-[32rem] w-[32rem] bg-[#a5b4fc]/45" dur={30}
           drift={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0] }} />
      <Orb y={yNear} pos="left-[28%] top-[62%]" blob="h-[22rem] w-[22rem] bg-[#c7d2fe]/55" dur={22}
           drift={{ x: [0, 55, -30, 0], y: [0, -35, 25, 0] }} />

      {/* floating particles (opacity/transform only) */}
      {particles.map((_, i) => {
        const left = (i * 37) % 100
        const size = 4 + (i % 4) * 3
        const dur = 12 + (i % 5) * 2
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-brand-500/25 will-change-transform"
            style={{ left: `${left}%`, top: `${(i * 53) % 100}%`, width: size, height: size }}
            animate={{ y: [0, -50, 0], opacity: [0, 0.7, 0] }}
            transition={{ duration: dur, ease: 'easeInOut', repeat: Infinity, delay: (i % 5) * 1.4 }}
          />
        )
      })}

      {/* grid + soft vignette */}
      <div className="bg-grid absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-white/55" />
    </div>
  )
}

function Orb({ y, pos, blob, drift, dur }) {
  return (
    <motion.div style={{ y }} className={`absolute will-change-transform ${pos}`}>
      <motion.div
        animate={drift}
        transition={{ duration: dur, ease: 'easeInOut', repeat: Infinity }}
        className={`glow-blob rounded-full will-change-transform ${blob}`}
      />
    </motion.div>
  )
}
