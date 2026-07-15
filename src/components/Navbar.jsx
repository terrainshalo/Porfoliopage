import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import Logo from './Logo'
import { NAV_LINKS, SITE } from '../lib/site'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 shadow-soft backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" aria-label="Terrainshalo home">
          <Logo size={34} textClass="text-2xl" />
        </a>

        <ul className="hidden items-center gap-8 text-sm font-medium text-ink/80 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-brand-600">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Get Started <ArrowRight size={16} />
          </a>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg border border-black/10 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t border-black/5 bg-white px-5 pb-6 pt-2 md:hidden"
        >
          <ul className="flex flex-col gap-1 text-sm font-medium">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 hover:bg-brand-50"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`tel:${SITE.phoneIntl}`}
                className="mt-2 block rounded-full bg-ink px-4 py-3 text-center text-white"
              >
                Call {SITE.phone}
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  )
}
