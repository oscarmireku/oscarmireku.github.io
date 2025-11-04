import { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "@/assets/css/tomorrow.css";
import itsupport from "@/assets/images/itsupport.png";
import awsazure from "@/assets/images/awsazure.webp";
import networking from "@/assets/images/networking.jpg"
import Meteors from "@/components/ui/meteors";
import AboutMePage from "@/pages/About/About";
import SKillsPage from "@/pages/Skills/Skills";
import ProjectsPage from "@/pages/Projects/Projects";
import ExperiencePage from "@/pages/Experience/Experience";
import EducationPage from "@/pages/Education/Education";
import ContactPage from "@/pages/Contact/Contact";
import SparklesText from "@/components/ui/sparkles-text";
import { FlipWords } from "@/components/ui/flip-words";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "IT Technical Support ",
    text: "Providing frontline support for technical issues across desktops and networks.",
    image: itsupport
  },
  {
    title: "Cloud Engineering",
    text: "Deploying hybrid cloud solutions using Azure, AWS, and on-prem infrastructure.",
    image: awsazure
  },
  {
    title: "Network Administration",
    text: "Designing and managing secure, high-performance local and wide area networks.",
    image: networking
  },
];

const words = ["Network Administratior", "IT Support", "Azure Administrator"];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Updated bg-[#020617] to bg-background */}
      <main className="bg-background text-foreground min-h-screen">
        <section id="home" className="hero min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-0 hero-section-padding overflow-x-hidden" style={{ paddingTop: "var(--hero-padding-top, 0)" }}>
          <Meteors number={20} />
          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10 py-8 md:py-10 lg:py-12 md:pt-28 xl:pt-28">
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
              {/* Updated hardcoded colors to theme-aware classes */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 mb-6">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                {/* Updated text-gray-300 to text-muted-foreground */}
                <span className="text-muted-foreground text-sm font-medium">Welcome to my portfolio</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <SparklesText text="Hello" /> I&apos;m <span className="typing-effect gradient-text">Oscar Mireku</span>
              </h1>
              <div className="mt-4 inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-teal-500/10 border border-blue-500/20">
                <FlipWords className="text-xl text-blue-400 font-medium" words={words} />
              </div>
              {/* Updated text-gray-300/90 to text-muted-foreground */}
              <p className="mt-6 text-xl text-muted-foreground">Network Administrator 📡 | Windows Server 🖥 | Cloud Platforms (AWS, Azure) ☁</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-6">
                <a href="https://www.linkedin.com/in/oscarmireku/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-xl font-medium hover:scale-105 transition inline-flex items-center gap-2">
  <i className="fab fa-linkedin"></i>
  LinkedIn
</a>
                {/* Updated hardcoded colors to theme-aware classes */}
                <a href="https://drive.google.com/file/d/1o5-g_sISzopqGWKn1isasJidBsDyh_Uq/view?usp=sharing" target="_blank" className="px-6 py-3 bg-card text-foreground border border-border rounded-xl font-medium hover:text-primary transition">
                  Resume
                </a>
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  // Updated hardcoded bg-gray-900 to bg-card
                  className="w-full h-[320px] sm:h-[350px] lg:h-[400px] overflow-hidden rounded-xl bg-card shadow-xl relative" 
                >
                  <img src={slides[current].image} alt={slides[current].title} className="w-full h-full object-cover rounded-xl" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                    <h3 className="text-xl font-semibold mb-2">{slides[current].title}</h3>
                    {/* Updated text-gray-300 to text-muted-foreground/90 */}
                    <p className="text-sm">{slides[current].text}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-center gap-2 mt-4">
                {slides.map((_, idx) => (
                  <motion.span
                    key={idx}
                    animate={{ scale: idx === current ? 1.25 : 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    // Updated bg-gray-600 to bg-muted-foreground
                    className={`w-3 h-3 rounded-full ${idx === current ? "bg-blue-400" : "bg-muted-foreground"}`}
                  ></motion.span>
                ))}
              </div>
            </div>
          </div>
        </section>
        <SKillsPage />
        <ProjectsPage />
        <ExperiencePage />
        <AboutMePage />
        <ContactPage />
      </main>
    </>
  );
}