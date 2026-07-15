const BRANDS = ['drips', 'NETFLIX', 'Canva', 'ahlsell', 'Clickl', 'GONG']

// Infinite marquee of client logos (duplicated list = seamless loop).
export default function LogoMarquee() {
  return (
    <div className="border-y border-black/5 bg-white py-8">
      <div className="marquee-mask mx-auto max-w-7xl overflow-hidden px-5">
        <div className="animate-marquee flex w-max items-center gap-16 whitespace-nowrap">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span
              key={i}
              className="text-2xl font-bold tracking-tight text-ink/40 transition-colors hover:text-ink"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
