export default function HexBadge({ icon, label, size = 46, className = '' }) {
  return (
    <div
      className={`hex-clip gold-fill gold-glow flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      title={label}
      aria-label={label}
      role="img"
    >
      {icon}
    </div>
  )
}
