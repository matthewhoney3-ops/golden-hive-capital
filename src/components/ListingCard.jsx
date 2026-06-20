import { useState } from 'react'
import { Link } from 'react-router-dom'
import StatusPill from './StatusPill.jsx'
import HexBadge from './HexBadge.jsx'
import { getConstructionMeta } from '../lib/constructionMeta.js'
import { formatUtilitiesIncluded } from '../lib/utilities.js'

export default function ListingCard({ property }) {
  const { label: constructionLabel, Icon } = getConstructionMeta(property.construction.type)
  const utilitiesNote = formatUtilitiesIncluded(property.utilities)
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  return (
    <div className="bg-surface border border-white/5 rounded overflow-hidden">
      <div className="relative aspect-[4/3] bg-gradient-to-br from-[#20201c] via-[#2a2a24] to-[#1c1c19] flex items-center justify-center overflow-hidden">
        {!loaded && !errored && <div className="absolute inset-0 skeleton-shimmer" />}
        <img
          src={property.media.coverImage}
          alt={property.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
        />
        <StatusPill status={property.status} />
        <HexBadge icon={<Icon size={20} />} label={constructionLabel} className="absolute top-2.5 right-2.5" />
        {errored && (
          <span className="text-[11px] tracking-wide text-muted-2 border border-dashed border-white/10 px-3 py-1.5 rounded-sm">
            photo coming soon
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-medium mb-1">{property.title}</h3>
        <p className="text-sm text-muted mb-3.5">
          {property.address.neighborhood} &middot; {property.address.city}, {property.address.state}
        </p>

        <div className="flex gap-3.5 text-sm text-muted border-t border-b border-white/[0.07] py-3 mb-3.5">
          <span>{property.specs.beds} bd</span>
          <span>&middot;</span>
          <span>{property.specs.baths} ba</span>
          <span>&middot;</span>
          <span>{property.specs.sqft.toLocaleString()} sqft</span>
        </div>

        <div className="flex items-baseline justify-between mb-3.5">
          <div className="font-display text-lg text-gold-2">
            ${property.price.toLocaleString()}
            <span className="text-xs text-muted-2 font-body ml-1">/ mo</span>
          </div>
          <Link to={`/listings/${property.id}`} className="text-sm border-b border-hairline pb-0.5">
            View details
          </Link>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-2 tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-2" />
          {constructionLabel}
        </div>
        {utilitiesNote && (
          <div className="flex items-center gap-2 text-xs text-muted-2 tracking-wide mt-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-2" />
            {utilitiesNote}
          </div>
        )}
      </div>
    </div>
  )
}
