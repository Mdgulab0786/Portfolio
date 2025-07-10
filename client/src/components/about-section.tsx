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
  BookOpen
} from "lucide-react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState<number | null>(null);
  const [stats, setStats] = useState({ projects: 0, experience: 0, clients: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const highlights = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Writing maintainable, efficient code that scales with modern best practices",
      bgColor: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      borderColor: "border-blue-200 dark:border-blue-700",
      hoverBg: "hover:from-blue-100 hover:to-indigo-200 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30"
    },
    {
      icon: Users,
      title: "Team Player",
      description: "Collaborating effectively in agile environments with cross-functional teams",
      bgColor: "from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      borderColor: "border-emerald-200 dark:border-emerald-700",
      hoverBg: "hover:from-emerald-100 hover:to-teal-200 dark:hover:from-emerald-900/30 dark:hover:to-teal-900/30"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Always exploring cutting-edge technologies and creative problem-solving approaches",
      bgColor: "from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
      iconColor: "text-purple-600 dark:text-purple-400",
      borderColor: "border-purple-200 dark:border-purple-700",
      hoverBg: "hover:from-purple-100 hover:to-pink-200 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30"
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Optimizing applications for lightning-fast speed and exceptional user experience",
      bgColor: "from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20",
      iconColor: "text-amber-600 dark:text-amber-400",
      borderColor: "border-amber-200 dark:border-amber-700",
      hoverBg: "hover:from-amber-100 hover:to-orange-200 dark:hover:from-amber-900/30 dark:hover:to-orange-900/30"
    },
  ];

  const personalInfo = [
    { icon: MapPin, label: "Location", value: "India" },
    { icon: Calendar, label: "Experience", value: "2+ Years" },
    { icon: Coffee, label: "Coffee Consumed", value: "∞ Cups" },
    { icon: BookOpen, label: "Currently Learning", value: "Python & AI" }
  ];

  const achievements = [
    { icon: Award, title: "Problem Solver", description: "Solved 100+ coding challenges" },
    { icon: Target, title: "Goal Oriented", description: "Always meeting project deadlines" },
    { icon: Zap, title: "Fast Learner", description: "Quick to adapt new technologies" },
    { icon: Heart, title: "Passionate", description: "Love what I do every single day" }
  ];

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
            
            setStats({
              projects: Math.floor(25 * progress),
              experience: Math.floor(2.5 * progress * 10) / 10,
              clients: Math.floor(15 * progress)
            });
            
            if (currentStep >= steps) {
              clearInterval(timer);
              setStats({ projects: 25, experience: 2.5, clients: 15 });
            }
          }, increment);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
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

        {/* Stats Section */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stats.projects}+</div>
            <div className="text-slate-600 dark:text-slate-300">Projects Completed</div>
          </div>
          <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{stats.experience}+</div>
            <div className="text-slate-600 dark:text-slate-300">Years Experience</div>
          </div>
          <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">{stats.clients}+</div>
            <div className="text-slate-600 dark:text-slate-300">Happy Clients</div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Image Section */}
          <div className={`lg:w-1/2 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
              <div className="relative bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-2xl">
                <img
                  src="Md Gulab.png"
                  alt="Md Gulab"
                  className="rounded-2xl w-full max-w-md mx-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-8 right-8 bg-green-500 w-4 h-4 rounded-full animate-ping"></div>
                <div className="absolute top-8 right-8 bg-green-500 w-4 h-4 rounded-full"></div>
              </div>
            </div>

            {/* Personal Info Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {personalInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{info.label}</div>
                        <div className="text-sm font-semibold text-slate-800 dark:text-white">{info.value}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content Section */}
          <div className={`lg:w-1/2 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl mb-8">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                My Journey
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                I'm currently pursuing a diploma in Computer Science Engineering with a passion for creating 
                innovative digital solutions. My journey in tech has been driven by curiosity and a desire 
                to solve real-world problems through code.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Skilled in modern web technologies including React.js, JavaScript, HTML5, CSS3, and backend 
                development with PHP and MySQL. Currently expanding my expertise in Python for AI and automation, 
                always staying ahead of the technology curve.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </button>
                <button className="flex items-center space-x-2 border-2 border-blue-500 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300">
                  <Mail className="w-4 h-4" />
                  <span>Get In Touch</span>
                </button>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-r ${highlight.bgColor} ${highlight.hoverBg} p-6 rounded-2xl border ${highlight.borderColor} shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer group`}
                    onMouseEnter={() => setActiveHighlight(index)}
                    onMouseLeave={() => setActiveHighlight(null)}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`${highlight.iconColor} w-6 h-6`} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white ml-4">
                        {highlight.title}
                      </h3>
                    </div>
                    <p className={`text-slate-600 dark:text-slate-300 transition-all duration-300 ${activeHighlight === index ? 'text-slate-700 dark:text-slate-200' : ''}`}>
                      {highlight.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 text-center">
                What Drives Me
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div 
                      key={index}
                      className="text-center p-4 bg-white/80 dark:bg-slate-800/80 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                      <h4 className="font-semibold text-slate-800 dark:text-white text-sm mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        {achievement.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;