import { Facebook, Phone, MessageCircle, Mail } from 'lucide-react'
import Logo from './Logo'
import { SITE, NAV_LINKS } from '../lib/site'

export default function Footer() {
  return (
    <footer className="border-t border-white/40 bg-white/60 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <a href="#top" aria-label="Terrainshalo home">
            <Logo size={32} textClass="text-xl" />
          </a>
          <p className="mt-4 max-w-xs text-sm text-muted">
            End-to-end web and mobile solutions — from UI/UX design to full-stack development.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold">Explore</h4>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-muted">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-brand-600">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold">Get in touch</h4>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-muted">
            <li className="flex items-center gap-2">
              <Phone size={15} className="text-brand-600" />
              <a href={`tel:${SITE.phoneIntl}`} className="hover:text-brand-600">{SITE.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle size={15} className="text-green-600" />
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-brand-600">
                WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={15} className="text-brand-600" />
              <a href={`mailto:${SITE.email}`} className="hover:text-brand-600">{SITE.email}</a>
            </li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a
              href={SITE.socials.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="grid h-9 w-9 place-items-center rounded-lg bg-[#1877f2] text-white transition-transform hover:-translate-y-0.5"
            >
              <Facebook size={17} />
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="grid h-9 w-9 place-items-center rounded-lg bg-green-500 text-white transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle size={17} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-black/5 py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} Terrainshalo. All rights reserved.
      </div>
    </footer>
  )
}
