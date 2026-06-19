export function ConcreteIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#241B05" strokeWidth="1.6">
      <rect x="3" y="6" width="8" height="6" />
      <rect x="13" y="6" width="8" height="6" />
      <rect x="7" y="13" width="8" height="6" />
    </svg>
  )
}

export function MasonryIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#241B05" strokeWidth="1.6">
      <rect x="3" y="5" width="6" height="4" />
      <rect x="9" y="5" width="6" height="4" />
      <rect x="15" y="5" width="6" height="4" />
      <rect x="6" y="9" width="6" height="4" />
      <rect x="12" y="9" width="6" height="4" />
      <rect x="3" y="13" width="6" height="4" />
      <rect x="9" y="13" width="6" height="4" />
      <rect x="15" y="13" width="6" height="4" />
    </svg>
  )
}

export function SteelIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#241B05" strokeWidth="1.6">
      <path d="M5 4h14M5 20h14M9 4v16M15 4v16M9 12h6" />
    </svg>
  )
}
