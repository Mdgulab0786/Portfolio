import React, { useState, useEffect, useRef } from 'react';
import { 
  Code, 
  Users, 
  Lightbulb, 
  Rocket, 
  Award, 
  Target, 
  Zap, 
  Heart,
  Download,
  Mail,
  MapPin,
  Calendar,
  Coffee,
  BookOpen,
  Star,
  TrendingUp,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Share2,
  Eye,
  ThumbsUp,
  MessageCircle,
  Send,
  ChevronRight,
  Sparkles,
  Brain,
  Cpu,
  Database,
  Server,
  GitBranch,
  Layers,
  CheckCircle,
  Clock,
  Flame,
  Trophy
} from "lucide-react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState<number | null>(null);
  const [stats, setStats] = useState({ projects: 0, experience: 0, clients: 0, commits: 0 });
  const [activeTab, setActiveTab] = useState('journey');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const sectionRef = useRef<HTMLElement>(null);

  const highlights = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Writing maintainable, efficient code that scales with modern best practices and industry standards",
      bgColor: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      borderColor: "border-blue-200 dark:border-blue-700",
      hoverBg: "hover:from-blue-100 hover:to-indigo-200 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30",
      stats: "500+ Functions",
      trend: "+15%"
    },
    {
      icon: Users,
      title: "Team Player",
      description: "Collaborating effectively in agile environments with cross-functional teams and stakeholders",
      bgColor: "from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      borderColor: "border-emerald-200 dark:border-emerald-700",
      hoverBg: "hover:from-emerald-100 hover:to-teal-200 dark:hover:from-emerald-900/30 dark:hover:to-teal-900/30",
      stats: "12+ Teams",
      trend: "+8%"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Always exploring cutting-edge technologies and creative problem-solving approaches",
      bgColor: "from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
      iconColor: "text-purple-600 dark:text-purple-400",
      borderColor: "border-purple-200 dark:border-purple-700",
      hoverBg: "hover:from-purple-100 hover:to-pink-200 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30",
      stats: "25+ Ideas",
      trend: "+22%"
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Optimizing applications for lightning-fast speed and exceptional user experience",
      bgColor: "from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20",
      iconColor: "text-amber-600 dark:text-amber-400",
      borderColor: "border-amber-200 dark:border-amber-700",
      hoverBg: "hover:from-amber-100 hover:to-orange-200 dark:hover:from-amber-900/30 dark:hover:to-orange-900/30",
      stats: "98% Speed",
      trend: "+12%"
    },
  ];

  const personalInfo = [
    { icon: MapPin, label: "Location", value: "India", color: "text-red-500" },
    { icon: Calendar, label: "Experience", value: "2+ Years", color: "text-blue-500" },
    { icon: Coffee, label: "Coffee Consumed", value: "∞ Cups", color: "text-amber-500" },
    { icon: BookOpen, label: "Currently Learning", value: "Python & AI", color: "text-purple-500" }
  ];

  const achievements = [
    { 
      icon: Award, 
      title: "Problem Solver", 
      description: "Solved 100+ coding challenges",
      count: "100+",
      color: "text-yellow-500",
      bgColor: "from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20"
    },
    { 
      icon: Target, 
      title: "Goal Oriented", 
      description: "Always meeting project deadlines",
      count: "98%",
      color: "text-green-500",
      bgColor: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
    },
    { 
      icon: Zap, 
      title: "Fast Learner", 
      description: "Quick to adapt new technologies",
      count: "12+",
      color: "text-blue-500",
      bgColor: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
    },
    { 
      icon: Heart, 
      title: "Passionate", 
      description: "Love what I do every single day",
      count: "24/7",
      color: "text-red-500",
      bgColor: "from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      company: "TechCorp",
      message: "Md Gulab's attention to detail and problem-solving skills are exceptional. A true professional!",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Senior Developer",
      company: "StartupXYZ",
      message: "Working with Gulab was amazing. His code quality and delivery speed exceeded expectations.",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "UI/UX Designer",
      company: "DesignStudio",
      message: "Gulab perfectly translated our designs into beautiful, responsive web applications.",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100",
      rating: 5
    }
  ];

  const tabs = [
    { id: 'journey', label: 'My Journey', icon: BookOpen },
    { id: 'skills', label: 'Core Skills', icon: Cpu },
    { id: 'values', label: 'Values', icon: Heart },
    { id: 'testimonials', label: 'Testimonials', icon: MessageCircle }
  ];

  const coreSkills = [
    { name: "Frontend Development", level: 92, icon: Monitor, color: "from-blue-500 to-cyan-500" },
    { name: "Backend Development", level: 88, icon: Server, color: "from-green-500 to-emerald-500" },
    { name: "Database Design", level: 85, icon: Database, color: "from-purple-500 to-pink-500" },
    { name: "Version Control", level: 90, icon: GitBranch, color: "from-orange-500 to-red-500" },
    { name: "Problem Solving", level: 95, icon: Brain, color: "from-indigo-500 to-purple-500" },
    { name: "System Architecture", level: 82, icon: Layers, color: "from-teal-500 to-blue-500" }
  ];

  const workingHours = [
    { day: "Mon-Fri", hours: "9:00 AM - 6:00 PM", status: "active", color: "text-green-500" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM", status: "limited", color: "text-yellow-500" },
    { day: "Sunday", hours: "Available for urgent work", status: "emergency", color: "text-red-500" }
  ];

  // Enhanced mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Animate main stats
          const duration = 2500;
          const steps = 80;
          const increment = duration / steps;
          
          let currentStep = 0;
          const timer = setInterval(() => {
            currentStep++;
            const progress = Math.min(currentStep / steps, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            setStats({
              projects: Math.floor(25 * easeOut),
              experience: Math.floor(2.5 * easeOut * 10) / 10,
              clients: Math.floor(15 * easeOut),
              commits: Math.floor(1250 * easeOut)
            });
            
            if (currentStep >= steps) {
              clearInterval(timer);
              setStats({ projects: 25, experience: 2.5, clients: 15, commits: 1250 });
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'journey':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-700">
              <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-blue-500" />
                Current Focus
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                I'm currently pursuing a diploma in Computer Science Engineering with a passion for creating 
                innovative digital solutions. My journey in tech has been driven by curiosity and a desire 
                to solve real-world problems through code.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-700">
              <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center">
                <Rocket className="w-5 h-5 mr-2 text-emerald-500" />
                Technical Expertise
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Skilled in modern web technologies including React.js, JavaScript, HTML5, CSS3, and backend 
                development with PHP and MySQL. Currently expanding my expertise in Python for AI and automation, 
                always staying ahead of the technology curve.
              </p>
            </div>

            {/* Working Hours */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-700">
              <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-purple-500" />
                Working Hours (IST)
              </h4>
              <div className="space-y-3">
                {workingHours.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium text-slate-700 dark:text-slate-200">{schedule.day}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-600 dark:text-slate-300">{schedule.hours}</span>
                      <div className={`w-2 h-2 rounded-full ${schedule.color.replace('text-', 'bg-')}`}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Current Time: {currentTime.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })}
                </span>
              </div>
            </div>
          </div>
        );
      
      case 'skills':
        return (
          <div className="space-y-4">
            {coreSkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${skill.color}`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-slate-800 dark:text-white">{skill.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{skill.level}%</span>
                  </div>
                  <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${skill.color} h-2 rounded-full transition-all duration-1000 ease-out relative`}
                      style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      
      case 'values':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div 
                  key={index}
                  className={`bg-gradient-to-r ${achievement.bgColor} p-6 rounded-xl border border-white/20 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`w-8 h-8 ${achievement.color} group-hover:scale-110 transition-transform duration-300`} />
                    <span className={`text-2xl font-bold ${achievement.color}`}>{achievement.count}</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-2">{achievement.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        );
      
      case 'testimonials':
        return (
          <div className="space-y-6">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 dark:border-blue-700"
                />
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                  </p>
                </div>
                <div className="ml-auto flex space-x-1">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-200 italic leading-relaxed">
                "{testimonials[currentTestimonial].message}"
              </p>
            </div>
            
            <div className="flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-blue-500 scale-125' 
                      : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>

            {/* Client Satisfaction */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-green-500" />
                  Client Satisfaction
                </h4>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">98%</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-slate-800 dark:text-white">15+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Happy Clients</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800 dark:text-white">25+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Projects Done</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800 dark:text-white">100%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">On Time</div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl animate-spin-slow"></div>
        
        {/* Interactive Mouse Follower */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transform: `scale(${1 + Math.sin(Date.now() * 0.002) * 0.1})`
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 animate-bounce">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-purple-400 mb-4">
            About Me
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Passionate developer crafting digital experiences with code and creativity
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Enhanced Stats Section */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">{stats.projects}+</div>
            <div className="text-slate-600 dark:text-slate-300">Projects</div>
            <div className="w-full bg-blue-100 dark:bg-blue-900/30 rounded-full h-1 mt-2">
              <div className="bg-blue-500 h-1 rounded-full transition-all duration-1000" style={{ width: isVisible ? '85%' : '0%' }}></div>
            </div>
          </div>
          <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2 group-hover:scale-110 transition-transform duration-300">{stats.experience}+</div>
            <div className="text-slate-600 dark:text-slate-300">Years Exp</div>
            <div className="w-full bg-emerald-100 dark:bg-emerald-900/30 rounded-full h-1 mt-2">
              <div className="bg-emerald-500 h-1 rounded-full transition-all duration-1000 delay-200" style={{ width: isVisible ? '70%' : '0%' }}></div>
            </div>
          </div>
          <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">{stats.clients}+</div>
            <div className="text-slate-600 dark:text-slate-300">Clients</div>
            <div className="w-full bg-purple-100 dark:bg-purple-900/30 rounded-full h-1 mt-2">
              <div className="bg-purple-500 h-1 rounded-full transition-all duration-1000 delay-400" style={{ width: isVisible ? '90%' : '0%' }}></div>
            </div>
          </div>
          <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2 group-hover:scale-110 transition-transform duration-300">{stats.commits}+</div>
            <div className="text-slate-600 dark:text-slate-300">Commits</div>
            <div className="w-full bg-orange-100 dark:bg-orange-900/30 rounded-full h-1 mt-2">
              <div className="bg-orange-500 h-1 rounded-full transition-all duration-1000 delay-600" style={{ width: isVisible ? '95%' : '0%' }}></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row items-start justify-between gap-12">
          {/* Enhanced Image Section */}
          <div className={`xl:w-1/2 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative group mb-8">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
              <div className="relative bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-2xl">
                <img
                  src="md-gulab-1.jpg"
                  alt="Md Gulab"
                  className="rounded-2xl w-full max-w-sm mx-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-8 right-8 bg-green-500 w-4 h-4 rounded-full animate-ping"></div>
                <div className="absolute top-8 right-8 bg-green-500 w-4 h-4 rounded-full"></div>
                
                {/* Status Badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-200">Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Info Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {personalInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-5 h-5 ${info.color} group-hover:scale-110 transition-transform duration-300`} />
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{info.label}</div>
                        <div className="text-sm font-semibold text-slate-800 dark:text-white">{info.value}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-r ${highlight.bgColor} ${highlight.hoverBg} p-6 rounded-2xl border ${highlight.borderColor} shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer group`}
                    onMouseEnter={() => setActiveHighlight(index)}
                    onMouseLeave={() => setActiveHighlight(null)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`${highlight.iconColor} w-6 h-6`} />
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-slate-800 dark:text-white">{highlight.stats}</div>
                        <div className="text-xs text-green-600 dark:text-green-400 flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {highlight.trend}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                      {highlight.title}
                    </h3>
                    <p className={`text-sm text-slate-600 dark:text-slate-300 transition-all duration-300 ${activeHighlight === index ? 'text-slate-700 dark:text-slate-200' : ''}`}>
                      {highlight.description}
                    </p>
                    
                    {/* Progress indicator */}
                    <div className="mt-4 w-full bg-white/50 dark:bg-slate-700/50 rounded-full h-1">
                      <div 
                        className={`bg-gradient-to-r ${highlight.iconColor.replace('text-', 'from-')} to-transparent h-1 rounded-full transition-all duration-1000`}
                        style={{ width: activeHighlight === index ? '100%' : '60%' }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced Content Section */}
          <div className={`xl:w-1/2 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl mb-8">
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 dark:border-slate-700">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-105'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                {renderTabContent()}
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 group">
                  <Download className="w-4 h-4 group-hover:animate-bounce" />
                  <span>Download CV</span>
                </button>
                <button className="flex items-center justify-center space-x-2 border-2 border-blue-500 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 group">
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>Get In Touch</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                    <Flame className="w-5 h-5 mr-2 text-yellow-300" />
                    Currently Active
                  </h3>
                  <p className="text-indigo-100">
                    Building amazing projects daily
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">Live</div>
                  <div className="text-indigo-100 text-sm">Status</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                  <CheckCircle className="w-6 h-6 text-green-300 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white">Available</div>
                  <div className="text-indigo-100 text-sm">For Projects</div>
                </div>
                <div className="text-center p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Clock className="w-6 h-6 text-blue-300 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white">Fast</div>
                  <div className="text-indigo-100 text-sm">Response</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;