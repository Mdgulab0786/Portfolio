import React, { useEffect, useRef, useState } from "react";
import { 
  Code2, 
  Palette, 
  Zap, 
  Atom, 
  Server, 
  Database,
  Globe,
  Smartphone,
  GitBranch,
  Terminal,
  Layers,
  Cpu,
  Brain,
  Rocket,
  Star,
  TrendingUp
} from "lucide-react";

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [animatedPercentages, setAnimatedPercentages] = useState<{ [key: number]: number }>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      bgColor: "from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20",
      skills: [
        {
          name: "HTML5",
          percentage: 95,
          icon: Code2,
          iconColor: "text-orange-600 dark:text-orange-400",
          gradientColor: "from-orange-500 to-red-500",
          description: "Semantic markup and modern web standards"
        },
        {
          name: "CSS3",
          percentage: 90,
          icon: Palette,
          iconColor: "text-blue-600 dark:text-blue-400",
          gradientColor: "from-blue-500 to-cyan-500",
          description: "Advanced styling, animations, and responsive design"
        },
        {
          name: "JavaScript",
          percentage: 88,
          icon: Zap,
          iconColor: "text-yellow-600 dark:text-yellow-400",
          gradientColor: "from-yellow-500 to-amber-500",
          description: "ES6+, DOM manipulation, and modern JS features"
        },
        {
          name: "React.js",
          percentage: 85,
          icon: Atom,
          iconColor: "text-cyan-600 dark:text-cyan-400",
          gradientColor: "from-cyan-500 to-blue-500",
          description: "Hooks, Context API, and component architecture"
        }
      ]
    },
    {
      title: "Backend Development",
      icon: Server,
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
      skills: [
        {
          name: "Node.js",
          percentage: 82,
          icon: Server,
          iconColor: "text-green-600 dark:text-green-400",
          gradientColor: "from-green-500 to-emerald-500",
          description: "Server-side JavaScript and API development"
        },
        {
          name: "PHP",
          percentage: 80,
          icon: Terminal,
          iconColor: "text-purple-600 dark:text-purple-400",
          gradientColor: "from-purple-500 to-indigo-500",
          description: "Web development and server scripting"
        },
        {
          name: "MySQL",
          percentage: 78,
          icon: Database,
          iconColor: "text-blue-700 dark:text-blue-300",
          gradientColor: "from-blue-600 to-indigo-600",
          description: "Database design and query optimization"
        },
        {
          name: "Python",
          percentage: 75,
          icon: Brain,
          iconColor: "text-yellow-700 dark:text-yellow-300",
          gradientColor: "from-yellow-600 to-orange-600",
          description: "Currently learning for AI and automation"
        }
      ]
    },
    {
      title: "Tools & Technologies",
      icon: Cpu,
      color: "from-violet-500 to-purple-500",
      bgColor: "from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20",
      skills: [
        {
          name: "Git & GitHub",
          percentage: 85,
          icon: GitBranch,
          iconColor: "text-gray-700 dark:text-gray-300",
          gradientColor: "from-gray-600 to-slate-600",
          description: "Version control and collaborative development"
        },
        {
          name: "Responsive Design",
          percentage: 92,
          icon: Smartphone,
          iconColor: "text-indigo-600 dark:text-indigo-400",
          gradientColor: "from-indigo-500 to-purple-500",
          description: "Mobile-first and cross-device compatibility"
        },
        {
          name: "Web Performance",
          percentage: 80,
          icon: Rocket,
          iconColor: "text-red-600 dark:text-red-400",
          gradientColor: "from-red-500 to-pink-500",
          description: "Optimization and speed enhancement"
        },
        {
          name: "Problem Solving",
          percentage: 90,
          icon: Layers,
          iconColor: "text-emerald-700 dark:text-emerald-300",
          gradientColor: "from-emerald-600 to-teal-600",
          description: "Analytical thinking and debugging"
        }
      ]
    }
  ];

  const achievements = [
    { icon: Star, label: "Projects Completed", value: "25+", color: "text-yellow-500" },
    { icon: TrendingUp, label: "Skills Mastered", value: "12+", color: "text-blue-500" },
    { icon: Rocket, label: "Technologies", value: "8+", color: "text-purple-500" },
    { icon: Globe, label: "Web Apps Built", value: "15+", color: "text-green-500" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Animate skill percentages
          skillCategories.forEach((category, categoryIndex) => {
            category.skills.forEach((skill, skillIndex) => {
              const skillId = categoryIndex * 100 + skillIndex;
              
              setTimeout(() => {
                let currentPercentage = 0;
                const targetPercentage = skill.percentage;
                const increment = targetPercentage / 60; // 60 frames for smooth animation
                
                const animatePercentage = () => {
                  currentPercentage += increment;
                  if (currentPercentage >= targetPercentage) {
                    currentPercentage = targetPercentage;
                  }
                  
                  setAnimatedPercentages(prev => ({
                    ...prev,
                    [skillId]: Math.round(currentPercentage)
                  }));
                  
                  if (currentPercentage < targetPercentage) {
                    requestAnimationFrame(animatePercentage);
                  }
                };
                
                requestAnimationFrame(animatePercentage);
              }, (categoryIndex * 200) + (skillIndex * 100));
            });
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [skillCategories]);

  return (
    <section 
      id="skills" 
      className="py-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 relative overflow-hidden" 
      ref={sectionRef}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-emerald-400/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mb-6 animate-bounce">
            <Cpu className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-white dark:via-purple-400 dark:to-pink-400 mb-4">
            Skills & Expertise
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Achievements Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div 
                key={index}
                className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Icon className={`w-8 h-8 ${achievement.color} mx-auto mb-3`} />
                <div className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
                  {achievement.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  {achievement.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Skills Categories */}
        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <div 
                key={categoryIndex}
                className={`transition-all duration-1000 delay-${(categoryIndex + 1) * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                {/* Category Header */}
                <div className={`bg-gradient-to-r ${category.bgColor} p-6 rounded-2xl mb-8 border border-white/20 dark:border-slate-700/50`}>
                  <div className="flex items-center justify-center mb-4">
                    <div className={`p-4 bg-gradient-to-r ${category.color} rounded-full shadow-lg`}>
                      <CategoryIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-center text-slate-800 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.skills.map((skill, skillIndex) => {
                    const SkillIcon = skill.icon;
                    const skillId = categoryIndex * 100 + skillIndex;
                    const animatedPercentage = animatedPercentages[skillId] || 0;
                    
                    return (
                      <div 
                        key={skillIndex}
                        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer"
                        onMouseEnter={() => setHoveredSkill(skillId)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        {/* Skill Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className={`p-3 rounded-full bg-gradient-to-r ${skill.gradientColor} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                              <SkillIcon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-slate-800 dark:text-white">
                                {skill.name}
                              </h4>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                {animatedPercentage}%
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold bg-gradient-to-r ${skill.gradientColor} bg-clip-text text-transparent`}>
                              {animatedPercentage}%
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="relative mb-4">
                          <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                            <div
                              className={`bg-gradient-to-r ${skill.gradientColor} h-full rounded-full transition-all duration-1000 ease-out relative`}
                              style={{
                                width: isVisible ? `${animatedPercentage}%` : '0%'
                              }}
                            >
                              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                            </div>
                          </div>
                          {hoveredSkill === skillId && (
                            <div className="absolute -top-8 left-0 bg-slate-800 dark:bg-white text-white dark:text-slate-800 px-2 py-1 rounded text-xs font-medium">
                              {skill.percentage}% Proficiency
                            </div>
                          )}
                        </div>

                        {/* Skill Description */}
                        <p className={`text-sm text-slate-600 dark:text-slate-300 transition-all duration-300 ${hoveredSkill === skillId ? 'text-slate-700 dark:text-slate-200' : ''}`}>
                          {skill.description}
                        </p>

                        {/* Hover Effect Indicator */}
                        {hoveredSkill === skillId && (
                          <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;