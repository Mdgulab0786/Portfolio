import { writeFileSync } from "fs";

// Enhanced sitemap generator for better SEO
const domain = "https://www.gulabportfollio.me";
const now = new Date().toISOString();

// Define routes with priority and change frequency
const routes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/#about", priority: "0.9", changefreq: "monthly" },
  { path: "/#projects", priority: "0.9", changefreq: "weekly" },
  { path: "/#skills", priority: "0.8", changefreq: "monthly" },
  { path: "/#certifications", priority: "0.7", changefreq: "yearly" },
  { path: "/#contact", priority: "0.8", changefreq: "monthly" },
];

const urlEntries = routes
  .map(({ path, priority, changefreq }) => {
    // For hash fragments, use base URL since search engines treat them client-side
    const loc = path.includes("#") ? domain + "/" : domain + path;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`;

writeFileSync("client/public/sitemap.xml", xml);
console.log("✓ Enhanced sitemap generated: client/public/sitemap.xml");
console.log(`  ${routes.length} URLs with priority and changefreq metadata`);
