import { useState } from 'react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import ProjectCard from '../components/ProjectCard'
import CTASection from '../components/CTASection'
import useProjects from '../hooks/useProjects'

const filters = ['All','Design','Social Media','Branding','Web Development','UI/UX']
function matches(project, filter) {
  const value = [project.category, ...(project.services || [])].join(' ').toLowerCase()
  const terms = { Design: /design|identity|graphic|creative/, Branding: /brand|identity|packaging/, 'Social Media': /social|campaign|content/, 'Web Development': /web|mern|frontend|development/, 'UI/UX': /ux|ui|interface/ }
  return filter === 'All' || terms[filter].test(value)
}
export default function Work() {
  const [active, setActive] = useState('All')
  const { projects, loading, error, isConcept } = useProjects()
  const shown = projects.filter(project => matches(project, active))
  return <><Seo title="Work" description="Explore brand, campaign and digital product concepts by BuildByTwo."/>
    <section className="page-hero shell"><span className="eyebrow">{isConcept ? 'Studio explorations' : 'Selected projects'}</span><Reveal><h1>Thought through.<br/><em>Made tangible.</em></h1></Reveal><p>Identities, campaigns and digital experiences. Different expressions of the same connected thinking.</p>{isConcept && <p className="concept-disclosure">Self-initiated concepts with AI-generated mockups. A look at our creative direction, not commissioned client projects.</p>}</section>
    <section className="work-page shell"><div className="filters" role="group" aria-label="Filter projects">{filters.map(filter => <button aria-pressed={active === filter} className={active === filter ? 'active' : ''} onClick={() => setActive(filter)} key={filter}>{filter}</button>)}</div>
      {error && <p className="portfolio-notice" role="status">{error}</p>}
      <p className="sr-only" role="status">{loading ? 'Loading projects' : `${shown.length} projects shown`}</p>
      <div className="editorial-projects" key={active}>{loading ? <div className="project-skeleton" aria-label="Loading projects"/> : shown.length ? shown.map((project,index) => <ProjectCard project={project} index={index} key={project._id}/>) : <div className="empty-state"><h2>Nothing here yet.</h2><p>We’re still preparing work in this category.</p></div>}</div>
    </section><CTASection/>
  </>
}
