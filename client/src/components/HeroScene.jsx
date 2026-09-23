import { useEffect, useRef, useState } from 'react'
import useFineMotion from '../hooks/useFineMotion'

function StaticSculpture() {
  return <svg className="static-sculpture" viewBox="0 0 600 600" role="img" aria-label="An orange loop and a blue geometric frame interlock, representing design and development.">
    <defs>
      <linearGradient id="sculpture-orange" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fabb83"/><stop offset=".4" stopColor="#ed7435"/><stop offset="1" stopColor="#9c361b"/></linearGradient>
      <linearGradient id="sculpture-blue" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#88a0fa"/><stop offset=".45" stopColor="#254ee5"/><stop offset="1" stopColor="#102781"/></linearGradient>
    </defs>
    <ellipse cx="310" cy="505" rx="180" ry="14" fill="#11110f" opacity=".07"/>
    <ellipse cx="250" cy="265" rx="125" ry="155" transform="rotate(-32 250 265)" fill="none" stroke="#b65129" strokeWidth="67"/>
    <ellipse cx="247" cy="255" rx="125" ry="155" transform="rotate(-32 247 255)" fill="none" stroke="url(#sculpture-orange)" strokeWidth="58"/>
    <rect x="267" y="242" width="212" height="212" rx="30" transform="rotate(25 373 348)" fill="none" stroke="#152d91" strokeWidth="53"/>
    <rect x="263" y="234" width="212" height="212" rx="30" transform="rotate(25 369 340)" fill="none" stroke="url(#sculpture-blue)" strokeWidth="47"/>
    <path d="M136 195 C79 269 114 357 189 402" fill="none" stroke="url(#sculpture-orange)" strokeWidth="58"/>
  </svg>
}

export default function HeroScene() {
  const host = useRef(null)
  const fineMotion = useFineMotion(800)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const element = host.current
    if (!fineMotion || navigator.connection?.saveData || (navigator.deviceMemory && navigator.deviceMemory <= 4)) return
    let disposed = false, cleanup = () => {}
    // The renderer is downloaded only for a visible desktop scene.
    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      try {
        const { mountSculpture } = await import('../scenes/sculpture')
        if (disposed) return
        cleanup = mountSculpture(element, () => setReady(true), () => setReady(false))
      } catch {
        // Static geometry is the designed fallback for unsupported WebGL or a failed chunk.
        if (!disposed) setReady(false)
      }
    }, { rootMargin: '100px' })
    observer.observe(element)
    return () => { disposed = true; observer.disconnect(); cleanup(); setReady(false) }
  }, [fineMotion])
  return <div className={`sculpture-stage ${ready ? 'is-ready' : ''}`}>
    <div className="sculpture-crosshair crosshair-top" aria-hidden="true">+</div>
    <div className="sculpture-crosshair crosshair-bottom" aria-hidden="true">+</div>
    <div className="sculpture-render" ref={host} aria-hidden="true" />
    <div className="sculpture-fallback"><StaticSculpture /></div>
    <span className="sculpture-label design-label"><i/>01 — Creative instinct</span>
    <span className="sculpture-label code-label"><i/>02 — Technical precision</span>
    <span className="sculpture-caption">Different by nature. Better together.</span>
  </div>
}
