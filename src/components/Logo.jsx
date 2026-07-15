// Terrainshalo brand mark — uses the supplied logo asset in /public/logo.svg.
export function LogoMark({ size = 40, className = '' }) {
  return (
    <img
      src="/logo.svg"
      alt="Terrainshalo logo"
      style={{ height: size, width: 'auto' }}
      className={className}
      draggable={false}
    />
  )
}

// Full lockup: mark + wordmark (Inter 700, #3B3A95).
export default function Logo({ size = 34, className = '', textClass = 'text-2xl' }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <LogoMark size={size} />
      <span className={`font-bold tracking-tight text-[#3B3A95] ${textClass}`}>
        Terrainshalo
      </span>
    </span>
  )
}
