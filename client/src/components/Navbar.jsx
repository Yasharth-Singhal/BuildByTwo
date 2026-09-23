import { useEffect, useRef, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggle = useRef(null)
  const pathname = window.location.pathname
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 30)
    scroll()
    window.addEventListener('scroll', scroll, { passive: true })
    return () => window.removeEventListener('scroll', scroll)
  }, [])
  useEffect(() => {
    const escape = event => { if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus() } }
    window.addEventListener('keydown', escape)
    return () => window.removeEventListener('keydown', escape)
  }, [open])
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <nav className="nav shell" aria-label="Primary navigation">
      <a className="wordmark" href="/" aria-label="BuildByTwo home">BuildBy<span>Two</span><i>2</i></a>
      <button ref={toggle} className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="primary-links" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      <div id="primary-links" className={`nav-links ${open ? 'open' : ''}`}>
        {['Home','Services','Work','About','Contact'].map(label => {
          const href = label === 'Home' ? '/' : `/${label.toLowerCase()}/`
          const active = label === 'Home' ? pathname === '/' : pathname.startsWith(href)
          return <a key={label} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined} href={href}>{label}</a>
        })}
        <a className="nav-cta" href="/contact/" data-cursor="LET’S BUILD">Start a project <ArrowUpRight size={16}/></a>
      </div>
    </nav>
  </header>
}
