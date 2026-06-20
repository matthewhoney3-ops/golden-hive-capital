import { useState, useEffect, useRef } from 'react'

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#D6BC63">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function Slide({ item, title, className, loaded, onLoad, onError }) {
  if (item.type === 'video') {
    return (
      <iframe
        src={item.src}
        title={item.title || `${title} video`}
        className={className}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }
  return (
    <div className={`${className} relative overflow-hidden`}>
      {!loaded && <div className="absolute inset-0 skeleton-shimmer" />}
      <img
        src={item.src}
        alt={title || ''}
        onLoad={onLoad}
        onError={onError}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}

export default function Gallery({ items, title, badge = null }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [loadedSrcs, setLoadedSrcs] = useState(() => new Set())
  const thumbRefs = useRef([])

  function markLoaded(src) {
    setLoadedSrcs((prev) => {
      if (prev.has(src)) return prev
      const next = new Set(prev)
      next.add(src)
      return next
    })
  }

  function goTo(index) {
    setActiveIndex(((index % items.length) + items.length) % items.length)
  }

  useEffect(() => {
    thumbRefs.current[activeIndex]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [activeIndex])

  useEffect(() => {
    if (!lightboxOpen) return
    function onKey(e) {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') goTo(activeIndex + 1)
      if (e.key === 'ArrowLeft') goTo(activeIndex - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, activeIndex])

  if (!items.length) return null
  const active = items[activeIndex]
  const activeLoaded = active.type === 'video' || loadedSrcs.has(active.src)

  return (
    <div>
      <div className="relative aspect-[16/9] bg-gradient-to-br from-[#20201c] via-[#2a2a24] to-[#1c1c19] rounded overflow-hidden mb-3">
        <div key={activeIndex} className="absolute inset-0 fade-in">
          <Slide
            item={active}
            title={title}
            className="absolute inset-0 w-full h-full"
            loaded={activeLoaded}
            onLoad={() => markLoaded(active.src)}
            onError={() => markLoaded(active.src)}
          />
        </div>

        {active.type === 'image' && (
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute inset-0 cursor-zoom-in"
            aria-label="Expand image"
          />
        )}

        {badge && <div className="absolute top-4 left-4 z-10">{badge}</div>}

        {items.length > 1 && (
          <>
            <button
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ink/70 border border-white/10 flex items-center justify-center text-ivory text-lg hover:border-gold-2 z-10"
            >
              ‹
            </button>
            <button
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ink/70 border border-white/10 flex items-center justify-center text-ivory text-lg hover:border-gold-2 z-10"
            >
              ›
            </button>
            <span className="absolute bottom-3 right-3 text-xs bg-ink/70 px-2.5 py-1 rounded-sm text-muted-2 z-10">
              {activeIndex + 1} / {items.length}
            </span>
          </>
        )}
      </div>

      {items.length > 1 && (
        <div className="flex gap-3 mb-10 overflow-x-auto pb-1">
          {items.map((item, i) => {
            const thumbLoaded = item.type === 'video' || loadedSrcs.has(item.src)
            return (
              <button
                key={i}
                ref={(el) => (thumbRefs.current[i] = el)}
                onClick={() => goTo(i)}
                className={`relative w-20 h-16 flex-shrink-0 rounded overflow-hidden bg-surface-2 border ${
                  i === activeIndex ? 'border-gold-2' : 'border-white/10'
                }`}
              >
                {item.type === 'video' ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayIcon />
                  </div>
                ) : (
                  <>
                    {!thumbLoaded && <div className="absolute inset-0 skeleton-shimmer" />}
                    <img
                      src={item.src}
                      alt=""
                      onLoad={() => markLoaded(item.src)}
                      onError={() => markLoaded(item.src)}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        thumbLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </>
                )}
              </button>
            )
          })}
        </div>
      )}

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
            className="absolute top-5 right-5 text-ivory text-2xl w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:border-gold-2 z-10"
          >
            ×
          </button>

          {items.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goTo(activeIndex - 1)
                }}
                aria-label="Previous"
                className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-ivory text-2xl hover:border-gold-2 z-10"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goTo(activeIndex + 1)
                }}
                aria-label="Next"
                className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-ivory text-2xl hover:border-gold-2 z-10"
              >
                ›
              </button>
            </>
          )}

          <div
            key={activeIndex}
            className="fade-in w-full max-w-5xl aspect-[16/9]"
            onClick={(e) => e.stopPropagation()}
          >
            <Slide
              item={active}
              title={title}
              className="w-full h-full"
              loaded={activeLoaded}
              onLoad={() => markLoaded(active.src)}
              onError={() => markLoaded(active.src)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
