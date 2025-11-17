import { writeFileSync } from "fs";

// Basic sitemap generator for static SPA routes
const domain = "https://www.gulabportfollio.me";
const now = new Date().toISOString();

// Add routes you want indexed
// Admin/login intentionally omitted
const routes = ["/", "#about", "#projects", "#skills", "#contact"];

const urlEntries = routes
  .map((r) => {
    // Convert hash sections to base URL for sitemap (search engines treat fragments client-side)
    const loc = r.startsWith("#") ? `${domain}/` : `${domain}${r}`;
    return `<url><loc>${loc}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>${
      r === "/" ? "1.0" : "0.6"
    }</priority></url>`;
  })
  .join("\n");

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`;

writeFileSync("client/public/sitemap.xml", xml);
console.log("Sitemap generated: client/public/sitemap.xml");
