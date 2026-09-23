# BuildByTwo

A full-stack MERN website for a two-person creative and technology studio.

See [EXPERIENCE.md](EXPERIENCE.md) for the interactive design system, 3D performance gates, accessibility behaviour and visual QA notes.

## Local setup

1. Run `npm install` from this folder.
2. Copy `server/.env.example` to `server/.env` and add your MongoDB URI and JWT secret.
3. Run `npm run seed:admin --workspace server` once to create the first admin.
4. Run `npm run dev` to start the frontend and API together. The frontend is a multi-page Vite app; public routes use trailing slashes such as `/services/` and `/work/`.

The website runs at `http://localhost:5173`; the API runs at `http://localhost:5000`.

## Production

- Frontend: deploy `client` to Vercel with `VITE_API_URL` set to the deployed API URL ending in `/api`.
- API: deploy `server` to Render or Railway and set all values from `server/.env.example`.
- Database: use a MongoDB Atlas connection string for `MONGODB_URI`.
- Set `CLIENT_URL` on the API to the production frontend origin.

Cloudinary credentials are reserved in the environment template for the project image upload flow. The included admin API accepts image URLs so upload signing can be added without changing the project schema.
