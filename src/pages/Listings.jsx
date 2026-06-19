import { useState } from 'react'
import properties from '../data/properties.json'
import ListingCard from '../components/ListingCard.jsx'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'available', label: 'Available' },
  { key: 'leased', label: 'Leased' },
]

export default function Listings() {
  const [filter, setFilter] = useState('all')

  const sorted = [...properties].sort((a, b) => a.sortOrder - b.sortOrder)
  const visible = filter === 'all' ? sorted : sorted.filter((p) => p.status === filter)

  return (
    <section className="py-20">
      <div className="max-w-[1180px] mx-auto px-8">
        <div className="mb-10">
          <div className="eyebrow text-xs tracking-[0.3em] text-gold-2 mb-3.5">PROPERTIES</div>
          <h1 className="font-display font-semibold text-3xl mb-7">Available rentals</h1>

          <div className="flex gap-3">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`text-sm tracking-wide px-4 py-2 rounded-sm border ${
                  filter === f.key ? 'border-gold-2 text-gold-2' : 'border-hairline text-muted'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <p className="text-muted">No properties match that filter right now.</p>
        ) : (
          <div
            className={`grid grid-cols-1 gap-7 ${
              visible.length === 1 ? 'max-w-md' : visible.length === 2 ? 'sm:grid-cols-2 max-w-3xl' : 'sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {visible.map((property) => (
              <ListingCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
