import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ButtonLink from '../components/ButtonLink'
import useFineMotion from '../hooks/useFineMotion'

export default function BuiltByTwo() {
  const ref = useRef(null)
  const enabled = useFineMotion(800)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const left = useTransform(scrollYProgress, [0.15, 0.8], ['-14%', '0%'])
  const right = useTransform(scrollYProgress, [0.15, 0.8], ['14%', '0%'])
  const wordY = useTransform(scrollYProgress, [0.5, 0.95], [35, 0])
  const wordOpacity = useTransform(scrollYProgress, [0.5, 0.9], [0.2, 1])
  return <section className="convergence-section" ref={ref} aria-labelledby="two-title"><div className="shell">
    <div className="convergence-top"><span className="eyebrow">03 / Built by two</span><p>Different instincts.<br/>The same high standards.</p></div>
    <h2 id="two-title">Two skill sets.<br/><span>One studio.</span></h2>
    <div className="convergence-panels">
      <motion.article className="convergence-creative" style={{ x: enabled ? left : 0 }}><span>01 / The visual thinker</span><h3>CREATIVE<span>✳</span></h3><ul><li>Graphic design</li><li>Social media</li><li>Visual direction</li><li>Content strategy</li></ul></motion.article>
      <motion.article className="convergence-tech" style={{ x: enabled ? right : 0 }}><span>02 / The systems thinker</span><h3>TECH<span>&lt;/&gt;</span></h3><ul><li>Web development</li><li>Software development</li><li>Frontend</li><li>Backend</li></ul></motion.article>
      <span className="convergence-join" aria-hidden="true">×</span>
    </div>
    <motion.div className="convergence-signature" style={{ y: enabled ? wordY : 0, opacity: enabled ? wordOpacity : 1 }}><span aria-hidden="true">BuildByTwo<sup>2</sup></span><p>From the first “what if”<br/>to the final “it’s live.”</p></motion.div>
    <ButtonLink to="/about" variant="light">Meet the two</ButtonLink>
  </div></section>
}
