export const navigationConfig = {
  mainNav: [
    {
      title: "Home",
      href: "#home",
      id: "home",
    },
    {
      title: "About",
      href: "#about",
      id: "about",
    },
    {
      title: "Skills",
      href: "#skills",
      id: "skills",
    },
    {
      title: "Projects",
      href: "#projects",
      id: "projects",
    },
    {
      title: "Certifications",
      href: "#certifications",
      id: "certifications",
    },
    {
      title: "Testimonials",
      href: "#testimonials",
      id: "testimonials",
    },
    {
      title: "Contact",
      href: "#contact",
      id: "contact",
    },
  ],
  adminNav: [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: "dashboard",
    },
    {
      title: "Messages",
      href: "/admin/dashboard#messages",
      icon: "messages",
    },
  ],
} as const;
