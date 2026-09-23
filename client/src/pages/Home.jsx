import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import CTASection from '../components/CTASection'
import StudioHero from '../sections/StudioHero'
import SelectedWork from '../sections/SelectedWork'
import StudioServices from '../sections/StudioServices'
import BuiltByTwo from '../sections/BuiltByTwo'

const steps = [
  ['Discover', 'Your world, your audience, your ambition.'],
  ['Strategize', 'A shared direction before a single pixel.'],
  ['Design', 'Ideas made tangible, tested and refined.'],
  ['Build', 'Thoughtful engineering behind every detail.'],
  ['Launch', 'Test, tune and put it into the world.'],
  ['Grow', 'Learn from real people. Keep improving.'],
]

export default function Home() {
  return <><Seo/><StudioHero/>
    <section className="studio-note shell"><span className="eyebrow">The short version</span><Reveal><p>Creative thinking.<br/>Technical follow-through.<br/><span>Nothing lost in translation.</span></p></Reveal><div>We’re a two-person studio connecting design, content and development. You work directly with the people bringing your idea to life.</div></section>
    <SelectedWork/><StudioServices/><BuiltByTwo/>
    <section className="why section"><div className="shell why-grid"><div><span className="eyebrow">04 / A closer partnership</span><h2>Fewer handoffs.<br/>Better ideas.</h2><p>You talk directly to the people designing and building your project. From the first conversation to the last detail.</p></div><div className="benefits">{['Design and development, together from the start','Direct conversations. Clear decisions.','Strategy before aesthetics','More attention to the details that matter'].map((item, index) => <Reveal key={item}><span>0{index + 1}</span><h3>{item}</h3></Reveal>)}</div></div></section>
    <section className="process studio-process section"><div className="shell"><SectionHeading eyebrow="05 / The way we work" title={<>Good things<br/>take a process.</>} copy="A clear path from the idea in your head to something people can use."/><div className="process-steps">{steps.map(([title, copy], index) => <Reveal key={title} delay={index * 0.035}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}</div></div></section>
    <CTASection/>
  </>
}
