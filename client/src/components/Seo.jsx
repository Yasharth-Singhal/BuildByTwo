import { Helmet } from 'react-helmet-async'
const siteUrl = 'https://buildbytwo.vercel.app'
export default function Seo({ title, description, path }) {
  const full = title ? `${title} — BuildByTwo` : 'BuildByTwo — Creative × Technology Studio'
  const summary = description || 'BuildByTwo is a two-person creative-tech studio for brands that need thoughtful design and solid development.'
  const pathname = path || (typeof window !== 'undefined' ? window.location.pathname : '/')
  const canonical = `${siteUrl}${pathname === '/' ? '/' : pathname.replace(/\/?$/, '/')}`
  const image = `${siteUrl}/og-card.png`
  const schema = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'BuildByTwo', url: siteUrl, image, description: summary, email: 'hello@buildbytwo.com', areaServed: 'Worldwide', slogan: 'Two minds. One brand. Creative meets code.', knowsAbout: ['Brand design','Graphic design','Social media strategy','Web development','MERN applications'] }
  return <Helmet><title>{full}</title><meta name="description" content={summary}/><link rel="canonical" href={canonical}/><meta property="og:title" content={full}/><meta property="og:description" content={summary}/><meta property="og:type" content="website"/><meta property="og:url" content={canonical}/><meta property="og:image" content={image}/><meta property="og:image:width" content="1200"/><meta property="og:image:height" content="630"/><meta property="og:site_name" content="BuildByTwo"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content={full}/><meta name="twitter:description" content={summary}/><meta name="twitter:image" content={image}/><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
}
