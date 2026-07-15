// Central place for brand + contact details used across the site.
export const SITE = {
  name: 'Terrainshalo',
  email: 'admin@terrainshalo.com',
  phone: '9600061720',
  phoneIntl: '+919600061720', // used for tel: and WhatsApp deep links
  whatsapp: '919600061720',
  socials: {
    facebook: 'https://www.facebook.com/profile.php?id=61591512972709',
  },
}

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'Solutions', href: '#ai' },
  { label: 'Founders', href: '#founders' },
  { label: 'Contact', href: '#contact' },
]

// The teams we're currently building ERP + growth systems for.
export const CLIENTS = ['Harini Builders', 'KJR Chit Funds', 'Cowboy Bar']

export const FOUNDERS = [
  {
    name: 'Mukundan',
    role: 'Founder',
    initial: 'M',
    photo: '/team/mukundan.jpg',
    bio: 'Sets the product vision and architecture behind every ERP we ship.',
  },
  {
    name: 'Kishore',
    role: 'Co-Founder',
    initial: 'K',
    photo: '/team/kishore.jpg', // drop the photo at public/team/kishore.jpg
    bio: 'Drives engineering and delivery, turning requirements into reliable software.',
  },
  {
    name: 'Sowmeiyha',
    role: 'Co-Founder',
    initial: 'S',
    photo: '/team/sowmeiyha.jpg',
    bio: "Driven by curiosity and a builder's mindset, creating technology that makes a meaningful difference.",
  },
  {
    name: 'Yashwanth',
    role: 'Co-Founder',
    initial: 'Y',
    photo: '/team/yashwanth.jpg', // shows once you add public/team/yashwanth.jpg; falls back to "Y"
    bio: 'Owns design and client experience, keeping every product intuitive end to end.',
  },
]
