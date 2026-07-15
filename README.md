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
    Services.jsx           # 4 service cards with 3D hover tilt
    Industries.jsx         # verticals panel with parallax floating stat cards
    AIIntegrations.jsx     # orbiting integration nodes
    Testimonials.jsx       # reviews with depth/tilt
    Contact.jsx            # EmailJS form + social/contact channels  (replaces FAQ)
    Footer.jsx             # links, phone, WhatsApp, Facebook
```

## Changes made vs. the original design

- **Pricing section removed.**
- **FAQ replaced with a Contact Us section** containing the email form.
- Socials wired up: Facebook, phone **9600061720**, and WhatsApp (same number).

## 3D scroll animations

Each section is its own CSS perspective scene (`.scene-3d`), so child transforms
(`rotateX` / `rotateY` / Z-depth) render with real depth. Scroll-linked sections (Hero,
Industries) use `useScroll({ target, offset })` mapped through `useTransform` for parallax,
while reveal-on-scroll uses `whileInView` with the shared variants in `lib/motion.js`. Only
`transform`/`opacity` are animated (GPU-friendly), and `prefers-reduced-motion` is respected.

## Contact form (EmailJS)

The form sends to **admin@terrainshalo.com** via [EmailJS](https://www.emailjs.com) — no backend
needed. Set it up once:

1. Create a free EmailJS account and add an **Email Service** (e.g. Gmail) → copy the **Service ID**.
2. Create an **Email Template**. In the template's **To Email** field put `admin@terrainshalo.com`,
   and use these variables in the body: `{{from_name}}`, `{{from_email}}`, `{{subject}}`,
   `{{message}}`. Copy the **Template ID**.
3. From **Account → General**, copy your **Public Key**.
4. Put all three in `.env`:

   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

The form validates all fields client-side and shows **Sending… / Success! / Error** states. Until
keys are added it will show the error state (by design) so misconfiguration is obvious.
