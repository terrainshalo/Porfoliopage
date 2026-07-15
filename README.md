# Terrainshalo — Landing Page

A single-page React marketing site rebuilt from the Figma design, with premium 3D scroll
animations, a working EmailJS contact form, and linked socials. Built with **Vite + React +
Tailwind CSS + Framer Motion**.

## Quick start

```bash
npm install
cp .env.example .env    # then fill in your EmailJS keys (see below)
npm run dev             # http://localhost:5173
npm run build           # production build -> dist/
```

## Project structure

```
src/
  App.jsx                  # page shell + global scroll-progress bar (3D bridge notes inside)
  lib/
    motion.js              # shared Framer Motion variants (fadeUp3D, cardTilt, stagger)
    site.js                # brand, contact number, WhatsApp, socials, nav links
  components/
    Navbar.jsx             # sticky nav, blurs on scroll, mobile menu
    Hero.jsx               # scroll-driven parallax hero (useScroll + useTransform)
    LogoMarquee.jsx        # infinite client-logo marquee
    Services.jsx           # ERP-focused service cards (ERP featured) with 3D hover tilt
    Industries.jsx         # "One ERP, every industry" panel with parallax cards
    AIIntegrations.jsx     # WhatsApp / Email / notification integrations (orbiting nodes)
    Testimonials.jsx       # real client testimonials
    Founders.jsx           # founder + co-founder cards
    Contact.jsx            # EmailJS form + social/contact channels  (replaces FAQ)
    Footer.jsx             # links, phone, WhatsApp, Facebook
  hooks/
    useSmoothScroll.js     # Lenis inertia scroll feeding the scroll-linked animations
```

## Changes made vs. the original design

- **Pricing section removed**; **FAQ replaced with a Contact Us section**.
- Repositioned around **custom ERP for any business, any scale**, AI-accelerated + digital marketing.
- Real clients used: **Harini Builders, KJR Chit Funds, Cowboy Bar**.
- Added a **Founders** section (Mukundan + co-founders Kishore, Sowmeiyha, Yashwanth).
- **Login button removed**; **Lenis smooth scroll** added.
- Socials wired up: Facebook, phone **9600061720**, and WhatsApp (same number).

## 3D scroll animations

Each section is its own CSS perspective scene (`.scene-3d`), so child transforms
(`rotateX` / `rotateY` / Z-depth) render with real depth. Scroll-linked sections (Hero,
Industries) use `useScroll({ target, offset })` mapped through `useTransform` for parallax,
while reveal-on-scroll uses `whileInView` with the shared variants in `lib/motion.js`. Only
`transform`/`opacity` are animated (GPU-friendly), and `prefers-reduced-motion` is respected.

## Contact form → lead emails (Web3Forms)

The form emails you every lead via [Web3Forms](https://web3forms.com) — no backend, no template
config. **One-time, ~1 minute setup:**

1. Go to https://web3forms.com and enter the inbox where you want leads (e.g.
   `buildersharini@gmail.com` or `admin@terrainshalo.com`).
2. Copy the **Access Key** they give you.
3. Create a `.env` file (copy `.env.example`) and paste it in:

   ```
   VITE_WEB3FORMS_KEY=your_web3forms_access_key
   ```

4. Restart `npm run dev`.

That's it. When someone submits, you get an email containing their **name, email, topic and
message**. The form validates all fields and shows **Sending… / Success! / Error** states. Until
the key is added it stays in the error state (by design) so it's obvious it isn't wired up yet.
