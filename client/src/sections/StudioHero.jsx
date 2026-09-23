import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import HeroScene from '../components/HeroScene'
import ButtonLink from '../components/ButtonLink'

export default function StudioHero() {
  const reduced = useReducedMotion()
  return <section className="experience-hero" aria-labelledby="hero-title">
    <div className="shell hero-topline"><span className="eyebrow">Independent creative & technology studio</span><span className="hero-edition">Two minds. One shared vision.</span></div>
    <div className="shell experience-hero-grid">
      <div className="hero-editorial">
        <h1 id="hero-title" aria-label="Creative meets code.">
          {['Creative', 'meets', 'code.'].map((word, index) => <span className={`hero-line line-${index}`} key={word} aria-hidden="true">
            <motion.span initial={reduced ? false : { y: '105%', rotate: 3 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 0.85, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}>{word}{index === 1 && <i>×</i>}</motion.span>
          </span>)}
        </h1>
        <p className="hero-manifesto">Two minds building brands that look different and digital experiences that work beautifully.</p>
        <div className="button-row"><ButtonLink to="/contact">Start a project</ButtonLink><ButtonLink to="/work" variant="text">Explore our work</ButtonLink></div>
      </div>
      <HeroScene/>
    </div>
    <div className="shell hero-bottomline"><a href="#selected-work" className="scroll-cue"><ArrowDown size={16}/> A little further, a lot more</a><span>Design with intent. Build with care.</span><span className="hero-index">01 — 02</span></div>
    <div className="expertise-strip" aria-label="Brand design, social media, web development"><div className="shell"><span>Brand design</span><i>×</i><span>Social media</span><i>×</i><span>Web development</span><i>×</i><span>Creative direction</span></div></div>
  </section>
}
