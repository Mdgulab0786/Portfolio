import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  CertificationsSection,
  ContactSection,
  TestimonialsSection,
  ResumeSection,
} from "@/features";
import { MainLayout } from "@/layouts";

const Home = () => {
  return (
    <MainLayout>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificationsSection />
      <TestimonialsSection />
      <ResumeSection />
      <ContactSection />
    </MainLayout>
  );
};

export default Home;
