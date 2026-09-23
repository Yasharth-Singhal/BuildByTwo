import { ArrowUpRight } from 'lucide-react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import useFineMotion from '../hooks/useFineMotion'

export default function ButtonLink({ to, children, variant = 'primary' }) {
  const href = to.startsWith('/') && !to.includes('#') && !to.endsWith('/') ? `${to}/` : to
  const enabled = useFineMotion(800)
  const x = useMotionValue(0), y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 350, damping: 25 })
  const springY = useSpring(y, { stiffness: 350, damping: 25 })
  function move(event) {
    if (!enabled || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left - rect.width / 2) * 0.09)
    y.set((event.clientY - rect.top - rect.height / 2) * 0.15)
  }
  return <motion.span className="magnetic-button" style={{ x: enabled ? springX : 0, y: enabled ? springY : 0 }} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0) }}>
    <a className={`btn btn-${variant}`} href={href} data-cursor={to.startsWith('/contact') ? 'LET’S BUILD' : undefined}>
      {children}<ArrowUpRight size={18} aria-hidden="true"/>
    </a>
  </motion.span>
}
