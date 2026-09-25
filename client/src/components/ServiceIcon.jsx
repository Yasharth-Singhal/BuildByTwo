import { useEffect, useRef, useState } from 'react'
import useFineMotion from '../hooks/useFineMotion'

function GlyphFallback({ type }) {
  if (type === 'design') return <svg viewBox="0 0 120 120"><path d="M20 88C28 26 55 19 62 57s28 42 38-25"/></svg>
  if (type === 'development') return <svg viewBox="0 0 120 120"><path d="M44 29 19 60l25 31M76 29l25 31-25 31"/></svg>
  if (type === 'social') return <svg viewBox="0 0 120 120"><ellipse cx="60" cy="60" rx="42" ry="22"/><ellipse cx="60" cy="60" rx="42" ry="22" transform="rotate(60 60 60)"/><ellipse cx="60" cy="60" rx="42" ry="22" transform="rotate(120 60 60)"/></svg>
  return <svg viewBox="0 0 120 120"><circle cx="48" cy="58" r="27"/><rect x="49" y="35" width="48" height="48" rx="7"/></svg>
}

export default function ServiceIcon({ type = 'together', size = 'small', ambient = false, label }) {
  const host = useRef(null)
  const enabled = useFineMotion(800)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (!enabled || navigator.connection?.saveData || (navigator.deviceMemory && navigator.deviceMemory <= 4)) return
    let disposed = false, loading = false, visible = false, cleanup = null
    const observer = new IntersectionObserver(async ([entry]) => {
      visible = entry.isIntersecting
      if (!entry.isIntersecting) {
        cleanup?.(); cleanup = null; setReady(false)
        return
      }
      if (cleanup || loading) return
      loading = true
      try {
        const { mountServiceIcon } = await import('../scenes/serviceIcon')
        if (!disposed && visible) cleanup = mountServiceIcon(host.current, type, () => setReady(true), () => setReady(false))
      } catch { if (!disposed) setReady(false) }
      finally { loading = false }
    }, { rootMargin: '180px' })
    observer.observe(host.current)
    return () => { disposed = true; observer.disconnect(); cleanup?.(); setReady(false) }
  }, [enabled, type])
  return <div className={`service-glyph service-glyph-${size} ${ambient ? 'service-glyph-ambient' : ''} ${ready ? 'is-ready' : ''}`} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : 'true'}>
    <div className="service-glyph-render" ref={host}/><div className="service-glyph-fallback"><GlyphFallback type={type}/></div>
  </div>
}
