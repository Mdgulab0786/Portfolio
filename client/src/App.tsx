import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "./components/skills-section";
import ProjectsSection from "./components/projects-section";
import CertificationsSection from "@/components/certifications-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
        <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">
          <Navigation />
          
          <Routes>
            {/* Home Page */}
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

            {/* Admin Login Page */}
            <Route path="/admin" element={<AdminLogin />} />

            {/* Admin Dashboard - Protected */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
