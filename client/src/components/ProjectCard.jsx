import { ArrowUpRight } from 'lucide-react'
import TiltCard from './TiltCard'
import Reveal from './Reveal'

export default function ProjectCard({ project, index = 0 }) {
  return <article className={`project-card project-${index % 3}`}>
    <Reveal><a href={`/work/${project.slug}/`} data-cursor="VIEW" aria-label={`View ${project.title} case study`}>
      <TiltCard className="project-tilt"><div className="project-image">
        <img src={project.thumbnail} alt={`${project.title} — ${project.category.toLowerCase()}${project.concept ? ' concept' : ''}`} loading="lazy" decoding="async" width="1536" height="1024"/>
        <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
        {project.concept && <span className="concept-tag">Studio concept</span>}
        <div className="project-hover-info"><span>{project.services?.slice(0, 3).join(' / ')}</span><ArrowUpRight/></div>
      </div></TiltCard>
      <div className="project-meta"><div><p>{project.category} <span>—</span> {project.year}</p><h3>{project.title}<ArrowUpRight aria-hidden="true"/></h3></div><p>{project.shortDescription}</p></div>
    </a></Reveal>
  </article>
}
