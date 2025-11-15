export const siteConfig = {
  name: "Md Gulab",
  title: "Md Gulab | Full Stack Developer",
  description:
    "Full Stack Developer specializing in React, Node.js, and modern web technologies. Building scalable, user-friendly applications.",
  url: "https://mdgulab.netlify.app",
  ogImage: "/og-image.jpg",
  links: {
    github: "https://github.com/Mdgulab0786",
    linkedin: "https://www.linkedin.com/in/md-gulab-team66/",
    twitter: "https://twitter.com/mdgulab",
    email: "team66415@gmail.com",
    phone: "+91 9711214379",
  },
  author: {
    name: "Md Gulab",
    email: "team66415@gmail.com",
    location: "New Delhi, India",
    timezone: "Asia/Kolkata",
  },
  features: {
    blog: false,
    testimonials: true,
    analytics: true,
    newsletter: false,
  },
  seo: {
    keywords: [
      "Full Stack Developer",
      "React Developer",
      "Node.js Developer",
      "Web Developer",
      "Frontend Developer",
      "Backend Developer",
      "MERN Stack",
      "JavaScript",
      "TypeScript",
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
