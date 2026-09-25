import axios from 'axios'

export const apiConfigured = Boolean(import.meta.env.VITE_API_URL)
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : undefined), timeout: 10000 })
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('bbt_admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
export const projectApi = {
  all: () => api.get('/projects').then(r => r.data),
  featured: () => api.get('/projects/featured').then(r => r.data),
  one: (slug) => api.get(`/projects/${slug}`).then(r => r.data),
}
export const contactApi = { submit: (data) => api.post('/contact', data).then(r => r.data) }
export const adminApi = {
  login: (data) => api.post('/admin/login', data).then(r => r.data),
  stats: () => api.get('/admin/stats').then(r => r.data),
  projects: () => api.get('/admin/projects').then(r => r.data),
  createProject: (data) => api.post('/admin/projects', data).then(r => r.data),
  updateProject: (id,data) => api.put(`/admin/projects/${id}`, data).then(r => r.data),
  deleteProject: (id) => api.delete(`/admin/projects/${id}`).then(r => r.data),
  enquiries: () => api.get('/admin/enquiries').then(r => r.data),
  updateStatus: (id,status) => api.patch(`/admin/enquiries/${id}/status`, { status }).then(r => r.data),
}
export default api
