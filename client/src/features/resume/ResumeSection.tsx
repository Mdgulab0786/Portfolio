import { Download, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ResumeSection = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      // Simulate download delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create a link and trigger download
      const link = document.createElement("a");
      link.href = "/md-gulab-resume.pdf";
      link.download = "Md-Gulab-Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Success!",
        description: "Resume downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download resume",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12">
          <div className="flex-1 text-white">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8" />
              <h2 className="text-3xl md:text-4xl font-bold">
                Download My Resume
              </h2>
            </div>
            <p className="text-blue-100 text-lg mb-6">
              Get a detailed overview of my skills, experience, and achievements
              in PDF format.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Professional Format</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Updated Recently</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>ATS Friendly</span>
              </div>
            </div>
          </div>

          <div>
            <Button
              size="lg"
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold text-lg px-8 py-6 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300"
            >
              {isDownloading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-3" />
                  Download Resume
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
