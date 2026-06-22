import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logoFull from '../assets/logo-full.png'
import logoMark from '../assets/logo-mark.svg'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/listings', label: 'Listings' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

// How many pixels of scroll the shrink animation is spread across.
// Bigger number = more gradual.
const SHRINK_RANGE = 140

export default function Header() {
  const [progress, setProgress] = useState(0) // 0 = top of page, 1 = fully shrunk
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    function onScroll() {
      setProgress(Math.min(window.scrollY / SHRINK_RANGE, 1))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const compact = progress >= 1
  const paddingY = 16 - 8 * progress // px: 16 at top -> 8 once fully shrunk
  const logoBoxHeight = 112 - 72 * progress // px: 112 at top -> 40 once fully shrunk

  return (
    <header className="sticky top-0 z-20 bg-ink/90 backdrop-blur-md border-b border-hairline">
      <div
        className="max-w-[1180px] mx-auto px-8 flex items-center justify-between"
        style={{ paddingTop: paddingY, paddingBottom: paddingY, transition: 'padding 80ms linear' }}
      >
        <Link to="/" className="relative flex items-center" style={{ height: logoBoxHeight, width: 160 }}>
          <img
            src={logoFull}
            alt="Golden Hive Capital"
            style={{
              height: logoBoxHeight,
              opacity: 1 - progress,
              transition: 'opacity 80ms linear, height 80ms linear',
            }}
            className="w-auto absolute left-0 top-1/2 -translate-y-1/2"
          />
          <img
            src={logoMark}
            alt="Golden Hive Capital"
            style={{ height: 36, opacity: progress, transition: 'opacity 80ms linear' }}
            className="w-auto absolute left-0 top-1/2 -translate-y-1/2"
          />
        </Link>

        {!compact && (
          <nav className="hidden md:flex items-center divide-x divide-hairline text-xs tracking-[0.18em] uppercase">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-5 ${isActive ? 'text-gold-2' : 'text-muted hover:text-gold-2 transition-colors'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        )}

        {!compact && (
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://apply.goldenhivecapital.com/login"
              className="text-xs tracking-[0.18em] uppercase text-muted hover:text-gold-2 transition-colors"
            >
              Tenant portal
            </a>
            <Link
              to="/contact"
              className="gold-fill gold-glow text-[#241B05] font-semibold text-[13px] tracking-wide px-6 py-2.5 rounded-sm"
            >
              Inquire
            </Link>
          </div>
        )}

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className={`${compact ? 'flex' : 'flex md:hidden'} items-center justify-center w-9 h-9 text-ivory`}
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-ink/95 backdrop-blur-md border-b border-hairline">
          <div className="max-w-[1180px] mx-auto px-8 py-6 flex flex-col gap-5 text-sm tracking-wide uppercase">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => (isActive ? 'text-gold-2' : 'text-muted hover:text-gold-2')}
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href="https://apply.goldenhivecapital.com/login"
              className="text-muted hover:text-gold-2 normal-case"
            >
              Tenant portal
            </a>
            <Link
              to="/contact"
              className="gold-fill gold-glow text-[#241B05] font-semibold text-[13px] tracking-wide px-6 py-2.5 rounded-sm self-start normal-case"
            >
              Inquire
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
