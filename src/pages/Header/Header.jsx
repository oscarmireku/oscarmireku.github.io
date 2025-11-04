import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaLaptopCode,
  FaUser,
  FaBriefcase,
  FaCode,
  FaEnvelope,
  FaBars,
} from "react-icons/fa";
import { Sun, Moon } from "lucide-react";
import { Link as ScrollLink, scroller, Events } from "react-scroll";

/* Simple local theme hook (unchanged) */
const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return { theme, toggleTheme };
};

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [activeLink, setActiveLink] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [scrollY, setScrollY] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const navLinks = [
    { id: "home", icon: FaHome, text: "Home" },
    { id: "skills", icon: FaCode, text: "Skills" },
    { id: "projects", icon: FaLaptopCode, text: "Projects" },
    { id: "experience", icon: FaBriefcase, text: "Experience" },
    { id: "about", icon: FaUser, text: "AboutMe" },
    { id: "contact", icon: FaEnvelope, text: "Contact" },
  ];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    Events.scrollEvent.register("end", () => {});
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      Events.scrollEvent.remove("end");
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const target = hash.replace("#", "");
        setActiveLink(target);
        setTimeout(() => {
          scroller.scrollTo(target, {
            duration: 700,
            delay: 0,
            smooth: "easeInOutQuart",
            offset: 0,
          });
        }, 100);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const handleProjectDetailToggle = (event) => {
      const { isOpen } = event.detail;
      setIsHeaderVisible(!isOpen);
    };
    window.addEventListener("project-detail-view", handleProjectDetailToggle);
    return () => {
      window.removeEventListener("project-detail-view", handleProjectDetailToggle);
    };
  }, []);

  const handleSetActive = (id) => {
    setActiveLink(id);
    window.history.replaceState(null, null, `#${id}`);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-1 left-0 w-full z-40 transition-transform duration-500 ease-in-out transform ${
        scrollY > 100 ? "scale-[0.95]" : "scale-100"      } ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* Mobile hamburger (unchanged placement) */}
      <div className="absolute top-0 w-full md:hidden flex justify-end p-4 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-foreground p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full border border-border/80 shadow-lg mt-4 mr-2"
          aria-label="Toggle navigation menu"
        >
          <FaBars />
        </button>
      </div>

      {/* Desktop navbar pill — now with internal overlay to stop side transparency */}
      <div
        className={`relative mx-auto mt-4 px-6 py-3 hidden md:block max-w-fit rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-xl`}
      >
        {/* Overlay: opaque on sides, glassy in center */}
        <span
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0 rounded-[inherit]
            bg-gradient-to-r
            from-white/95 via-white/70 to-white/95
            dark:from-slate-900/95 dark:via-slate-900/70 dark:to-slate-900/95
          "
        />
        {/* Content must be positioned 'relative' to sit above overlay */}
        <div className="relative flex flex-col md:flex-row md:items-center gap-2 md:gap-1 lg:gap-2 py-4 md:py-0">
          {navLinks.map(({ id, icon: Icon, text }) => (
            <ScrollLink
              key={id}
              to={id}
              spy={true}
              smooth={true}
              offset={0}
              duration={700}
              isDynamic={true}
              hashSpy={true}
              onSetActive={handleSetActive}
              className={`px-3 py-2 md:py-1.5 rounded-lg md:rounded-full text-sm font-medium transition-all duration-500 ease-in-out flex items-center gap-2 
                hover:bg-accent hover:scale-105 hover:shadow-md cursor-pointer
                ${
                  activeLink === id
                    ? "bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-lg ring-2 ring-blue-400 hover:scale-110 hover:rotate-1"
                    : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <Icon
                className={`text-base transition-transform duration-300 ${
                  activeLink === id ? "scale-110 rotate-1" : ""
                }`}
              />
              <span>{text}</span>
            </ScrollLink>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="px-3 py-2 md:py-1.5 rounded-lg md:rounded-full text-sm font-medium transition-all duration-500 ease-in-out flex items-center justify-center 
              hover:bg-accent hover:scale-105 hover:shadow-md cursor-pointer 
              text-muted-foreground hover:text-foreground relative"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown — slightly firmer background to avoid halo */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[70px] right-2 mt-2 w-auto">
          <div className="relative flex flex-col gap-2 p-4 rounded-xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden backdrop-blur-xl">
            {/* overlay to remove edge transparency on mobile menu as well */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none absolute inset-0 rounded-[inherit]
                bg-white/92 dark:bg-slate-900/92
              "
            />
            <div className="relative">
              {navLinks.map(({ id, icon: Icon, text }) => (
                <ScrollLink
                  key={id}
                  to={id}
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={700}
                  onSetActive={handleSetActive}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-500 flex items-center gap-2 
                    hover:bg-accent hover:shadow-md cursor-pointer 
                    ${
                      activeLink === id
                        ? "bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-lg ring-1 ring-blue-400"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                >
                  <Icon className="text-base" />
                  <span>{text}</span>
                </ScrollLink>
              ))}
              <button
                onClick={toggleTheme}
                className="mt-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-500 flex items-center justify-start gap-2 
                  hover:bg-accent hover:shadow-md cursor-pointer 
                  text-muted-foreground hover:text-foreground"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span>Theme Toggle</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
