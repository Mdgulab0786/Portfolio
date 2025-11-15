import React, { useState, useEffect } from "react";
import { ContactService } from "@/services/contactService";
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
  ExternalLink,
} from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  budget?: string;
  timeline?: string;
  projectType?: string;
}

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
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    budget: "",
    timeline: "",
    projectType: "",
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

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

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject || formData.subject.length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    }

    if (!formData.message || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitStatus("submitting");

    try {
      // Submit to Supabase database
      const submission = await ContactService.submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        subject: formData.subject,
        message: formData.message,
        budget: formData.budget,
        timeline: formData.timeline,
        project_type: formData.projectType,
      });

      console.log("Form submitted successfully:", submission);

      setSubmitStatus("success");
      setSubmitMessage(
        "🎉 Message sent successfully! I'll get back to you within 24 hours."
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        budget: "",
        timeline: "",
        projectType: "",
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Form submission failed:", error);
      setSubmitStatus("error");
      setSubmitMessage(
        `❌ Failed to send message: ${
          error instanceof Error ? error.message : "Unknown error"
        }. Please try again or email me directly at team66415@gmail.com`
      );
    }
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: Mail,
      title: "Email",
      value: "team66415@gmail.com",
      link: "mailto:team66415@gmail.com",
      description: "Send me an email anytime",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 9711214379",
      link: "tel:+919711214379",
      description: "Call me for urgent matters",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "New Delhi, India",
      description: "Available for remote work globally",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "Within 24 hours",
      description: "I typically respond quickly",
      color: "from-orange-500 to-red-500",
    },
  ];

  const socialLinks: SocialLink[] = [
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/md-gulab-team66/",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
    },
    {
      icon: Github,
      name: "GitHub",
      url: "https://github.com/Mdgulab0786",
      color: "bg-gray-800",
      hoverColor: "hover:bg-gray-900",
    },
    {
      icon: Twitter,
      name: "Twitter",
      url: "#",
      color: "bg-sky-500",
      hoverColor: "hover:bg-sky-600",
    },
    {
      icon: Instagram,
      name: "Instagram",
      url: "#",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      hoverColor: "hover:from-purple-600 hover:to-pink-600",
    },
  ];

  const projectTypes = [
    "Web Development",
    "Mobile App",
    "E-commerce",
    "Portfolio Website",
    "Business Website",
    "Custom Software",
    "API Development",
    "Other",
  ];

  const budgetRanges = [
    "Under $1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000+",
    "Let's discuss",
  ];

  const timelineOptions = [
    "ASAP",
    "1-2 weeks",
    "1 month",
    "2-3 months",
    "3+ months",
    "Flexible",
  ];

  return (
    <section
      id="contact"
      className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div
          className={`text-center mb-20 ${
            isVisible ? "animate-slideInUp" : "opacity-0"
          }`}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 rounded-3xl mb-8 shadow-2xl shadow-blue-500/30 animate-bounce">
            <MessageSquare className="w-10 h-10 text-white" />
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
          </div>

          <h2 className="text-6xl font-black text-slate-800 dark:text-white mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Let's Create Something Amazing
          </h2>

          <p className="text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? I'm here to help you build
            exceptional digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          {/* Contact Information Cards */}
          <div
            className={`xl:col-span-1 space-y-8 ${
              isVisible ? "animate-slideInUp" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={index}
                    className={`group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-200/60 dark:border-slate-700/60 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden ${
                      activeCard === index ? "scale-105" : ""
                    }`}
                    onMouseEnter={() => setActiveCard(index)}
                    onMouseLeave={() => setActiveCard(null)}
                    onClick={() =>
                      info.link && window.open(info.link, "_blank")
                    }
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${info.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />

                    <div className="relative flex items-center space-x-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${info.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
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
          <div
            className={`xl:col-span-2 ${
              isVisible ? "animate-slideInRight" : "opacity-0"
            }`}
            style={{ animationDelay: "0.4s" }}
          >
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
              </div>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="mx-8 mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700 rounded-2xl animate-bounceIn">
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mr-3 animate-pulse" />
                    <div>
                      <p className="font-bold text-green-800 dark:text-green-300">
                        Success!
                      </p>
                      <p className="text-green-700 dark:text-green-400">
                        {submitMessage}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mx-8 mt-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 border border-red-200 dark:border-red-700 rounded-2xl animate-bounceIn">
                  <div className="flex items-center">
                    <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 mr-3" />
                    <div>
                      <p className="font-bold text-red-800 dark:text-red-300">
                        Error
                      </p>
                      <p className="text-red-700 dark:text-red-400">
                        {submitMessage}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={onSubmit} className="p-8 space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-slate-800 dark:text-white flex items-center">
                    <User className="w-5 h-5 mr-3 text-blue-500" />
                    Personal Information
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-slate-700 dark:text-slate-300 font-semibold mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full h-12 border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-slate-50 dark:bg-slate-700 px-4 transition-all duration-300"
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-slate-700 dark:text-slate-300 font-semibold mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full h-12 border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-slate-50 dark:bg-slate-700 px-4 transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-slate-700 dark:text-slate-300 font-semibold mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full h-12 border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-slate-50 dark:bg-slate-700 px-4 transition-all duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-slate-700 dark:text-slate-300 font-semibold mb-2"
                      >
                        Company/Organization
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full h-12 border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-slate-50 dark:bg-slate-700 px-4 transition-all duration-300"
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
                      <label
                        htmlFor="projectType"
                        className="block text-slate-700 dark:text-slate-300 font-semibold mb-2"
                      >
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full h-12 border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-slate-50 dark:bg-slate-700 px-4 transition-all duration-300"
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-slate-700 dark:text-slate-300 font-semibold mb-2"
                      >
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full h-12 border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-slate-50 dark:bg-slate-700 px-4 transition-all duration-300"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="timeline"
                        className="block text-slate-700 dark:text-slate-300 font-semibold mb-2"
                      >
                        Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full h-12 border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-slate-50 dark:bg-slate-700 px-4 transition-all duration-300"
                      >
                        <option value="">Select timeline</option>
                        {timelineOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Message Section */}
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-slate-700 dark:text-slate-300 font-semibold mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full h-12 border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-slate-50 dark:bg-slate-700 px-4 transition-all duration-300"
                      placeholder="Brief description of your project"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="message"
                        className="block text-slate-700 dark:text-slate-300 font-semibold"
                      >
                        Project Description *
                      </label>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {formData.message?.length || 0}/1000 characters
                      </span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      maxLength={1000}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-slate-50 dark:bg-slate-700 p-4 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project goals, requirements, features you need, target audience, and any specific preferences or constraints..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
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
                  </button>
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
      </div>
    </section>
  );
};

export default ContactSection;
