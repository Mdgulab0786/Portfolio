export const APP_NAME = "Md Gulab Portfolio";
export const APP_VERSION = "2.0.0";

export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
} as const;

export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

export const API_ENDPOINTS = {
  contact: "/api/contact",
  resume: "/api/resume",
} as const;

export const STORAGE_KEYS = {
  theme: "portfolio-theme",
  adminToken: "adminToken",
} as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/Mdgulab0786",
  linkedin: "https://www.linkedin.com/in/md-gulab-team66/",
  twitter: "https://twitter.com/mdgulab",
  instagram: "https://instagram.com/mdgulab",
} as const;

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "CTO, TechCorp India",
    company: "TechCorp",
    avatar: "/testimonials/avatar-1.jpg",
    content:
      "Md Gulab delivered an exceptional full-stack solution that exceeded our expectations. His attention to detail and problem-solving skills are outstanding.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Product Manager, StartupHub",
    company: "StartupHub",
    avatar: "/testimonials/avatar-2.jpg",
    content:
      "Working with Gulab was a pleasure. He transformed our ideas into a beautiful, functional application. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Founder, E-Commerce Solutions",
    company: "E-Commerce Solutions",
    avatar: "/testimonials/avatar-3.jpg",
    content:
      "Professional, responsive, and skilled. Gulab helped us launch our platform ahead of schedule with zero bugs. Will definitely work with him again.",
    rating: 5,
  },
] as const;

export const SKILLS_CATEGORIES = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  tools: "Tools & Others",
} as const;
