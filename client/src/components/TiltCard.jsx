import { useRef } from 'react'
import useFineMotion from '../hooks/useFineMotion'

export default function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const enabled = useFineMotion(800)
  function move(event) {
    if (!enabled || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    ref.current.style.setProperty('--rx', `${(0.5 - y) * 5}deg`)
    ref.current.style.setProperty('--ry', `${(x - 0.5) * 5}deg`)
    ref.current.style.setProperty('--light-x', `${x * 100}%`)
    ref.current.style.setProperty('--light-y', `${y * 100}%`)
  }
  function reset() {
    ref.current.style.setProperty('--rx', '0deg')
    ref.current.style.setProperty('--ry', '0deg')
  }
  return <div className={`tilt-surface ${className}`} ref={ref} onPointerMove={move} onPointerLeave={reset}>
    {children}<span className="tilt-light" aria-hidden="true" />
  </div>
}
