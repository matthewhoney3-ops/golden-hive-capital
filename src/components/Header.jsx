import { Link, NavLink } from 'react-router-dom'
import logoMark from '../assets/logo-mark.svg'

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
        <Link to="/" className="flex items-center gap-3.5">
          <img src={logoMark} width={38} height={38} alt="Golden Hive Capital monogram" />
          <span className="flex flex-col leading-tight">
            <span className="font-display font-semibold text-lg tracking-[0.12em] gold-text">Golden Hive</span>
            <span className="hairline-flank text-[10px] tracking-[0.32em] text-muted-2 mt-1">CAPITAL</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'text-gold-2' : 'text-muted hover:text-gold-2 transition-colors')}
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
