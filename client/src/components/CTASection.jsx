import Reveal from './Reveal'
import ButtonLink from './ButtonLink'
export default function CTASection() {
  return <section className="cta-section studio-cta"><div className="shell">
    <div className="cta-topline"><span className="eyebrow">Your next chapter starts here</span><span>Creative × Technology</span></div>
    <Reveal><p>Have an idea?</p><h2>Let’s make<br/>something <em>matter.</em></h2></Reveal>
    <div className="cta-bottomline"><ButtonLink to="/contact" variant="light">Start your project</ButtonLink><p>One conversation.<br/>Two fresh perspectives.</p><span aria-hidden="true" className="cta-union">×</span></div>
  </div></section>
}
