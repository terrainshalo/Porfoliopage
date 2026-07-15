// Shared Framer Motion variants + easing used across sections.
// Keeping them in one place makes the "3D language" of the whole page consistent.

export const EASE = [0.22, 1, 0.36, 1] // smooth "expo-out" feel

// Entrance that reads as coming toward the viewer along the Z axis.
export const fadeUp3D = {
  hidden: { opacity: 0, y: 60, rotateX: -12, transformPerspective: 1000 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: EASE, delay: i * 0.08 },
  }),
}

// Cards tilt up from the "table" as they enter.
export const cardTilt = {
  hidden: { opacity: 0, y: 40, rotateX: 18, scale: 0.96, transformPerspective: 900 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.09 },
  }),
}

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

// Standard viewport config: animate once, trigger a bit before fully in view.
export const inView = { once: true, amount: 0.25, margin: '0px 0px -80px 0px' }
