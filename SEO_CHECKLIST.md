# 🎯 SEO Quick Checklist for gulabportfollio.me

## Immediate Actions (Do Before First Deploy)

### 1. Google Search Console Setup

- [ ] Visit https://search.google.com/search-console
- [ ] Add property: `gulabportfollio.me`
- [ ] Choose "HTML tag" verification
- [ ] Copy verification code
- [ ] Replace `YOUR_GOOGLE_VERIFICATION_CODE` in `client/index.html` (line 21)
- [ ] Deploy site
- [ ] Click "Verify" in Google Search Console

### 2. Submit Sitemap

- [ ] In Google Search Console → Sitemaps
- [ ] Submit: `https://www.gulabportfollio.me/sitemap.xml`
- [ ] Wait for processing (usually 5-10 minutes)

### 3. Request Indexing

- [ ] Use "URL Inspection" tool in GSC
- [ ] Enter: `https://www.gulabportfollio.me/`
- [ ] Click "Request Indexing"
- [ ] Expect crawling within 24-48 hours

### 4. Update Social Links (Optional but Recommended)

- [ ] Update LinkedIn URL in `client/index.html` (line 158)
- [ ] Update Twitter handle in `client/index.html` (line 159, 73)
- [ ] Add real phone number if you want (line 138)

### 5. Generate OG Image

- [ ] Open `og-image-template.html` in browser
- [ ] Screenshot at 1200x630px
- [ ] Save as `og-image.jpg` in `client/public/`
- [ ] Update OG image path in index.html if needed

### 6. Deploy

```powershell
npm run build
# Then deploy to your hosting
```

## Verification Tests (After Deploy)

### Within 1 Hour

- [ ] Check robots.txt: `https://gulabportfollio.me/robots.txt`
- [ ] Check sitemap: `https://gulabportfollio.me/sitemap.xml`
- [ ] Test mobile friendly: https://search.google.com/test/mobile-friendly
- [ ] Test PageSpeed: https://pagespeed.web.dev/

### Within 24-48 Hours

- [ ] Check GSC "Coverage" for crawl status
- [ ] Verify no errors in GSC
- [ ] Check "Performance" tab starts showing data

### Within 7 Days

- [ ] Search Google: `site:gulabportfollio.me`
- [ ] Should see at least homepage indexed
- [ ] Search: `Md Gulab portfolio`
- [ ] Your site should appear

### Within 30 Days

- [ ] Check GSC "Performance" for impressions/clicks
- [ ] Monitor Core Web Vitals
- [ ] Check average position for target keywords

## Promotion Checklist

### Share Your Portfolio

- [ ] Add to GitHub profile README
- [ ] Post on LinkedIn with #webdevelopment #portfolio
- [ ] Share on Twitter/X
- [ ] Add to dev.to profile
- [ ] Add to Hashnode profile
- [ ] Share in relevant Discord/Slack communities
- [ ] Add to your email signature

### Get Backlinks

- [ ] Link from GitHub repositories (in README)
- [ ] Write blog posts and link to portfolio
- [ ] Comment on relevant articles with portfolio link
- [ ] Add to online directories (dev.to, etc.)
- [ ] Add to your resume/CV with clickable link

## Monthly Maintenance

- [ ] Check Google Search Console for errors
- [ ] Update content (add new projects)
- [ ] Check Core Web Vitals scores
- [ ] Monitor ranking for target keywords
- [ ] Update sitemap if you add pages

## Target Keywords to Monitor

1. `Md Gulab portfolio`
2. `Gulab developer`
3. `Full stack developer India`
4. `MERN stack developer`
5. `React Node.js developer`

## Success Metrics

**Week 1:**

- ✓ Site crawled by Google
- ✓ No errors in GSC

**Month 1:**

- ✓ Homepage indexed
- ✓ Appearing for branded searches
- ✓ 10+ impressions/week

**Month 3:**

- ✓ Ranking in top 10 for branded terms
- ✓ 100+ impressions/week
- ✓ 5+ clicks/week

**Month 6:**

- ✓ Ranking for generic keywords
- ✓ 500+ impressions/week
- ✓ 20+ clicks/week

---

**Need help?** See `SEO_SETUP_GUIDE.md` for detailed instructions.

**Last Updated:** November 19, 2025
