import { ArrowUpRight, PenTool, Braces, PanelsTopLeft } from 'lucide-react'
import TiltCard from '../components/TiltCard'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

const services = [
  { number: '01', name: 'Design', icon: PenTool, type: 'design', title: 'A point of view.\nMade visible.', copy: 'Brand systems, identities and visual stories that make you unmistakable.', tags: ['Brand identity', 'Graphic design', 'Art direction'] },
  { number: '02', name: 'Development', icon: Braces, type: 'development', title: 'Looks considered.\nWorks beautifully.', copy: 'Thoughtful websites and applications, engineered around the people using them.', tags: ['Websites', 'MERN applications', 'UI/UX'] },
  { number: '03', name: 'Social', icon: PanelsTopLeft, type: 'social', title: 'Less noise.\nMore connection.', copy: 'A consistent voice and a content system that gives your audience a reason to stay.', tags: ['Content strategy', 'Social media', 'Campaigns'] },
]

export default function StudioServices() {
  return <section className="studio-services section"><div className="shell">
    <SectionHeading eyebrow="02 / What we bring" title={<>Good looks.<br/>Great thinking.</>} copy="One connected team for how your brand looks, sounds and works."/>
    <div className="depth-service-grid">{services.map(({ number, name, icon: Icon, type, title, copy, tags }, index) =>
      <Reveal key={name} delay={index * 0.07}><TiltCard className={`depth-service service-${type}`}>
        <div className="service-kicker"><span>{number} / {name}</span><Icon size={19}/></div>
        <div className={`service-symbol symbol-${type}`} aria-hidden="true">{type === 'design' ? <span>Aa<span>✳</span></span> : type === 'development' ? <span><b>[</b><i> / </i><b>]</b></span> : <span><i/><i/><i/></span>}</div>
        <h3>{title}</h3><p>{copy}</p><ul>{tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        <a href={`/services/#${type}`} className="service-card-link">Explore {name.toLowerCase()}<ArrowUpRight size={20}/></a>
      </TiltCard></Reveal>
    )}</div>
    <div className="whole-studio"><span className="whole-mark" aria-hidden="true">×</span><div><h3>Or, build the whole thing.</h3><p>Strategy + design + content + development. Together from day one.</p></div><a href="/contact/" data-cursor="LET’S BUILD">Let’s talk <ArrowUpRight size={20}/></a></div>
  </div></section>
}
