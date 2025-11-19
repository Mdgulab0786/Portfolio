import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * SEO Validation Script
 * Run this to check if all SEO elements are present in your built HTML
 */

const htmlPath = resolve("dist/index.html");
const html = readFileSync(htmlPath, "utf-8");

console.log("\n🔍 SEO Validation Report\n");
console.log("=".repeat(50));

const checks = [
  {
    name: "Title Tag",
    test: () => /<title>(.+?)<\/title>/.test(html),
    extract: () => html.match(/<title>(.+?)<\/title>/)?.[1],
  },
  {
    name: "Meta Description",
    test: () => /<meta\s+name="description"\s+content=/.test(html),
    extract: () =>
      html.match(/name="description"\s+content="([^"]+)"/)?.[1]?.slice(0, 80) +
      "...",
  },
  {
    name: "Canonical URL",
    test: () => /<link\s+rel="canonical"/.test(html),
    extract: () => html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/)?.[1],
  },
  {
    name: "Robots Meta",
    test: () => /<meta\s+name="robots"/.test(html),
    extract: () => html.match(/name="robots"\s+content="([^"]+)"/)?.[1],
  },
  {
    name: "Open Graph Title",
    test: () => /<meta\s+property="og:title"/.test(html),
    extract: () => html.match(/property="og:title"\s+content="([^"]+)"/)?.[1],
  },
  {
    name: "Open Graph Image",
    test: () => /<meta\s+property="og:image"/.test(html),
    extract: () => html.match(/property="og:image"\s+content="([^"]+)"/)?.[1],
  },
  {
    name: "Twitter Card",
    test: () => /<meta\s+name="twitter:card"/.test(html),
    extract: () => html.match(/name="twitter:card"\s+content="([^"]+)"/)?.[1],
  },
  {
    name: "JSON-LD Structured Data",
    test: () => /<script\s+type="application\/ld\+json">/.test(html),
    extract: () => {
      const match = html.match(
        /<script\s+type="application\/ld\+json">\s*({[\s\S]+?})\s*<\/script>/
      );
      if (match) {
        try {
          const json = JSON.parse(match[1]);
          return `Found ${json["@graph"]?.length || 1} schema items`;
        } catch {
          return "Invalid JSON-LD";
        }
      }
      return null;
    },
  },
  {
    name: "Preconnect Resources",
    test: () => /<link\s+rel="preconnect"/.test(html),
    extract: () => {
      const matches = html.match(/<link\s+rel="preconnect"\s+href="([^"]+)"/g);
      return matches ? `${matches.length} resources` : null;
    },
  },
  {
    name: "Favicon",
    test: () => /<link\s+rel="icon"/.test(html),
    extract: () => html.match(/<link\s+rel="icon"[^>]+href="([^"]+)"/)?.[1],
  },
];

let passed = 0;
let failed = 0;

checks.forEach(({ name, test, extract }) => {
  const result = test();
  const value = extract ? extract() : null;

  if (result) {
    console.log(`✓ ${name}`);
    if (value) {
      console.log(`  → ${value}`);
    }
    passed++;
  } else {
    console.log(`✗ ${name} - MISSING`);
    failed++;
  }
  console.log();
});

console.log("=".repeat(50));
console.log(`\nResults: ${passed} passed, ${failed} failed\n`);

// Additional checks
console.log("📊 Additional Metrics\n");
console.log("=".repeat(50));

const htmlSize = (html.length / 1024).toFixed(2);
console.log(`✓ HTML Size: ${htmlSize} KB`);

const metaCount = (html.match(/<meta/g) || []).length;
console.log(`✓ Meta Tags: ${metaCount}`);

const linkCount = (html.match(/<link/g) || []).length;
console.log(`✓ Link Tags: ${linkCount}`);

const schemaScripts = (
  html.match(/<script\s+type="application\/ld\+json">/g) || []
).length;
console.log(`✓ JSON-LD Schemas: ${schemaScripts}`);

console.log("\n" + "=".repeat(50));

if (failed === 0) {
  console.log(
    "\n✅ All SEO checks passed! Your site is ready for search engines.\n"
  );
} else {
  console.log(`\n⚠️  ${failed} SEO issue(s) found. Please review and fix.\n`);
  process.exit(1);
}
