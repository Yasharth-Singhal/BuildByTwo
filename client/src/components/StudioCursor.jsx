import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import useFineMotion from '../hooks/useFineMotion'

export default function StudioCursor() {
  const enabled = useFineMotion(800)
  const [mode, setMode] = useState('')
  const [visible, setVisible] = useState(false)
  const lastMode = useRef('')
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const smoothX = useSpring(x, { stiffness: 600, damping: 42 })
  const smoothY = useSpring(y, { stiffness: 600, damping: 42 })
  useEffect(() => {
    if (!enabled) return
    const move = (event) => {
      if (event.pointerType !== 'mouse') return
      x.set(event.clientX); y.set(event.clientY)
      const target = event.target.closest('[data-cursor], a, button')
      const next = target?.dataset.cursor || (target ? 'link' : '')
      if (lastMode.current !== next) { lastMode.current = next; setMode(next) }
      setVisible(true)
    }
    const hide = () => setVisible(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', hide)
    window.addEventListener('blur', hide)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', hide)
      window.removeEventListener('blur', hide)
    }
  }, [enabled, x, y])
  if (!enabled) return null
  return <motion.div aria-hidden="true" className={`studio-cursor ${mode === 'VIEW' || mode === "LET’S BUILD" ? 'has-label' : ''} ${mode === 'link' ? 'is-link' : ''}`}
    style={{ left: smoothX, top: smoothY, opacity: visible ? 1 : 0 }}>
    {mode !== 'link' ? mode : ''}
  </motion.div>
}
