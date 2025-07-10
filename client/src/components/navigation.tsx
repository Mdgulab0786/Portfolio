import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, ChevronDown, Home, User, Award, Mail, Code, Briefcase, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { theme, setTheme } = useTheme();

  const navItems = [
    { label: "Home", href: "home", icon: Home },
    { label: "About", href: "about", icon: User },
    { label: "Skills", href: "skills", icon: Code },
    { label: "Projects", href: "projects", icon: Briefcase },
    { label: "Certifications", href: "certifications", icon: Award },
    { label: "Contact", href: "contact", icon: Mail },
    { label: "Admin", href: "/admin", icon: Settings, isExternal: true },
  ];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      // Add background when scrolled
      setIsScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);

      // Update active section
      const sections = navItems.filter(item => !item.isExternal);
      const scrollPosition = currentScrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.href);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.href);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, navItems]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
    setIsOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-slate-200 dark:bg-slate-700">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 ease-out"
          style={{
            width: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`
          }}
        />
      </div>

      <nav className={`fixed top-1 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="container mx-auto px-6">
          <div className={`relative rounded-2xl transition-all duration-300 ${
            isScrolled 
              ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-slate-900/5 dark:shadow-slate-900/20' 
              : 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm'
          }`}>
            {/* Animated background gradient */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex items-center justify-between py-4 px-6">
              {/* Logo */}
              <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => scrollToSection("home")}>
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                    <span className="text-white font-bold text-lg">MG</span>
                  </div>
                  <div className="absolute inset-0 w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
                </div>
                <div className="hidden sm:block">
                  <span className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    Md Gulab
                  </span>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Full Stack Developer
                  </div>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.href;
                  
                  return (
                    <div key={item.href} className="relative group">
                      {item.isExternal ? (
                        <a
                          href={item.href}
                          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                            isActive
                              ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                              : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm">{item.label}</span>
                        </a>
                      ) : (
                        <button
                          onClick={() => scrollToSection(item.href)}
                          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                            isActive
                              ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 shadow-md'
                              : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm">{item.label}</span>
                        </button>
                      )}
                      
                      {/* Active indicator */}
                      {isActive && !item.isExternal && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Right side controls */}
              <div className="flex items-center space-x-3">
                {/* Theme Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="relative w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 transform hover:scale-110"
                >
                  <div className="relative w-5 h-5">
                    <Sun className={`absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-500 ${
                      theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
                    }`} />
                    <Moon className={`absolute inset-0 w-5 h-5 text-slate-700 dark:text-slate-300 transition-all duration-500 ${
                      theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                    }`} />
                  </div>
                </Button>

                {/* Mobile Menu */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
                    >
                      <div className="relative w-5 h-5">
                        <Menu className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                          isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                        }`} />
                        <X className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                          isOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                        }`} />
                      </div>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[320px] sm:w-[400px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex flex-col h-full">
                      {/* Mobile Header */}
                      <div className="flex items-center space-x-3 pb-6 border-b border-slate-200 dark:border-slate-700">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">MG</span>
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 dark:text-white">Md Gulab</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">Full Stack Developer</div>
                        </div>
                      </div>

                      {/* Mobile Navigation */}
                      <div className="flex-1 py-6">
                        <div className="space-y-2">
                          {navItems.map((item, index) => {
                            const Icon = item.icon;
                            const isActive = activeSection === item.href;
                            
                            return (
                              <div
                                key={item.href}
                                className="transform transition-all duration-300"
                                style={{
                                  animationDelay: `${index * 0.1}s`,
                                  animation: isOpen ? 'slideInRight 0.4s ease-out forwards' : 'none'
                                }}
                              >
                                {item.isExternal ? (
                                  <a
                                    href={item.href}
                                    className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                                      isActive
                                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                    }`}
                                  >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                  </a>
                                ) : (
                                  <button
                                    onClick={() => scrollToSection(item.href)}
                                    className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                                      isActive
                                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                    }`}
                                  >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                    {isActive && (
                                      <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
                                    )}
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Mobile Footer */}
                      <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                          © 2025 Md Gulab
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;