import React, { useState, useEffect, useRef } from "react";
import Tilt3D from "@/components/ui/tilt-3d";
import {
  ExternalLink,
  Github,
  Code,
  Star,
  Eye,
  Calendar,
  Zap,
  Award,
  Layers,
  ArrowRight,
  Play,
  Heart,
  Share2,
  Download,
} from "lucide-react";

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [animatedStats, setAnimatedStats] = useState({
    totalProjects: 0,
    totalStars: 0,
    totalViews: 0,
  });
  const sectionRef = useRef<HTMLElement>(null);

  const filters = [
    { id: "all", label: "All Projects", icon: Layers },
    { id: "frontend", label: "Frontend", icon: Code },
    { id: "fullstack", label: "Full Stack", icon: Zap },
    { id: "mobile", label: "Mobile", icon: Star },
  ];

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "Full-stack e-commerce solution with React, Node.js, and MongoDB featuring payment integration, admin dashboard, and real-time inventory management.",
      image:
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800&h=500",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      techColors: [
        "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200",
        "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200",
        "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200",
        "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200",
      ],
      category: "fullstack",
      githubUrl: "#",
      liveUrl: "#",
      stars: 124,
      views: 2340,
      status: "Completed",
      featured: true,
      gradient: "from-blue-500 to-purple-600",
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "Collaborative task management tool with real-time updates, team collaboration features, drag-and-drop interface, and advanced analytics.",
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=500",
      technologies: ["React", "Firebase", "Tailwind", "Socket.io"],
      techColors: [
        "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200",
        "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200",
        "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200",
        "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200",
      ],
      category: "frontend",
      githubUrl: "#",
      liveUrl: "#",
      stars: 89,
      views: 1560,
      status: "In Progress",
      featured: true,
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description:
        "Beautiful weather application with location-based forecasts, interactive maps, detailed analytics, and personalized weather alerts.",
      image:
        "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800&h=500",
      technologies: ["JavaScript", "Weather API", "CSS3", "Chart.js"],
      techColors: [
        "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200",
        "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200",
        "bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200",
        "bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200",
      ],
      category: "frontend",
      githubUrl: "#",
      liveUrl: "#",
      stars: 67,
      views: 980,
      status: "Completed",
      featured: false,
      gradient: "from-orange-500 to-pink-600",
    },
    {
      id: 4,
      title: "Social Media Analytics",
      description:
        "Comprehensive social media analytics dashboard with data visualization, engagement tracking, automated reporting, and AI insights.",
      image:
        "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800&h=500",
      technologies: ["Vue.js", "Laravel", "Chart.js", "MySQL"],
      techColors: [
        "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200",
        "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200",
        "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200",
        "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200",
      ],
      category: "fullstack",
      githubUrl: "#",
      liveUrl: "#",
      stars: 156,
      views: 3200,
      status: "Completed",
      featured: true,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      id: 5,
      title: "Mobile Banking App",
      description:
        "Secure mobile banking application with biometric authentication, real-time transactions, budget tracking, and investment portfolio management.",
      image:
        "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800&h=500",
      technologies: ["React Native", "Node.js", "PostgreSQL", "JWT"],
      techColors: [
        "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200",
        "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200",
        "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200",
        "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200",
      ],
      category: "mobile",
      githubUrl: "#",
      liveUrl: "#",
      stars: 203,
      views: 4100,
      status: "In Progress",
      featured: true,
      gradient: "from-indigo-500 to-blue-600",
    },
    {
      id: 6,
      title: "AI Content Generator",
      description:
        "AI-powered content generation platform with natural language processing, multiple content types, and collaborative editing features.",
      image:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800&h=500",
      technologies: ["Python", "OpenAI", "FastAPI", "React"],
      techColors: [
        "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200",
        "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200",
        "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200",
        "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200",
      ],
      category: "fullstack",
      githubUrl: "#",
      liveUrl: "#",
      stars: 312,
      views: 5670,
      status: "Completed",
      featured: true,
      gradient: "from-yellow-500 to-red-600",
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const featuredProjects = projects.filter((project) => project.featured);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
              totalProjects: Math.floor(25 * progress),
              totalStars: Math.floor(951 * progress),
              totalViews: Math.floor(18750 * progress),
            });

            if (currentStep >= steps) {
              clearInterval(timer);
              setAnimatedStats({
                totalProjects: 25,
                totalStars: 951,
                totalViews: 18750,
              });
            }
          }, increment);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-emerald-400/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-6 animate-bounce">
            <Code className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-white dark:via-purple-400 dark:to-blue-400 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Showcasing my latest work and creative solutions
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Stats Section */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {animatedStats.totalProjects}+
            </div>
            <div className="text-slate-600 dark:text-slate-300">
              Total Projects
            </div>
          </div>
          <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {animatedStats.totalStars}+
            </div>
            <div className="text-slate-600 dark:text-slate-300">
              GitHub Stars
            </div>
          </div>
          <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
              {(animatedStats.totalViews / 1000).toFixed(1)}K+
            </div>
            <div className="text-slate-600 dark:text-slate-300">
              Project Views
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg scale-105"
                    : "bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{filter.label}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Projects Highlight */}
        {activeFilter === "all" && (
          <div
            className={`mb-16 transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-8 rounded-3xl shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
                    <Star className="w-6 h-6 mr-3 text-yellow-300" />
                    Featured Projects
                  </h3>
                  <p className="text-purple-100">
                    My most impactful and innovative projects
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">
                    {featuredProjects.length}
                  </div>
                  <div className="text-purple-100 text-sm">Featured</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {featuredProjects.slice(0, 4).map((project, index) => (
                  <div
                    key={project.id}
                    className="text-center p-4 bg-white/20 rounded-xl backdrop-blur-sm"
                  >
                    <div className="text-lg font-semibold text-white mb-1">
                      {project.title}
                    </div>
                    <div className="text-purple-100 text-sm flex items-center justify-center">
                      <Star className="w-3 h-3 mr-1" />
                      {project.stars}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {filteredProjects.map((project, index) => (
            <Tilt3D
              key={project.id}
              className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden relative"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </div>
              )}

              {/* Status Badge */}
              <div
                className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-semibold ${
                  project.status === "Completed"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                    : "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                }`}
              >
                {project.status}
              </div>

              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-80 transition-opacity duration-300`}
                ></div>

                {/* Hover Overlay */}
                {hoveredProject === project.id && (
                  <div className="absolute inset-0 flex items-center justify-center space-x-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/90 dark:bg-slate-800/90 p-3 rounded-full hover:bg-white dark:hover:bg-slate-700 transition-colors duration-300 transform hover:scale-110"
                    >
                      <Github className="w-5 h-5 text-slate-800 dark:text-white" />
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/90 dark:bg-slate-800/90 p-3 rounded-full hover:bg-white dark:hover:bg-slate-700 transition-colors duration-300 transform hover:scale-110"
                    >
                      <ExternalLink className="w-5 h-5 text-slate-800 dark:text-white" />
                    </a>
                    <button className="bg-white/90 dark:bg-slate-800/90 p-3 rounded-full hover:bg-white dark:hover:bg-slate-700 transition-colors duration-300 transform hover:scale-110">
                      <Play className="w-5 h-5 text-slate-800 dark:text-white" />
                    </button>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                    <Star className="w-4 h-4" />
                    <span>{project.stars}</span>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${project.techColors[techIndex]} transition-transform duration-300 hover:scale-105`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      <span>{project.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      <span>{Math.floor(project.views * 0.1)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-300">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-300">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white px-4 py-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300 hover:scale-105"
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm font-medium">Code</span>
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r ${project.gradient} text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">Live</span>
                  </a>
                </div>
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-purple-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </Tilt3D>
          ))}
        </div>

        {/* Load More Button */}
        {filteredProjects.length > 6 && (
          <div
            className={`text-center mt-12 transition-all duration-1000 delay-1100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto">
              <span>View All Projects</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
