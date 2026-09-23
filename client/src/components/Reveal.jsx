import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({ children, className = '', delay = 0, mask = false }) {
  const reduced = useReducedMotion()
  return <motion.div className={className}
    initial={reduced ? false : { opacity: 0, y: 24, ...(mask ? { clipPath: 'inset(6% 0 6% 0)' } : {}) }}
    whileInView={{ opacity: 1, y: 0, ...(mask ? { clipPath: 'inset(0% 0 0% 0)' } : {}) }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </motion.div>
}
