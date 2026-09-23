import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import CTASection from '../components/CTASection'
import ButtonLink from '../components/ButtonLink'
import { projectApi } from '../services/api'
import { fallbackProjects } from '../data/projects'

export default function CaseStudy() {
  const slug = window.location.pathname.split('/').filter(Boolean).at(-1)
  const [state, setState] = useState({ project: null, loading: true, error: '' })
  useEffect(() => {
    let active = true
    setState({ project: null, loading: true, error: '' })
    const concept = fallbackProjects.find(project => project.slug === slug)
    if (!import.meta.env.VITE_API_URL) {
      setState({ project: concept, loading: false, error: concept ? '' : 'We couldn’t find that project.' })
      return
    }
    projectApi.one(slug)
      .then(project => { if (active) setState({ project, loading: false, error: '' }) })
      .catch(error => { if (active) setState({ project: concept, loading: false, error: concept ? '' : error.response?.status === 404 ? 'We couldn’t find that project.' : 'This project is temporarily unavailable. Please try again later.' }) })
    return () => { active = false }
  }, [slug])
  if (state.loading) return <div className="route-loading" role="status">Loading project…</div>
  if (!state.project) return <section className="case-error"><Seo title="Project unavailable"/><h1>A little off course.</h1><p role="alert">{state.error}</p><ButtonLink to="/work/">Back to work</ButtonLink></section>
  const p = state.project
  const chapters = [
    { id: 'overview', label: 'Overview', heading: p.description },
    { id: 'problem', label: 'Problem', heading: 'Start with the right question.', text: p.challenge },
    { id: 'strategy', label: 'Strategy', heading: 'A direction with a reason.', text: p.strategy || p.solution },
    { id: 'design', label: 'Design', heading: 'Give the idea a visual language.', text: p.design || p.solution },
    ...(p.development ? [{ id: 'development', label: 'Development', heading: 'From a visual idea to a working system.', text: p.development }] : []),
    { id: 'result', label: p.concept ? 'Concept outcome' : 'Result', heading: p.results },
  ].filter(chapter => chapter.heading || chapter.text)
  const gallery = [...new Set(p.images || [])].filter(image => image !== p.thumbnail)
  const next = p.concept ? fallbackProjects[(fallbackProjects.findIndex(project => project.slug === slug) + 1) % fallbackProjects.length] : null
  return <><Seo title={p.title} description={p.shortDescription}/>
    <article className="case-study">
      <header className="case-hero shell"><a href="/work/"><ArrowLeft size={16}/> Back to work</a><span className="eyebrow">{p.category} / {p.year}</span><Reveal><h1>{p.title}</h1></Reveal><p>{p.shortDescription}</p>
        {p.concept && <p className="concept-disclosure">A self-initiated studio concept with AI-generated mockups. No commissioned client, live product or measured business results are claimed.</p>}
        <dl><div><dt>{p.concept ? 'Project type' : 'Client'}</dt><dd>{p.concept ? 'Studio exploration' : p.client}</dd></div><div><dt>Year</dt><dd>{p.year}</dd></div><div><dt>Disciplines</dt><dd>{p.services?.join(', ')}</dd></div></dl>
      </header>
      <Reveal className="case-media" mask><img src={p.thumbnail} alt={`${p.title} visual direction`} width="1536" height="1024" fetchPriority="high"/></Reveal>
      <div className="case-narrative shell">
        <nav className="case-index" aria-label="Case study chapters"><span>Inside the project</span><ol>{chapters.map((chapter,index) => <li key={chapter.id}><a href={`#${chapter.id}`}><small>0{index+1}</small>{chapter.label}</a></li>)}</ol></nav>
        <div>{chapters.map((chapter,index) => <section id={chapter.id} className="case-chapter" key={chapter.id}><Reveal><span>0{index+1} / {chapter.label}</span><h2>{chapter.heading}</h2>{chapter.text && <p>{chapter.text}</p>}</Reveal></section>)}
          {p.projectURL && <a className="btn btn-outline" href={p.projectURL} target="_blank" rel="noreferrer">Visit live project <ExternalLink size={17}/></a>}
        </div>
      </div>
      {gallery.length > 0 && <section className="case-gallery shell" aria-label="Project gallery">{gallery.map((image,index) => <Reveal key={image}><figure><img src={image} alt={`${p.title}, project detail ${index+1}`} loading="lazy" decoding="async"/></figure></Reveal>)}</section>}
      <div className="case-next shell"><span className="eyebrow">{next ? 'Keep exploring' : 'More from the studio'}</span><a href={next ? `/work/${next.slug}/` : '/work/'} data-cursor="VIEW">{next ? next.title : 'All projects'}<ArrowUpRight/></a></div>
    </article><CTASection/>
  </>
}
