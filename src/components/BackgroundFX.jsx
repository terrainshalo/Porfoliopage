import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// Global animated 3D backdrop behind every section.
// Layers (back -> front):
//   1. mesh gradient  — slow CSS pan/breathe
//   2. aurora         — huge blurred conic-gradient that rotates forever (color life)
//   3. orbs           — big saturated blobs that drift + pulse + rotate on their own,
//                       AND shift with scroll for parallax depth
//   4. particles      — small dots slowly rising for texture
//   5. grid + vignette
// Everything is transform/opacity only, so it stays GPU-cheap.
export default function BackgroundFX() {
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.4 })

  const yFar = useTransform(smooth, [0, 1], ['0%', '-18%'])
  const yMid = useTransform(smooth, [0, 1], ['0%', '26%'])
  const yNear = useTransform(smooth, [0, 1], ['0%', '-38%'])
  const hue = useTransform(smooth, [0, 1], [0, 30])
  const filter = useTransform(hue, (h) => `hue-rotate(${h}deg)`)

  const particles = Array.from({ length: 16 })

  return (
    <motion.div style={{ filter }} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* 1. animated mesh gradient */}
      <div className="bg-mesh absolute inset-0" />

      {/* 2. rotating aurora */}
      <motion.div
        className="bg-aurora absolute left-1/2 top-1/2 h-[160vmax] w-[160vmax] -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
      />

      {/* 3. drifting orbs */}
      <Orb y={yFar} pos="-left-40 top-[4%]" blob="h-[28rem] w-[28rem] bg-brand-400/50" dur={22}
           drift={{ x: [0, 50, -25, 0], y: [0, -40, 25, 0], scale: [1, 1.15, 0.95, 1], rotate: [0, 20, -10, 0] }} />
      <Orb y={yMid} pos="right-[-10rem] top-[24%]" blob="h-[34rem] w-[34rem] bg-[#8b9dff]/50" dur={28}
           drift={{ x: [0, -60, 35, 0], y: [0, 45, -25, 0], scale: [1, 0.9, 1.12, 1], rotate: [0, -18, 12, 0] }} />
      <Orb y={yNear} pos="left-[24%] top-[58%]" blob="h-[24rem] w-[24rem] bg-[#a5b4fc]/60" dur={18}
           drift={{ x: [0, 70, -35, 0], y: [0, -45, 35, 0], scale: [1, 1.18, 0.92, 1], rotate: [0, 24, -12, 0] }} />
      <Orb y={yMid} pos="right-[16%] bottom-[2%]" blob="h-[22rem] w-[22rem] bg-brand-300/55" dur={25}
           drift={{ x: [0, -35, 45, 0], y: [0, 35, -30, 0], scale: [1, 1.1, 0.93, 1], rotate: [0, -16, 10, 0] }} />
      <Orb y={yFar} pos="left-[46%] top-[14%]" blob="h-[18rem] w-[18rem] bg-[#c084fc]/35" dur={31}
           drift={{ x: [0, 40, -40, 0], y: [0, 25, -20, 0], scale: [1, 1.2, 0.9, 1] }} />

      {/* 4. floating particles */}
      {particles.map((_, i) => {
        const left = (i * 37) % 100
        const size = 4 + (i % 4) * 3
        const dur = 10 + (i % 6) * 2
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-brand-500/25"
            style={{ left: `${left}%`, top: `${(i * 53) % 100}%`, width: size, height: size }}
            animate={{ y: [0, -60, 0], opacity: [0, 0.8, 0], scale: [0.6, 1, 0.6] }}
            transition={{ duration: dur, ease: 'easeInOut', repeat: Infinity, delay: (i % 5) * 1.3 }}
          />
        )
      })}

      {/* 5. grid + vignette */}
      <div className="bg-grid absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-white/55" />
    </motion.div>
  )
}

function Orb({ y, pos, blob, drift, dur }) {
  return (
    <motion.div style={{ y }} className={`absolute ${pos}`}>
      <motion.div
        animate={drift}
        transition={{ duration: dur, ease: 'easeInOut', repeat: Infinity }}
        className={`glow-blob rounded-full ${blob}`}
      />
    </motion.div>
  )
}
