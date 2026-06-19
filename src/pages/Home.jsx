import { Link } from 'react-router-dom'
import properties from '../data/properties.json'
import ListingCard from '../components/ListingCard.jsx'
import HexBadge from '../components/HexBadge.jsx'

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#241B05" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 12 9 17 20 6" />
    </svg>
  )
}

const HIGHLIGHTS = [
  { title: 'Durable construction', sub: 'Concrete, masonry, or steel on every property.' },
  { title: 'Hands-on ownership', sub: 'Direct management, no corporate layers.' },
  { title: 'Long-term stewardship', sub: 'Built for decades, not quarters.' },
  { title: 'Simplified living', sub: 'Utilities and maintenance, handled.' },
]

export default function Home() {
  const featured = properties.filter((p) => p.featured).slice(0, 3)
  const shown = featured.length > 0 ? featured : properties.slice(0, 3)

  return (
    <>
      <section className="relative overflow-hidden border-b border-hairline min-h-[640px] flex items-center bg-[radial-gradient(ellipse_70%_55%_at_78%_28%,rgba(214,188,99,0.10),transparent_60%)]">
        <svg
          className="absolute -right-[120px] top-1/2 -translate-y-1/2 w-[760px] h-[760px] opacity-10 pointer-events-none"
          viewBox="0 0 512 512"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="heroHexGold" x1="90" y1="80" x2="430" y2="430" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#F7E7A6" />
              <stop offset="0.45" stopColor="#D6BC63" />
              <stop offset="1" stopColor="#A8862C" />
            </linearGradient>
          </defs>
          <polygon
            points="256,40 432,148 432,364 256,472 80,364 80,148"
            stroke="url(#heroHexGold)"
            strokeWidth="6"
            fill="none"
          />
        </svg>

        <div className="relative z-10 max-w-[1180px] mx-auto px-8 py-24">
          <div className="eyebrow text-xs tracking-[0.3em] text-gold-2 mb-5">
            GOLDEN HIVE CAPITAL
          </div>

          <h1 className="font-display font-semibold text-4xl md:text-5xl leading-tight max-w-2xl mb-5">
            Built deliberately. <span className="gold-text">Designed to endure.</span>
          </h1>

          <p className="max-w-xl text-lg text-muted mb-10">
            A family-owned real estate company acquiring and managing thoughtfully selected homes across the
            Phoenix area. Inspired by the precision of a beehive, we build our portfolio one durable property
            at a time, prioritizing quality construction, long-term ownership, and exceptional living
            experiences for our residents.
          </p>

          <div className="flex gap-4 mb-12">
            <Link to="/listings" className="gold-fill gold-glow text-[#241B05] font-semibold text-[13px] tracking-wide px-6 py-2.5 rounded-sm">
              View Available Properties
            </Link>
            <Link to="/contact" className="border border-hairline text-ivory text-[13px] tracking-wide px-6 py-2.5 rounded-sm">
              Get In Touch
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-7">
            {HIGHLIGHTS.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <HexBadge icon={<CheckIcon />} label={item.title} size={38} className="flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-display text-base font-medium mb-1">{item.title}</div>
                  <div className="text-sm text-muted-2 leading-relaxed">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="mb-12">
            <div className="eyebrow text-xs tracking-[0.3em] text-gold-2 mb-3.5">
              FEATURED PROPERTIES
            </div>
            <h2 className="font-display font-semibold text-3xl">Available now</h2>
          </div>

          <div
            className={`grid grid-cols-1 gap-7 ${
              shown.length === 1 ? 'max-w-md' : shown.length === 2 ? 'sm:grid-cols-2 max-w-3xl' : 'sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {shown.map((property) => (
              <ListingCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
