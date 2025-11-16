# Deployment Guide

This guide shows a single-deploy setup where one Node app serves both the API and the built React app (no separate platforms).

## 🚀 Quick Deploy Options

### Option A: Render (single Web Service)

1. Push to GitHub (if not already done):

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Create a Web Service on [render.com](https://render.com) from this repo.
   - Build Command: `npm run build:full`
   - Start Command: `npm run start:server`
   - Environment variables:
     - `MONGODB_URI`
     - `JWT_SECRET`
     - `ADMIN_EMAIL`
     - `ADMIN_PASSWORD_HASH`
   - (Optional) `CLIENT_ORIGIN` not required since client is served by the same server

### Option B: Railway (single service)

1. Create a new service from GitHub on [Railway](https://railway.app)
2. In service settings:
   - Build: `npm run build:full`
   - Start: `npm run start:server`
   - Add env: `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`

### Option C: Docker (any platform)

1. **Connect GitHub**:
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
     Build and run the single container:

```powershell
docker build -t portfolio-unified .
docker run -p 8080:8080 -e MONGODB_URI=YOUR_URI -e JWT_SECRET=YOUR_SECRET -e ADMIN_EMAIL=you@example.com -e ADMIN_PASSWORD_HASH=... portfolio-unified
```

Visit: `http://localhost:8080`

Note: The unified server serves the SPA from `/dist` and APIs from `/api/*`.

## 🛠️ Manual GitHub Setup

If you need to set up GitHub manually:

```bash
git init
git add .
git commit -m "Initial portfolio website commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## 🔧 Environment Variables

For the unified deploy, you only need server-side env:

```bash
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=$2a$...
```

### Getting a Database URL

Provision MongoDB Atlas:

1. Go to https://www.mongodb.com/atlas and create a free cluster
2. Create a database and user; allow your server's IP (or 0.0.0.0/0 for testing)
3. Set `MONGODB_URI` in the server environment

## 📝 Platform-Specific Instructions

### Local preview (unified)

1. Build client + server: `npm run build:full`
2. Start server (serves frontend and API): `npm run start:server`
3. Open `http://localhost:4000`

### Netlify CLI (optional, client)

1. Install: `npm i -g netlify-cli`
2. Login: `netlify login`
3. Deploy: `netlify deploy --prod --dir=dist`

### Railway Setup (API)

1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Deploy: `railway up`

## 🔄 Automated Deployment

You can add CI later to run type checks and build automatically.

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### API/Database Connection Issues

- Ensure the API has `MONGODB_URI`, `JWT_SECRET`, admin creds configured
- Verify CORS `CLIENT_ORIGIN` matches your client domain
- Confirm the client `VITE_API_BASE_URL` points to the API

### Port Issues

- Most platforms automatically assign ports
  This is a static SPA; Vite preview runs on localhost only. Hosting provider handles ports.

## 📊 Post-Deployment

After successful deployment:

1. Test the contact form
2. Verify dark/light mode toggle
3. Check mobile responsiveness
4. Test all navigation links
5. Confirm database connectivity

## 🔗 Custom Domain

To add a custom domain:

1. **Vercel**: Project Settings → Domains
2. **Netlify**: Site Settings → Domain Management
3. **Railway**: Project Settings → Domains
4. **Render**: Dashboard → Custom Domains

## 📈 Analytics (Optional)

Add analytics to track visitors:

1. **Google Analytics**: Add tracking code to `index.html`
2. **Vercel Analytics**: Enable in project settings
3. **Netlify Analytics**: Enable in site settings

## 🔒 Security Headers

The deployment includes basic security configurations. For production:

- Enable HTTPS (automatic on most platforms)
- Set up proper CORS headers
- Configure CSP headers if needed

## 📱 Performance

The website is optimized for performance:

- Static assets are cached
- Images are optimized
- CSS and JS are minified
- Gzip compression enabled
