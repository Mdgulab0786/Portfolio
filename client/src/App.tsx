import React from 'react';
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from './components/skills-section';
import ProjectsSection from './components/projects-section';
import CertificationsSection from "@/components/certifications-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
      <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">
        <Navigation />
        <main className="flex-1">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <CertificationsSection />
        </main>
        <ContactSection />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
