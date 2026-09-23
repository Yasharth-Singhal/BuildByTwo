import { PenTool, MessagesSquare, MonitorSmartphone, Combine } from 'lucide-react'
import Seo from '../components/Seo'
import ButtonLink from '../components/ButtonLink'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import TiltCard from '../components/TiltCard'

const groups = [
  { id: 'design', no: '01', icon: PenTool, title: 'Graphic design', intro: 'A visual language people remember. Thought through from the first idea to the smallest touchpoint.', items: ['Brand visual systems','Campaign concepts','Instagram creatives','Carousels & posters','Pitch decks & presentations','Marketing graphics'] },
  { id: 'social', no: '02', icon: MessagesSquare, title: 'Social media', intro: 'A content engine with a point of view, built to stay consistent.', items: ['Social media management','Content strategy','Creative direction','Content calendars','Campaign planning','Analytics & optimization'] },
  { id: 'development', no: '03', icon: MonitorSmartphone, title: 'Website development', intro: 'Fast, responsive websites and applications made for real business goals.', items: ['Landing pages','Business websites','Portfolio websites','MERN applications','Frontend & backend','Custom web solutions'] },
  { id: 'together', no: '04', icon: Combine, title: 'Creative + tech', intro: 'You bring the idea. We handle how it looks and how it works.', items: ['Strategy & positioning','Identity & visual direction','Content system','UX & interface design','Full-stack development','Launch support'] },
]
export default function Services() {
  return <><Seo title="Services" description="Brand design, social media and web development—connected by one creative-tech team."/>
    <section className="page-hero shell"><span className="eyebrow">What we do</span><Reveal><h1>One team.<br/><em>The whole build.</em></h1></Reveal><p>Choose a focused service, or bring us in from first thought to final launch.</p></section>
    <section className="service-page shell">{groups.map(({ icon: Icon, ...group }, index) =>
      <article id={group.id} className={index === 3 ? 'signature' : ''} key={group.id}>
        <Reveal><TiltCard><div className="service-detail-visual"><span className="service-index">{group.no} / {index === 3 ? 'The signature service' : 'Studio capabilities'}</span><Icon size={32}/></div><h2>{group.title}</h2><p>{group.intro}</p></TiltCard></Reveal>
        <div className="service-deliverables"><ul>{group.items.map(item => <li key={item}>{item}<span aria-hidden="true">↗</span></li>)}</ul><ButtonLink to="/contact" variant={index === 3 ? 'light' : 'text'}>Discuss your project</ButtonLink></div>
      </article>
    )}</section><CTASection/>
  </>
}
