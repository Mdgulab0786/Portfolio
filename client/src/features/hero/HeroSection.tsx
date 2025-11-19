import React, { useState, useEffect } from "react";
import Tilt3D from "@/components/ui/tilt-3d";
import {
  Download,
  Mail,
  ArrowRight,
  Code,
  Zap,
  Star,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Calendar,
  Coffee,
  Heart,
  Sparkles,
  Rocket,
  Award,
  TrendingUp,
} from "lucide-react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    experience: 0,
    projects: 0,
    clients: 0,
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const roles = [
    "Full Stack Developer",
    "Frontend Specialist",
    "Backend Engineer",
    "UI/UX Enthusiast",
    "Problem Solver",
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Mdgulab0786",
      label: "GitHub",
      color: "hover:text-gray-800 dark:hover:text-gray-200",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/md-gulab-team66/",
      label: "LinkedIn",
      color: "hover:text-blue-600",
    },
    {
      icon: Twitter,
      href: "#",
      label: "Twitter",
      color: "hover:text-blue-400",
    },
    {
      icon: Mail,
      href: "mailto:mdgulab@gmail.com",
      label: "Email",
      color: "hover:text-red-500",
    },
  ];

  const quickStats = [
    {
      icon: Code,
      label: "Projects",
      value: 25,
      suffix: "+",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Calendar,
      label: "Experience",
      value: 2.5,
      suffix: " Years",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: Star,
      label: "GitHub Stars",
      value: 150,
      suffix: "+",
      color: "text-yellow-600 dark:text-yellow-400",
    },
    {
      icon: Coffee,
      label: "Coffee Cups",
      value: 999,
      suffix: "+",
      color: "text-amber-600 dark:text-amber-400",
    },
  ];

  const skills = [
    { name: "React.js", level: 90, color: "from-cyan-500 to-blue-500" },
    { name: "JavaScript", level: 88, color: "from-yellow-500 to-orange-500" },
    { name: "Node.js", level: 85, color: "from-green-500 to-emerald-500" },
    { name: "Python", level: 75, color: "from-purple-500 to-pink-500" },
  ];

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Role rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Initial animations
  useEffect(() => {
    setIsVisible(true);

    // Animate stats
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedStats({
        experience: Math.floor(2.5 * progress * 10) / 10,
        projects: Math.floor(25 * progress),
        clients: Math.floor(15 * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats({ experience: 2.5, projects: 25, clients: 15 });
      }
    }, increment);

    return () => clearInterval(timer);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "md-gulab-resume.pdf";
    link.download = "Md_Gulab_Resume.pdf";
    link.click();
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Shapes */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-emerald-400/5 rounded-full blur-3xl animate-spin-slow"></div>

        {/* Interactive Mouse Follower */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>

        {/* Floating Icons */}
        <div className="absolute top-20 left-20 animate-bounce delay-300">
          <Code className="w-8 h-8 text-blue-400/30" />
        </div>
        <div className="absolute top-40 right-32 animate-bounce delay-700">
          <Zap className="w-6 h-6 text-yellow-400/30" />
        </div>
        <div className="absolute bottom-32 left-32 animate-bounce delay-1000">
          <Star className="w-7 h-7 text-purple-400/30" />
        </div>
        <div className="absolute bottom-20 right-20 animate-bounce delay-500">
          <Rocket className="w-8 h-8 text-emerald-400/30" />
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content Section */}
          <div
            className={`lg:w-1/2 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Greeting */}
            <div className="mb-6">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Available for new opportunities
                </span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-bold text-slate-800 dark:text-white mb-4 leading-tight">
                Hi, I' m{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse">
                  Md Gulab
                </span>
              </h1>
            </div>

            {/* Dynamic Role */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                <span className="text-lg text-slate-600 dark:text-slate-300">
                  Currently working as
                </span>
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-slate-700 dark:text-slate-200 h-12 overflow-hidden">
                <div
                  className="transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateY(-${currentRole * 3}rem)` }}
                >
                  {roles.map((role, index) => (
                    <div key={index} className="h-12 flex items-center">
                      <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        {role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl">
              Passionate about creating{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                beautiful
              </span>
              ,
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                {" "}
                functional
              </span>{" "}
              web applications that solve real-world problems. Currently
              pursuing Computer Science Engineering with hands-on experience in
              modern web technologies.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {quickStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                    <div className="text-2xl font-bold text-slate-800 dark:text-white">
                      {typeof stat.value === "number" && stat.value < 10
                        ? stat.value
                        : Math.floor(stat.value)}
                      {stat.suffix}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={scrollToContact}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Mail className="w-5 h-5" />
                <span>Let's Work Together</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={downloadResume}
                className="group border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 px-8 py-4 rounded-full font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-slate-800 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                Connect with me:
              </span>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-slate-600 dark:text-slate-300 ${social.color}`}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Image and Skills Section */}
          <div
            className={`lg:w-1/2 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            {/* Profile Image */}
            <Tilt3D className="relative mb-8">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
              <div className="relative bg-white dark:bg-slate-800 p-4 rounded-full shadow-2xl">
                <img
                  src="profile.png"
                  alt="Md Gulab"
                  className="w-80 h-80 rounded-full object-cover transform hover:scale-105 transition-transform duration-500"
                  decoding="async"
                  loading="eager"
                  fetchPriority="high"
                />
                {/* Status Indicators */}
                <div className="absolute top-8 right-8 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-slate-800 animate-ping"></div>
                <div className="absolute top-8 right-8 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-slate-800"></div>

                {/* Floating Achievement Badges */}
                <div className="absolute -top-4 -left-4 bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full shadow-lg animate-bounce">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-emerald-400 to-teal-500 p-3 rounded-full shadow-lg animate-bounce delay-500">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </Tilt3D>

            {/* Skills Preview */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                <Zap className="w-5 h-5 mr-3 text-yellow-500" />
                Top Skills
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-slate-700 dark:text-slate-200">
                        {skill.name}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div
                        className={`bg-gradient-to-r ${skill.color} h-full rounded-full transition-all duration-1000 ease-out relative`}
                        style={{
                          width: isVisible ? `${skill.level}%` : "0%",
                          transitionDelay: `${index * 200}ms`,
                        }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Skills Button */}
              <button className="w-full mt-6 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-800 dark:text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                <Code className="w-4 h-4" />
                <span>View All Skills</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
