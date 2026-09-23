import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import ButtonLink from '../components/ButtonLink'
import useProjects from '../hooks/useProjects'

export default function SelectedWork() {
  const { projects, loading, error, isConcept } = useProjects(true)
  return <section className="selected-editorial section" id="selected-work"><div className="shell">
    <SectionHeading eyebrow={isConcept ? '01 / Studio explorations' : '01 / Selected work'} title={<>Ideas, out<br/>in the world.</>} copy="A look at identities, campaigns and digital experiences through our lens."/>
    {error && <p className="portfolio-notice" role="status">{error}</p>}
    <div className="editorial-projects">
      {loading ? <div className="project-skeleton" role="status" aria-label="Loading projects"/> : projects.map((project, index) => <ProjectCard project={project} index={index} key={project._id}/>)}
      {!loading && !projects.length && <p>New work is on its way. Tell us what you have in mind.</p>}
    </div>
    <div className="work-endnote"><span>Thoughtfully designed. Carefully built.</span><ButtonLink to="/work" variant="outline">Explore all work</ButtonLink></div>
  </div></section>
}
