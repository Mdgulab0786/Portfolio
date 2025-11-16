# Portfolio Website

A modern, responsive personal portfolio website built with React, TypeScript, Tailwind, and an Express + MongoDB Atlas API for contact submissions.

## Features

- 🎨 Modern, responsive design with dark/light mode
- 🚀 Built with React 18 and TypeScript
- 💅 Styled with Tailwind CSS and Radix UI components
- 📱 Mobile-first responsive design
- ⚡ Fast development with Vite
- 🗄️ Express API + MongoDB Atlas for contact form storage
- 📧 Working contact form with database storage
- 🎭 Smooth animations and transitions
- 🌙 Dark/light theme toggle

## Tech Stack

### Frontend

- React 18 with TypeScript
- Tailwind CSS for styling
- Radix UI for accessible components
- Framer Motion for animations
- React Query for state management
- Wouter for routing

### Data layer

- Express (Node.js) REST API
- MongoDB Atlas (via Mongoose)

### Development

- Vite for build tooling
- Tailwind CSS + Shadcn UI

## Getting Started

### Prerequisites

- Node.js 18 or higher
- MongoDB Atlas cluster (free tier works)

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd portfolio-website
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
# Copy the example env file (Windows)
copy .env.example .env

# Client env (Vite): set API base URL
VITE_API_BASE_URL=http://localhost:4000

# Then set up and run the API server (in ./server):
# 1) cd server; npm install
# 2) copy .env.example .env and fill MONGODB_URI, ADMIN creds, JWT_SECRET
# 3) npm run dev
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (Vite default)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` or `npm start` - Preview the production build locally

## Project Structure

```
├── client/                 # React app (Vite root)
│   ├── public/             # Static assets (copied as-is)
│   └── src/
│       ├── components/     # UI components
│       ├── hooks/          # Custom React hooks
│       ├── lib/            # Supabase client, utilities
│       ├── pages/          # Route components
│       └── index.css       # Tailwind base/styles
├── supabase/               # Optional SQL migrations for Supabase
├── netlify.toml            # Netlify SPA config
├── vite.config.ts          # Vite config (root=client, outDir=dist)
└── package.json            # Scripts and dependencies
```

## Deployment

### Netlify (Recommended)

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add env var: `VITE_API_BASE_URL` (point to your API server)

### Vercel

If you prefer Vercel for static hosting:

- Build command: `npm run build`
- Output directory: `dist`
- Add env vars as above

### Railway/Render

1. Connect your GitHub repository
2. Add environment variables
3. Use the start script: `npm run start`

## Environment Variables

```bash
VITE_API_BASE_URL=http://localhost:4000
```

## Features Overview

### Contact Form

- Client-side validation
- Stores submissions via Express API in MongoDB Atlas
- Real-time updates for Admin dashboard
- Toast notifications for user feedback

### Theme System

- Automatic system theme detection
- Manual light/dark mode toggle
- Consistent theme across all components
- CSS variables for easy customization

### Responsive Design

- Mobile-first approach
- Smooth scrolling navigation
- Animated skill progress bars
- Interactive project showcase

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and checks
5. Submit a pull request

## License

MIT License - feel free to use this project for your own portfolio!

## Contact

- Email: team66415@gmail.com
- GitHub: https://github.com/Mdgulab0786
- LinkedIn: https://www.linkedin.com/in/md-gulab-team66/
