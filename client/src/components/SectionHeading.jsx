import Reveal from './Reveal'
export default function SectionHeading({ eyebrow, title, copy }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><Reveal className="heading-mask"><h2>{title}</h2></Reveal>{copy && <p>{copy}</p>}</div>
}
