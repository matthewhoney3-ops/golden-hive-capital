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

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-20 bg-ink/90 backdrop-blur-md border-b border-hairline">
      <div
        className={`max-w-[1180px] mx-auto px-8 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <Link to="/" className="flex items-center">
          {scrolled ? (
            <img src={logoMark} alt="Golden Hive Capital" className="h-9 w-auto" />
          ) : (
            <img src={logoFull} alt="Golden Hive Capital" className="h-28 w-auto transition-all duration-300" />
          )}
        </Link>

        {!scrolled && (
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

        {!scrolled && (
          <Link
            to="/contact"
            className="hidden md:inline-block gold-fill gold-glow text-[#241B05] font-semibold text-[13px] tracking-wide px-6 py-2.5 rounded-sm"
          >
            Inquire
          </Link>
        )}

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className={`${scrolled ? 'flex' : 'flex md:hidden'} items-center justify-center w-9 h-9 text-ivory`}
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
