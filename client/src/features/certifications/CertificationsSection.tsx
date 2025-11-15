import { Award, ExternalLink, Calendar, Building, Star, Trophy, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Certificate {
  id: number;
  name: string;
  platform: string;
  year: number;
  description?: string;
  link?: string;
  category: "certification" | "achievement";
  skills?: string[];
  image?: string;
  rating?: number;
}

const CertificationsSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const certificates: Certificate[] = [
    {
      id: 1,
      name: "Full Stack Web Development",
      platform: "Coursera",
      year: 2024,
      description: "Comprehensive course covering React, Node.js, and MongoDB",
      link: "https://coursera.org/certificate/example1",
      category: "certification",
      skills: ["React", "Node.js", "MongoDB"],
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5
    },
    {
      id: 2,
      name: "JavaScript Algorithms and Data Structures",
      platform: "freeCodeCamp",
      year: 2023,
      description: "Advanced JavaScript programming and problem-solving",
      link: "https://freecodecamp.org/certificate/example2",
      category: "certification",
      skills: ["JavaScript", "Algorithms", "Data Structures"],
      image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5
    },
    {
      id: 3,
      name: "React Developer Certification",
      platform: "Meta",
      year: 2024,
      description: "Professional React development certification from Meta",
      link: "https://meta.com/certificate/example3",
      category: "certification",
      skills: ["React", "JSX", "Hooks"],
      image: "https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5
    },
    {
      id: 4,
      name: "Best Project Award",
      platform: "College Tech Fest",
      year: 2024,
      description: "Won first place for innovative web application project",
      category: "achievement",
      skills: ["Innovation", "Leadership"],
      image: "https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5
    },
    {
      id: 5,
      name: "Python for Data Science",
      platform: "IBM",
      year: 2023,
      description: "Data analysis and visualization using Python",
      link: "https://ibm.com/certificate/example5",
      category: "certification",
      skills: ["Python", "Data Science", "Pandas"],
      image: "https://images.pexels.com/photos/11035467/pexels-photo-11035467.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4
    },
    {
      id: 6,
      name: "Hackathon Winner",
      platform: "TechCrunch Disrupt",
      year: 2024,
      description: "2nd place in 48-hour coding challenge",
      category: "achievement",
      skills: ["Problem Solving", "Teamwork"],
      image: "https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5
    }
  ];

  const certifications = certificates.filter(cert => cert.category === "certification");
  const achievements = certificates.filter(cert => cert.category === "achievement");

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? "text-yellow-400 fill-current"
              : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ))}
    </div>
  );

  const CertificateCard = ({ certificate, index }: { certificate: Certificate; index: number }) => (
    <div 
      className={`group relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-slate-200 dark:border-slate-700 overflow-hidden ${
        hoveredCard === certificate.id ? 'scale-105' : ''
      }`}
      onMouseEnter={() => setHoveredCard(certificate.id)}
      onMouseLeave={() => setHoveredCard(null)}
      style={{
        animationDelay: `${index * 0.1}s`,
        animation: 'slideInUp 0.6s ease-out forwards'
      }}
    >
      {/* Certificate Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={certificate.image}
          alt={certificate.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
          certificate.category === "certification" 
            ? "bg-blue-500 text-white" 
            : "bg-amber-500 text-white"
        }`}>
          {certificate.category === "certification" ? "Certificate" : "Achievement"}
        </div>

        {/* External Link Button */}
        {certificate.link && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 w-8 h-8 p-0 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300"
            onClick={() => window.open(certificate.link, '_blank')}
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        )}

        {/* Award Icon Overlay */}
        <div className={`absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center ${
          certificate.category === "certification" 
            ? "bg-blue-500/20 backdrop-blur-sm" 
            : "bg-amber-500/20 backdrop-blur-sm"
        } opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0`}>
          {certificate.category === "certification" ? (
            <Award className="w-6 h-6 text-white" />
          ) : (
            <Trophy className="w-6 h-6 text-white" />
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {certificate.name}
          </h3>
        </div>

        <div className="flex items-center text-slate-600 dark:text-slate-300 mb-2">
          <Building className="w-4 h-4 mr-2 text-blue-500" />
          <span className="font-medium">{certificate.platform}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-slate-500 dark:text-slate-400">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{certificate.year}</span>
          </div>
          {certificate.rating && <StarRating rating={certificate.rating} />}
        </div>

        {certificate.description && (
          <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm leading-relaxed">
            {certificate.description}
          </p>
        )}

        {certificate.skills && (
          <div className="flex flex-wrap gap-2 mb-4">
            {certificate.skills.map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-200 dark:border-slate-600 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all duration-200"
                style={{
                  animationDelay: `${skillIndex * 0.1}s`,
                  animation: 'fadeInScale 0.4s ease-out forwards'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Progress Bar Animation */}
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out ${
              certificate.category === "certification" 
                ? "bg-gradient-to-r from-blue-500 to-indigo-500" 
                : "bg-gradient-to-r from-amber-500 to-orange-500"
            }`}
            style={{
              width: hoveredCard === certificate.id ? '100%' : '0%'
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <section id="certifications" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6 animate-bounce">
            <Medal className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-5xl font-bold text-slate-800 dark:text-white mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Certifications & Achievements
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            My journey of continuous learning and recognition in the world of technology
          </p>
        </div>

        {/* Certifications Section */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center bg-white dark:bg-slate-800 rounded-2xl px-6 py-4 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
                Professional Certifications
              </h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((certificate, index) => (
              <CertificateCard key={certificate.id} certificate={certificate} index={index} />
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center bg-white dark:bg-slate-800 rounded-2xl px-6 py-4 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
                Awards & Achievements
              </h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((certificate, index) => (
              <CertificateCard key={certificate.id} certificate={certificate} index={index} />
            ))}
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div className="relative">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-center mb-8">My Learning Journey</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="group">
                  <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {certifications.length}
                  </div>
                  <div className="text-blue-100 text-lg">Professional Certifications</div>
                  <div className="w-16 h-1 bg-gradient-to-r from-yellow-300 to-orange-300 mx-auto mt-2 rounded-full" />
                </div>
                <div className="group">
                  <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-green-300 to-teal-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {achievements.length}
                  </div>
                  <div className="text-blue-100 text-lg">Awards & Achievements</div>
                  <div className="w-16 h-1 bg-gradient-to-r from-green-300 to-teal-300 mx-auto mt-2 rounded-full" />
                </div>
                <div className="group">
                  <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {new Date().getFullYear() - Math.min(...certificates.map(c => c.year))}+
                  </div>
                  <div className="text-blue-100 text-lg">Years of Learning</div>
                  <div className="w-16 h-1 bg-gradient-to-r from-pink-300 to-purple-300 mx-auto mt-2 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;