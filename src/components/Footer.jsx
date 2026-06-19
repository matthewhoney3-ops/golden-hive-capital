import { Link } from 'react-router-dom'
import logoMark from '../assets/logo-mark.svg'

export default function Footer() {
  return (
    <footer className="border-t border-hairline py-14">
      <div className="max-w-[1180px] mx-auto px-8">
        <div className="flex justify-between items-start gap-10 flex-wrap">
          <div>
            <div className="flex items-center gap-3">
              <img src={logoMark} width={22} height={22} alt="Golden Hive Capital monogram" />
              <span className="font-display font-semibold text-[15px] tracking-[0.1em]">Golden Hive Capital</span>
            </div>
            <p className="text-sm text-muted-2 mt-2 max-w-[260px]">
              Concrete, masonry, and steel. Never wood frame. Durable construction, honest management.
            </p>
          </div>

          <div className="flex gap-7 text-sm text-muted">
            <Link to="/">Home</Link>
            <Link to="/listings">Listings</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-white/[0.06] flex justify-between flex-wrap gap-2.5 text-xs text-muted-2">
          <span>&copy; {new Date().getFullYear()} Golden Hive Capital. All rights reserved.</span>
          <span>Equal housing opportunity.</span>
        </div>
      </div>
    </footer>
  )
}
