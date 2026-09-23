# BuildByTwo experience

The visual system pairs an orange, curved form with a cobalt geometric frame. Their alignment represents creative thinking and engineering coming together. The same pairing carries through the service cards and the built-by-two section.

## Multi-page implementation

The public site is a Vite multi-page application. Home, Services, Work, About, Contact, every included case study, the admin login, and the admin dashboard each have their own HTML document and React entry module. Navigation uses ordinary anchors, so moving between sections performs a full document request and every page can be opened or refreshed directly. Vite emits the same directory structure under `dist/`; `client/vercel.json` preserves clean trailing-slash URLs on Vercel.

## Implementation

- `client/src/sections/StudioHero.jsx`: masked headline entrance, primary actions and the interactive centerpiece.
- `client/src/components/HeroScene.jsx`: capability gate and static SVG fallback.
- `client/src/scenes/sculpture.js`: lazy-loaded Three.js scene, procedural geometry, studio lighting, pointer response and scroll alignment.
- `client/src/sections/SelectedWork.jsx`: large editorial project layouts.
- `client/src/sections/BuiltByTwo.jsx`: opposing panels converge as the section passes through the viewport.
- `client/src/components/TiltCard.jsx`, `ButtonLink.jsx`, `StudioCursor.jsx`: desktop depth, magnetic buttons and contextual cursor feedback.
- `client/src/experience.css`: responsive visual system, focus states and motion overrides.

## Performance and accessibility

Three.js loads only when the hero enters the viewport on a fine-pointer device at least 800 px wide, with no reduced-motion or save-data preference. Low-memory devices use the static composition. There are no model, particle or texture downloads. Render pixel ratio is capped at 1–1.5; lower-core devices get the lower cap. The animation loop stops offscreen and in hidden tabs. Geometry, materials, environment and the renderer are disposed on unmount.

The static composition remains visible if WebGL is unavailable. Changes to viewport width or motion preference disable the desktop effects at runtime. Mobile uses stacked content and no cursor, tilt or magnetic motion. The native pointer remains available everywhere. Reduced-motion visitors get immediate headings and static geometry. Navigation has focus indicators, an Escape-dismissable menu, a skip link and route focus handling. Scrolling uses the browser's native behaviour.

Routes are lazy-loaded. The three original PNGs remain as source files; the site serves WebP derivatives totalling approximately 548 KB instead of 7.7 MB (about 93% smaller). Regenerate with `node client/scripts/optimize-images.mjs` from the project root.

Resource lifecycle follows the [Three.js cleanup documentation](https://threejs.org/manual/pages/cleanup.html) and [renderer animation-loop API](https://threejs.org/docs/pages/WebGLRenderer.html).

## Content and live data

Portfolio examples are explicitly labelled self-initiated studio concepts with AI-generated mockups. They do not claim real clients, live applications or measured results. Replace them with commissioned projects when available. With no `VITE_API_URL`, concepts load locally without failed API requests. Set `VITE_API_URL` in `client/.env` to switch portfolio reads to the existing API; connection failures show a notice with the labelled concept collection. Contact and admin still require a configured backend and database.

No before/after comparisons, invented testimonials or performance counters were added without actual source material. Case studies include chapter navigation, full-width imagery, additional gallery images when supplied, and next-project links for the concept collection.

## Verify locally

Run `npm run dev --workspace client -- --host 127.0.0.1` and `npm run build` from the project root. Verify the hero at desktop and mobile widths; scroll past it to check `.sculpture-render[data-rendering="paused"]`. At widths below 800 px there should be no canvas or custom cursor. Check project category filters, case-study navigation, keyboard focus, and service deep links. A production Lighthouse score has not been measured.
