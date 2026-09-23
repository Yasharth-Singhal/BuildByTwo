import coffee from '../assets/coffee-campaign.webp'
import wellness from '../assets/wellness-platform.webp'
import culture from '../assets/culture-campaign.webp'

// Clearly identified, self-initiated examples until real portfolio records are connected.
export const fallbackProjects = [
  {
    _id: '1', slug: 'brighter-days-coffee', title: 'Brighter Days', category: 'Brand Design',
    shortDescription: 'A bright, tactile identity for a new kind of coffee ritual.',
    description: 'An optimistic identity system for an imagined specialty coffee brand.',
    thumbnail: coffee, images: [coffee], year: '2026', concept: true, featured: true,
    services: ['Strategy', 'Brand identity', 'Packaging'],
    challenge: 'How could an everyday coffee ritual feel distinctive enough to become a brand people remember?',
    strategy: 'Build the direction around a brighter start to the day: direct language, tactile materials and a colour people can recognise from across a room.',
    design: 'Cobalt packaging, generous cream space and warm orange marks establish a visual system that could extend from a coffee bag to a social post.',
    solution: 'A confident cobalt system, direct typography and handmade orange marks bring warmth to a structured identity.',
    results: 'A visual exploration of packaging, print and a recognisable brand language.',
  },
  {
    _id: '2', slug: 'luma-wellness', title: 'Luma', category: 'Web Development',
    shortDescription: 'A calmer way to imagine everyday wellbeing.',
    description: 'A digital product concept that makes daily wellbeing signals easier to understand.',
    thumbnail: wellness, images: [wellness], year: '2026', concept: true, featured: true,
    services: ['UX/UI', 'Frontend direction', 'Product strategy'],
    challenge: 'How can a wellness interface turn a collection of metrics into a clear, approachable daily picture?',
    strategy: 'Prioritise an at-a-glance summary, then progressively reveal the details. Every view should answer one useful question.',
    design: 'A warm, spacious interface pairs simple data views with a calm editorial hierarchy across desktop and mobile mockups.',
    development: 'The proposed implementation would separate reusable dashboard components from the data layer, with responsive layouts and accessible chart summaries. This exploration is a visual concept, not a deployed application.',
    solution: 'A dashboard concept with clear hierarchy, warm editorial type and focused data views.',
    results: 'A direction for a responsive wellness product, ready for further research and prototyping.',
  },
  {
    _id: '3', slug: 'common-ground', title: 'Common Ground', category: 'Social Media',
    shortDescription: 'A visual meeting point for people, ideas and sound.',
    description: 'A campaign concept for an imagined independent culture festival.',
    thumbnail: culture, images: [culture], year: '2026', concept: true, featured: true,
    services: ['Creative direction', 'Campaign design', 'Social content'],
    challenge: 'How could one campaign hold music, art and conversation together without losing its energy?',
    strategy: 'Use a modular language that changes its content while retaining the same rhythm, palette and unmistakable voice.',
    design: 'Halftone imagery, expressive typography and spontaneous marks explore how the same system could move between printed posters and social cards.',
    solution: 'A modular poster language combines halftone imagery, bold typography and spontaneous graphic gestures.',
    results: 'An adaptable visual direction for announcements, artist stories and event communications.',
  },
]
