import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  MessageSquare, 
  User, 
  Building, 
  Calendar,
  Star,
  Globe,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Zap,
  Heart,
  Sparkles,
  ArrowRight,
  Download,
  ExternalLink
} from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from '@emailjs/browser';

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  projectType: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface ContactInfo {
  icon: any;
  title: string;
  value: string;
  link?: string;
  description: string;
  color: string;
}

interface SocialLink {
  icon: any;
  name: string;
  url: string;
  color: string;
  hoverColor: string;
}

const ContactSection = () => {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("contact");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const watchedFields = watch();

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("submitting");
    
    try {
      // Method 1: EmailJS (Recommended for direct email delivery)
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone || 'Not provided',
        company: data.company || 'Not provided',
        subject: data.subject,
        message: data.message,
        budget: data.budget || 'Not specified',
        timeline: data.timeline || 'Not specified',
        project_type: data.projectType || 'Not specified',
        to_email: 'team66415@gmail.com', // Your email
      };

      // Replace these with your EmailJS credentials
      const result = await emailjs.send(
        'YOUR_SERVICE_ID',    // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID',   // Replace with your EmailJS template ID
        templateParams
      );

      if (result.status === 200) {
        setSubmitStatus("success");
        setSubmitMessage("🎉 Message sent successfully! I'll get back to you within 24 hours.");
        reset();
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
        }, 5000);
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Email sending failed:", error);
      
      // Fallback: Try Netlify forms if EmailJS fails
      try {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value || '');
        });
        formData.append('form-name', 'contact');

        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData as any).toString()
        });

        if (response.ok) {
          setSubmitStatus("success");
          setSubmitMessage("✅ Message sent via backup system! I'll respond soon.");
          reset();
        } else {
          throw new Error("Backup system failed");
        }
      } catch (backupError) {
        setSubmitStatus("error");
        setSubmitMessage("❌ Failed to send message. Please try emailing me directly at team66415@gmail.com");
      }
    }
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: Mail,
      title: "Email",
      value: "team66415@gmail.com",
      link: "mailto:team66415@gmail.com",
      description: "Send me an email anytime",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 9711214379",
      link: "tel:+919711214379",
      description: "Call me for urgent matters",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "New Delhi, India",
      description: "Available for remote work globally",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "Within 24 hours",
      description: "I typically respond quickly",
      color: "from-orange-500 to-red-500"
    }
  ];

  const socialLinks: SocialLink[] = [
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/md-gulab-team66/",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700"
    },
    {
      icon: Github,
      name: "GitHub",
      url: "https://github.com/Mdgulab0786",
      color: "bg-gray-800",
      hoverColor: "hover:bg-gray-900"
    },
    {
      icon: Twitter,
      name: "Twitter",
      url: "#",
      color: "bg-sky-500",
      hoverColor: "hover:bg-sky-600"
    },
    {
      icon: Instagram,
      name: "Instagram",
      url: "#",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      hoverColor: "hover:from-purple-600 hover:to-pink-600"
    }
  ];

  const projectTypes = [
    "Web Development",
    "Mobile App",
    "E-commerce",
    "Portfolio Website",
    "Business Website",
    "Custom Software",
    "API Development",
    "Other"
  ];

  const budgetRanges = [
    "Under $1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000+",
    "Let's discuss"
  ];

  const timelineOptions = [
    "ASAP",
    "1-2 weeks",
    "1 month",
    "2-3 months",
    "3+ months",
    "Flexible"
  ];

  return (
    <section
      id="contact"
      className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-pink-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-20 ${isVisible ? 'animate-slideInUp' : 'opacity-0'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 rounded-3xl mb-8 shadow-2xl shadow-blue-500/30 animate-bounce">
            <MessageSquare className="w-10 h-10 text-white" />
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
          
          <h2 className="text-6xl font-black text-slate-800 dark:text-white mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Let's Create Something Amazing
          </h2>
          
          <p className="text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? I'm here to help you build exceptional digital experiences.
          </p>
          
          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-700 dark:text-green-400 font-semibold">Available for new projects</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-700 dark:text-blue-400 font-semibold">Quick response guaranteed</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          {/* Contact Information Cards */}
          <div className={`xl:col-span-1 space-y-8 ${isVisible ? 'animate-slideInUp' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            {/* Quick Actions */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-200/60 dark:border-slate-700/60">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                <Zap className="w-6 h-6 text-yellow-500 mr-3" />
                Quick Actions
              </h3>
              
              <div className="space-y-4">
                <Button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = "Md gulab resume.pdf";
                    link.download = "Md_Gulab_Resume.pdf";
                    link.click();
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl py-4 rounded-2xl font-semibold"
                >
                  <Download className="w-5 h-5 mr-3" />
                  Download Resume
                </Button>
                
                <Button
                  onClick={() => window.open("https://calendly.com/your-link", "_blank")}
                  variant="outline"
                  className="w-full border-2 border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-500 hover:text-white transform hover:scale-105 transition-all duration-300 py-4 rounded-2xl font-semibold"
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  Schedule a Call
                </Button>
                
                <Button
                  onClick={() => window.open("https://wa.me/919711214379", "_blank")}
                  variant="outline"
                  className="w-full border-2 border-green-500 text-green-600 dark:text-green-400 hover:bg-green-500 hover:text-white transform hover:scale-105 transition-all duration-300 py-4 rounded-2xl font-semibold"
                >
                  <MessageSquare className="w-5 h-5 mr-3" />
                  WhatsApp Chat
                </Button>
              </div>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={index}
                    className={`group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-200/60 dark:border-slate-700/60 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden ${
                      activeCard === index ? 'scale-105' : ''
                    }`}
                    onMouseEnter={() => setActiveCard(index)}
                    onMouseLeave={() => setActiveCard(null)}
                    onClick={() => info.link && window.open(info.link, "_blank")}
                  >
                    {/* Gradient background on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${info.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <div className="relative flex items-center space-x-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${info.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {info.title}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300 font-semibold">
                          {info.value}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {info.description}
                        </p>
                      </div>
                      
                      {info.link && (
                        <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-200/60 dark:border-slate-700/60">
              <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                <Globe className="w-6 h-6 text-blue-500 mr-3" />
                Connect With Me
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center space-x-3 ${social.color} ${social.hoverColor} text-white p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg group`}
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-semibold">{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`xl:col-span-2 ${isVisible ? 'animate-slideInRight' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/60 dark:border-slate-700/60 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative">
                  <h3 className="text-3xl font-bold mb-2 flex items-center">
                    <Send className="w-8 h-8 mr-4" />
                    Start Your Project
                  </h3>
                  <p className="text-blue-100 text-lg">
                    Tell me about your vision and let's make it reality
                  </p>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white/20 rounded-full animate-spin-slow" />
                <div className="absolute bottom-4 right-8 w-12 h-12 border border-white/30 rounded-full animate-reverse-spin" />
              </div>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="mx-8 mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700 rounded-2xl animate-bounceIn">
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mr-3 animate-pulse" />
                    <div>
                      <p className="font-bold text-green-800 dark:text-green-300">Success!</p>
                      <p className="text-green-700 dark:text-green-400">{submitMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mx-8 mt-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 border border-red-200 dark:border-red-700 rounded-2xl animate-bounceIn">
                  <div className="flex items-center">
                    <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 mr-3" />
                    <div>
                      <p className="font-bold text-red-800 dark:text-red-300">Error</p>
                      <p className="text-red-700 dark:text-red-400">{submitMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
                {/* Hidden Netlify form fields */}
                <input type="hidden" name="form-name" value="contact" />
                
                {/* Personal Information */}
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-slate-800 dark:text-white flex items-center">
                    <User className="w-5 h-5 mr-3 text-blue-500" />
                    Personal Information
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-slate-700 dark:text-slate-300 font-semibold">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        {...register("name")}
                        className="mt-2 h-12 border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-slate-50 dark:bg-slate-700 transition-all duration-300"
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-semibold">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="mt-2 h-12 border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-slate-50 dark:bg-slate-700 transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300 font-semibold">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        {...register("phone")}
                        className="mt-2 h-12 border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-slate-50 dark:bg-slate-700 transition-all duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <Label htmlFor="company" className="text-slate-700 dark:text-slate-300 font-semibold">
                        Company/Organization
                      </Label>
                      <Input
                        id="company"
                        {...register("company")}
                        className="mt-2 h-12 border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-slate-50 dark:bg-slate-700 transition-all duration-300"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-slate-800 dark:text-white flex items-center">
                    <Building className="w-5 h-5 mr-3 text-purple-500" />
                    Project Details
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="projectType" className="text-slate-700 dark:text-slate-300 font-semibold">
                        Project Type
                      </Label>
                      <select
                        id="projectType"
                        {...register("projectType")}
                        className="mt-2 w-full h-12 border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-slate-50 dark:bg-slate-700 px-4 transition-all duration-300"
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="budget" className="text-slate-700 dark:text-slate-300 font-semibold">
                        Budget Range
                      </Label>
                      <select
                        id="budget"
                        {...register("budget")}
                        className="mt-2 w-full h-12 border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-slate-50 dark:bg-slate-700 px-4 transition-all duration-300"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="timeline" className="text-slate-700 dark:text-slate-300 font-semibold">
                        Timeline
                      </Label>
                      <select
                        id="timeline"
                        {...register("timeline")}
                        className="mt-2 w-full h-12 border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-slate-50 dark:bg-slate-700 px-4 transition-all duration-300"
                      >
                        <option value="">Select timeline</option>
                        {timelineOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Message Section */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="subject" className="text-slate-700 dark:text-slate-300 font-semibold">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      {...register("subject")}
                      className="mt-2 h-12 border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-slate-50 dark:bg-slate-700 transition-all duration-300"
                      placeholder="Brief description of your project"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="message" className="text-slate-700 dark:text-slate-300 font-semibold">
                        Project Description *
                      </Label>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {watchedFields.message?.length || 0}/1000 characters
                      </span>
                    </div>
                    <Textarea
                      id="message"
                      {...register("message")}
                      rows={6}
                      maxLength={1000}
                      className="mt-2 border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-slate-50 dark:bg-slate-700 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project goals, requirements, features you need, target audience, and any specific preferences or constraints..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={submitStatus === "submitting"}
                    className="w-full h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/30 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                  >
                    {submitStatus === "submitting" ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Sending Your Message...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="w-6 h-6 mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                        Send Message
                        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    )}
                    
                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="text-center pt-4">
                  <p className="text-slate-600 dark:text-slate-400 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-red-500 mr-2 animate-pulse" />
                    I typically respond within 24 hours
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className={`mt-20 text-center ${isVisible ? 'animate-slideInUp' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative">
              <h3 className="text-4xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Let's discuss your project and create something extraordinary together.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button
                  onClick={() => document.getElementById('name')?.focus()}
                  className="bg-white text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg px-8 py-4 rounded-2xl font-bold"
                >
                  <MessageSquare className="w-5 h-5 mr-3" />
                  Start Project Discussion
                </Button>
                
                <Button
                  onClick={() => window.open("mailto:team66415@gmail.com", "_blank")}
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300 px-8 py-4 rounded-2xl font-bold"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  Email Directly
                </Button>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-8 right-8 w-24 h-24 border-2 border-white/20 rounded-full animate-spin-slow" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border border-white/30 rounded-full animate-reverse-spin" />
            <Sparkles className="absolute top-12 left-12 w-8 h-8 text-yellow-400 animate-pulse" />
            <Star className="absolute bottom-12 right-12 w-6 h-6 text-pink-400 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;