import { useEffect } from "react";

/**
 * BreadcrumbSchema - Adds structured data for site navigation
 * Improves how Google displays your site in search results
 */
export function BreadcrumbSchema() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.gulabportfollio.me/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: "https://www.gulabportfollio.me/#about",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Projects",
          item: "https://www.gulabportfollio.me/#projects",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Skills",
          item: "https://www.gulabportfollio.me/#skills",
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Certifications",
          item: "https://www.gulabportfollio.me/#certifications",
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "Contact",
          item: "https://www.gulabportfollio.me/#contact",
        },
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    script.id = "breadcrumb-schema";

    // Remove existing if present
    const existing = document.getElementById("breadcrumb-schema");
    if (existing) {
      existing.remove();
    }

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("breadcrumb-schema");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null;
}
