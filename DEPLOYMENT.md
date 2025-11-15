# Deployment Guide

This guide focuses on a clean static deployment with Netlify (or Vercel) and Supabase as the data layer.

## 🚀 Quick Deploy Options

### 1. Netlify (Recommended - Easiest)

1. Push to GitHub (if not already done):

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Deploy to Netlify:
   - Go to [netlify.com](https://netlify.com)
   - New site from Git → connect your repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

### 2. Vercel

1. Build the project: `npm run build`
2. Output directory: `dist`
3. Connect GitHub repo on Vercel and set env vars above

### 3. Railway

1. **Connect GitHub**:
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Add `DATABASE_URL` environment variable
   - Deploy automatically

### 4. Render

Not required for static hosting. If you add a custom Node API later, configure separately.

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

For any deployment platform, you'll need these environment variables:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Getting a Database URL

**Option 1: Use Supabase (Free)**

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Project Settings → API
4. Copy the Project URL and anon key

Optionally, use the SQL in `supabase/migrations/*.sql` to set up the contact_submissions table and RLS policies.

## 📝 Platform-Specific Instructions

### Local preview

1. Build: `npm run build`
2. Preview: `npm start`

### Netlify CLI (optional)

1. Install: `npm i -g netlify-cli`
2. Login: `netlify login`
3. Deploy: `netlify deploy --prod --dir=dist`

### Railway Setup

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

### Database Connection Issues

- Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set in your deploy environment
- Verify Supabase policies allow the required operations

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
