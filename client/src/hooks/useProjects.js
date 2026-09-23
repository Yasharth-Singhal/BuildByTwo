import { useEffect, useState } from 'react'
import { projectApi } from '../services/api'
import { fallbackProjects } from '../data/projects'

const apiConfigured = Boolean(import.meta.env.VITE_API_URL)
export default function useProjects(featured = false) {
  const [projects, setProjects] = useState(apiConfigured ? [] : fallbackProjects)
  const [loading, setLoading] = useState(apiConfigured)
  const [error, setError] = useState('')
  useEffect(() => {
    if (!apiConfigured) return
    let active = true
    setLoading(true)
    ;(featured ? projectApi.featured() : projectApi.all())
      .then(items => { if (active) { setProjects(items); setError('') } })
      .catch(() => { if (active) { setProjects(fallbackProjects); setError('Live projects are temporarily unavailable. Explore our studio concepts below.') } })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [featured])
  return { projects: featured ? projects.filter(p => p.featured) : projects, loading, error, isConcept: !apiConfigured || Boolean(error) }
}
