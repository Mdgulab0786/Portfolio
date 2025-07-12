import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from './components/skills-section';
import ProjectsSection from './components/projects-section';
import CertificationsSection from "@/components/certifications-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import Admin from "@/pages/admin"; // ✅ Import your Admin component

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
        <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">
          <Navigation />

          <Routes>
            {/* ✅ Route for Portfolio Page */}
            <Route
              path="/"
              element={
                <main className="flex-1">
                  <HeroSection />
                  <AboutSection />
                  <SkillsSection />
                  <ProjectsSection />
                  <CertificationsSection />
                  <ContactSection />
                  <Footer />
                </main>
              }
            />

            {/* ✅ Route for Admin Page */}
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
