import { useParams, Link } from 'react-router-dom'
import properties from '../data/properties.json'
import StatusPill from '../components/StatusPill.jsx'
import HexBadge from '../components/HexBadge.jsx'
import InquiryForm from '../components/InquiryForm.jsx'
import Gallery from '../components/Gallery.jsx'
import { getConstructionMeta } from '../lib/constructionMeta.js'
import { formatUtilitiesIncluded, formatUtilitiesTenantPays } from '../lib/utilities.js'

const LEASE_TERM_LABELS = {
  minLeaseMonths: 'Minimum lease',
  renewalNote: 'Renewal',
  rentDueDay: 'Rent due',
  gracePeriodDays: 'Grace period',
  securityDeposit: 'Security deposit',
  petPolicy: 'Pet policy',
  smokingPolicy: 'Smoking policy',
  maintenanceNote: 'Maintenance & repairs',
  entryNotice: 'Entry & notice',
  occupancyLimit: 'Occupancy limit',
  applicationRequirements: 'Application requirements',
  terminationNotice: 'Lease termination',
}

function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

function formatLeaseTermValue(key, value) {
  if (key === 'minLeaseMonths') return `${value} months`
  if (key === 'rentDueDay') return `${ordinal(value)} of each month`
  if (key === 'gracePeriodDays') return `${value} days`
  return value
}

