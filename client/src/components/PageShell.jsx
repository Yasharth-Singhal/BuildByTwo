import { motion, MotionConfig, useReducedMotion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import StudioCursor from './StudioCursor'

export default function PageShell({ children }) {
  const reduced = useReducedMotion()
  return <MotionConfig reducedMotion="user">
    <a href="#main-content" className="skip-link">Skip to content</a>
    <Navbar />
    <StudioCursor />
    <main id="main-content" tabIndex={-1}>
      <motion.div initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .3 }}>
        {children}
      </motion.div>
    </main>
    <Footer />
  </MotionConfig>
}
