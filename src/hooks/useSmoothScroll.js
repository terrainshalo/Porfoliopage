import { useEffect } from 'react'
import Lenis from 'lenis'

// Premium inertia-based smooth scrolling (Lenis). This is the "smooth-scrolling
// container" that keeps the scroll-driven 3D animations jitter-free: Lenis takes
// over the wheel/touch scroll and animates scrollTop with easing, so Framer
// Motion's useScroll reads a smoothly interpolated position instead of raw,
// stuttering wheel deltas. Anchor links (#services etc.) are handled too.
export default function useSmoothScroll() {
  useEffect(() => {
    // Respect users who prefer reduced motion — skip the hijack entirely.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Smoothly scroll to in-page anchors instead of jumping.
    const onAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -80 }) // clear the fixed navbar
    }
    document.addEventListener('click', onAnchorClick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onAnchorClick)
      lenis.destroy()
    }
  }, [])
}