function formatAvailableDate(dateStr) {
  if (!dateStr) return null
  const d = new Date(`${dateStr}T00:00:00`)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function PropertyDetail() {
  const { id } = useParams()
  const property = properties.find((p) => p.id === id)

  if (!property) {
    return (
      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-8 text-center">
          <p className="text-muted mb-4">We couldn&rsquo;t find that property.</p>
          <Link to="/listings" className="text-gold-2 border-b border-hairline pb-0.5">
            Back to listings
          </Link>
        </div>
      </section>
    )
  }

  const { label: constructionLabel, Icon } = getConstructionMeta(property.construction.type)
  const mediaItems = [
    { type: 'image', src: property.media.coverImage },
    ...(property.media.gallery ?? []).map((src) => ({ type: 'image', src })),
    ...(property.media.videos ?? []).map((v) => ({ type: 'video', src: v.url, title: v.title })),
  ]
  const showStreet = property.address.showStreetPublicly && property.address.street
  const hasStreetView = Boolean(property.location?.streetViewEmbedUrl)
  const utilitiesIncludedNote = formatUtilitiesIncluded(property.utilities)
  const utilitiesTenantNote = formatUtilitiesTenantPays(property.utilities)
  const availableDateLabel = formatAvailableDate(property.availableDate)

  const specItems = [
    { label: 'Beds', value: property.specs.beds },
    { label: 'Baths', value: property.specs.baths },
    { label: 'Sqft', value: property.specs.sqft?.toLocaleString() },
    property.specs.yearBuilt && { label: 'Year built', value: property.specs.yearBuilt },
    property.specs.lotSqft && { label: 'Lot size', value: `${property.specs.lotSqft.toLocaleString()} sqft` },
    property.specs.parking && { label: 'Parking', value: property.specs.parking },
    { label: 'Construction', value: constructionLabel.replace(' construction', '') },
  ].filter(Boolean)

  const leaseTermEntries = property.leaseTerms
    ? Object.entries(property.leaseTerms)
        .filter(([key]) => LEASE_TERM_LABELS[key])
        .map(([key, value]) => ({
          label: LEASE_TERM_LABELS[key],
          value: formatLeaseTermValue(key, value),
        }))
    : []

  return (
    <section className="py-16">
      <div className="max-w-[1180px] mx-auto px-8">
        <Link to="/listings" className="text-sm text-muted hover:text-gold-2 mb-6 inline-block">
          &larr; Back to listings
        </Link>

        <Gallery items={mediaItems} title={property.title} badge={<StatusPill status={property.status} />} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
          {/* Main content */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h1 className="font-display font-semibold text-3xl">{property.title}</h1>
              <HexBadge icon={<Icon size={22} />} label={constructionLabel} size={52} />
            </div>
            <p className="text-muted mb-1">
              {property.address.neighborhood} &middot; {property.address.city}, {property.address.state}
              {showStreet ? `, ${property.address.street}` : ''}
            </p>
            <div className="font-display text-2xl text-gold-2 mb-1">
              ${property.price.toLocaleString()}
              <span className="text-sm text-muted-2 font-body ml-1">/ {property.priceLabel.replace('per ', '')}</span>
            </div>
            {availableDateLabel && (
              <p className="text-sm text-muted-2 mb-8">Available {availableDateLabel}</p>
            )}
            {!availableDateLabel && <div className="mb-8" />}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 border-y border-white/[0.07] py-5 mb-8 text-sm">
              {specItems.map((item) => (
                <div key={item.label}>
                  <div className="text-muted-2">{item.label}</div>
                  <div className="text-lg">{item.value}</div>
                </div>
              ))}
            </div>

            <p className="text-muted leading-relaxed mb-8">{property.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-surface border border-white/5 rounded p-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <HexBadge icon={<Icon size={16} />} label={constructionLabel} size={32} />
                  <span className="font-medium">{constructionLabel}</span>
                </div>
                <p className="text-sm text-muted-2">{property.construction.note}</p>
              </div>

              {(utilitiesIncludedNote || utilitiesTenantNote) && (
                <div className="bg-surface border border-white/5 rounded p-5">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-2 h-2 rounded-full bg-gold-2" />
                    <span className="font-medium">Utilities</span>
                  </div>
                  {utilitiesIncludedNote && (
                    <p className="text-sm text-muted-2">We cover: {property.utilities.landlordPays.join(', ')}</p>
                  )}
                  {utilitiesTenantNote && (
                    <p className="text-sm text-muted-2 mt-1">You cover: {property.utilities.tenantPays.join(', ')}</p>
                  )}
                </div>
              )}
            </div>

            {property.amenities?.length > 0 && (
              <div className="mb-10">
                <h2 className="font-display text-lg mb-3">Amenities</h2>
                <ul className="grid grid-cols-2 gap-2 text-sm text-muted">
                  {property.amenities.map((a) => (
                    <li key={a} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-2" /> {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {leaseTermEntries.length > 0 && (
              <div className="mb-10">
                <h2 className="font-display text-lg mb-3">Lease terms</h2>
                <div className="bg-surface border border-white/5 rounded p-5 space-y-4">
                  {leaseTermEntries.map((entry) => (
                    <div key={entry.label} className="grid grid-cols-1 sm:grid-cols-[170px_1fr] gap-1.5 text-sm">
                      <div className="text-muted-2">{entry.label}</div>
                      <div className="text-muted">{entry.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="font-display text-lg mb-3">Location</h2>
              {hasStreetView ? (
                <div className="aspect-[16/9] rounded overflow-hidden border border-white/10">
                  <iframe
                    src={property.location.streetViewEmbedUrl}
                    title={`Street view near ${property.title}`}
                    className="w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : (
                <p className="text-sm text-muted-2 italic">
                  Street View embed not yet configured for this property. See the README for how to generate one.
                </p>
              )}
            </div>
          </div>

          {/* Sticky inquiry sidebar */}
          <div>
            <div className="lg:sticky lg:top-24">
              {property.status === 'available' && (
                
                  href={`https://apply.goldenhivecapital.com/apply?property=${encodeURIComponent(property.id)}&label=${encodeURIComponent(property.title)}`}
                  className="block w-full text-center rounded bg-gold-2 text-neutral-900 font-medium py-3 mb-6"
                >
                  Apply now
                </a>
              )}
              <h2 className="font-display text-lg mb-4">Inquire about this property</h2>
              <InquiryForm propertyTitle={property.title} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}