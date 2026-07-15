import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'

// First-load intro: a light branded splash that holds briefly while the logo
// draws in, then lifts away to reveal the page. Scroll is locked underneath so
// the reveal always starts cleanly from the top. Same #eef2ff as the page base,
// so the hand-off is seamless.
export default function Intro({ onDone }) {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-[#eef2ff]"
      initial={{ y: 0 }}
      animate={{ y: '-100%' }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 1.0 }}
      onAnimationComplete={onDone}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Logo size={64} textClass="text-4xl" />
        </motion.div>

        {/* thin loading shimmer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative h-1 w-40 overflow-hidden rounded-full bg-brand-100"
        >
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-brand-600"
            initial={{ x: '-100%' }}
            animate={{ x: '250%' }}
            transition={{ duration: 1.0, ease: 'easeInOut', repeat: Infinity }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
