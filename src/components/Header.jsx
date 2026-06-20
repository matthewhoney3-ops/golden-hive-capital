import { Link, NavLink } from 'react-router-dom'
import logoFull from '../assets/logo-full.png'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/listings', label: 'Listings' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-ink/90 backdrop-blur-md border-b border-hairline">
      <div className="max-w-[1180px] mx-auto px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logoFull} alt="Golden Hive Capital" className="h-28 w-auto" />
        </Link>

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

        <Link
          to="/contact"
          className="gold-fill gold-glow text-[#241B05] font-semibold text-[13px] tracking-wide px-6 py-2.5 rounded-sm"
        >
          Inquire
        </Link>
      </div>
    </header>
  )
}
