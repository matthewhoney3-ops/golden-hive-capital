export default function StatusPill({ status, className = '' }) {
  const isAvailable = status === 'available'
  return (
    <span
      className={`absolute top-3.5 left-3.5 text-[11px] tracking-wide px-2.5 py-1 rounded-sm ${
        isAvailable ? 'bg-available-bg text-available-text' : 'bg-leased-bg text-leased-text'
      } ${className}`}
    >
      {isAvailable ? 'Available' : 'Leased'}
    </span>
  )
}
