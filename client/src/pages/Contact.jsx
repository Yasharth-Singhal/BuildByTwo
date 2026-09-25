import { useState } from 'react'
import { CheckCircle2, Mail } from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import { apiConfigured, contactApi } from '../services/api'

const initial = { name:'', email:'', company:'', phone:'', service:'', budget:'', timeline:'', message:'', website:'' }

function emailDraft(form) {
  const subject = encodeURIComponent(`Project enquiry from ${form.name}${form.company ? ` — ${form.company}` : ''}`)
  const body = encodeURIComponent([
    `Name: ${form.name}`, `Email: ${form.email}`, `Company: ${form.company || '—'}`, `Phone: ${form.phone || '—'}`,
    `Service: ${form.service}`, `Budget: ${form.budget}`, `Timeline: ${form.timeline}`, '', form.message,
  ].join('\n'))
  return `mailto:hello@buildbytwo.com?subject=${subject}&body=${body}`
}

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [state, setState] = useState('idle')
  const [error, setError] = useState('')
  const update = field => event => setForm({ ...form, [field]: event.target.value })
  const submit = async event => {
    event.preventDefault(); setState('loading'); setError('')
    if (!apiConfigured) { window.location.href = emailDraft(form); setState('email'); return }
    try { await contactApi.submit(form); setState('success'); setForm(initial) }
    catch (err) { setState('error'); setError(err.response?.data?.message || 'We couldn’t send this right now. Please email us directly.') }
  }
  const completed = state === 'success' || state === 'email'
  return <><Seo title="Contact" description="Tell BuildByTwo what you’re building and start a project."/>
    <section className="contact-page shell">
      <Reveal className="contact-intro"><span className="eyebrow">Start a project</span><h1>Tell us what<br/>you’re <em>building.</em></h1><p>A rough idea is enough. Tell us where you are, where you want to go, and we’ll reply within two working days.</p><a href="mailto:hello@buildbytwo.com">hello@buildbytwo.com ↗</a></Reveal>
      {completed ? <div className="form-success">{state === 'email' ? <Mail/> : <CheckCircle2/>}<h2>{state === 'email' ? 'Draft ready.' : 'Message sent.'}</h2><p>{state === 'email' ? 'Your email app should be open with the project details filled in. Review it and press send to complete your enquiry.' : 'Thanks for thinking of us. We’ll read everything and get back to you soon.'}</p><button onClick={() => setState('idle')}>Back to the form</button></div>
      : <form className="contact-form" onSubmit={submit}>
        {!apiConfigured && <p className="form-mode">The secure enquiry API is being connected. For now, submitting opens a pre-filled email draft—nothing is sent until you approve it.</p>}
        <input className="hp" tabIndex="-1" autoComplete="off" name="website" value={form.website} onChange={update('website')}/>
        <div className="field-row"><label>Name *<input required value={form.name} onChange={update('name')} placeholder="Your name"/></label><label>Email *<input required type="email" value={form.email} onChange={update('email')} placeholder="you@company.com"/></label></div>
        <div className="field-row"><label>Company / brand<input value={form.company} onChange={update('company')} placeholder="What should we call it?"/></label><label>Phone <small>optional</small><input value={form.phone} onChange={update('phone')} placeholder="+91…"/></label></div>
        <div className="field-row"><label>Service needed *<select required value={form.service} onChange={update('service')}><option value="">Choose a service</option>{['Graphic Design','Social Media','Website Development','Branding','Creative + Tech','Other'].map(x=><option key={x}>{x}</option>)}</select></label><label>Budget *<select required value={form.budget} onChange={update('budget')}><option value="">Choose a range</option>{['Let’s discuss','Under ₹10K','₹10K–₹25K','₹25K–₹50K','₹50K–₹1L','₹1L+'].map(x=><option key={x}>{x}</option>)}</select></label></div>
        <label>Timeline *<select required value={form.timeline} onChange={update('timeline')}><option value="">When do you want to begin?</option>{['ASAP','2–4 weeks','1–2 months','3+ months','Flexible'].map(x=><option key={x}>{x}</option>)}</select></label>
        <label>Tell us about the project *<textarea required minLength="20" value={form.message} onChange={update('message')} placeholder="What are you making, and what would a great outcome look like?"/></label>
        {error && <p className="form-error" role="alert">{error}</p>}<button className="submit-btn" disabled={state === 'loading'}>{state === 'loading' ? 'Sending…' : apiConfigured ? 'Send project ↗' : 'Continue in email ↗'}</button>
      </form>}
    </section>
  </>
}
