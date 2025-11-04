import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Link, Share2 } from 'lucide-react';
import banner from "@/assets/images/entraidconnect/banner.png";
import topology from "@/assets/images/dhcp/topology.png";
import entraarticle from "@/entraid.html?raw"; 
import project2 from "@/dhcp.html?raw"; 
import  "@/assets/portfolio.css";
import adusers from "@/assets/images/entraidconnect/ADusers.png";
import express from "@/assets/images/entraidconnect/express_settings.png";
import beforesync from "@/assets/images/entraidconnect/2entraidbeforesync.png";
import globalcred from "@/assets/images/entraidconnect/3enterglobalcred.png";
import addscred from "@/assets/images/entraidconnect/4enteraddscred.png"; 
import selectupn from "@/assets/images/entraidconnect/5continuematching.png"; 
import install from "@/assets/images/entraidconnect/5 install.png"; 
import syncedusers from "@/assets/images/entraidconnect/6syncedusers.png"; 
import syncedgroups from "@/assets/images/entraidconnect/7syncedgroups.png"; 
import customised from "@/assets/images/entraidconnect/8customise.png"; 
import addforest from "@/assets/images/entraidconnect/9addforest.png";
import selectOUs from "@/assets/images/entraidconnect/10selectOUs.png";
import writebacks from "@/assets/images/entraidconnect/11writebacks.png";
import finalgroupss from "@/assets/images/entraidconnect/12finalgroups.png"; 



import vnet from "@/assets/images/dhcp/vneteditor.png";
import dc from "@/assets/images/dhcp/dcsettings.png";
import eth from "@/assets/images/dhcp/ethernet1.png";
import scope from "@/assets/images/dhcp/dhcpscope.png";
import hrscope from "@/assets/images/dhcp/hr.png";
import salesscope from "@/assets/images/dhcp/sales.png";
import itscope from "@/assets/images/dhcp/it.png";
import marketingscope from "@/assets/images/dhcp/marketing.png";
import router0 from "@/assets/images/dhcp/r0.png";
import edger1 from "@/assets/images/dhcp/edge1.png";
import edger2 from "@/assets/images/dhcp/edge2.png";
import router1 from "@/assets/images/dhcp/r1.png";
import router2 from "@/assets/images/dhcp/r2.png";
import r1route from "@/assets/images/dhcp/r1route.png";
import r2route from "@/assets/images/dhcp/r2route.png";
import hrdhcp from "@/assets/images/dhcp/hrpc.png";
import saleshdcp from "@/assets/images/dhcp/salespc.png";
import itdhcp from "@/assets/images/dhcp/itpc.png";
import marketingdhcp from "@/assets/images/dhcp/marketingpc.png";
import scopehr from "@/assets/images/dhcp/hrscope.png";
import scopesales from "@/assets/images/dhcp/salesscope.png";
import scopeit from "@/assets/images/dhcp/itscope.png";
import scopemarketing from "@/assets/images/dhcp/marketingscope.png";







// Helper function to create a URL-friendly slug from a title
const createSlug = (title) => title.toLowerCase().replace(/\s+/g, '-').replace(/[!?,.:;"()]/g, '');

const entra = entraarticle
    .replace("{{adusers}}", adusers)
    .replace("{{express}}", express)
    .replace("{{beforesync}}", beforesync)
    .replace("{{globalcred}}", globalcred)
    .replace("{{selectupn}}", selectupn)
    .replace("{{install}}", install)
    .replace("{{syncedusers}}", syncedusers)
    .replace("{{syncedgroups}}", syncedgroups)
    .replace("{{customised}}", customised)
    .replace("{{addforest}}", addforest)
    .replace("{{selectOUs}}", selectOUs)
    .replace("{{writebacks}}", writebacks)
    .replace("{{finalgroupss}}", finalgroupss)
    .replace("{{addscred}}", addscred);

    const projectec = project2
    .replace("{{vnet}}", vnet)
    .replace("{{topology}}", topology)
    .replace("{{dc}}", dc)
    .replace("{{eth}}", eth)
    .replace("{{scope}}", scope)
    .replace("{{hrscope}}", hrscope)
    .replace("{{salescope}}", salesscope)
    .replace("{{itscope}}", itscope)
    .replace("{{marketingscope}}", marketingscope)
    .replace("{{r0}}", router0)
    .replace("{{edge1}}", edger1)
    .replace("{{edge2}}", edger2)
    .replace("{{r1}}", router1)
    .replace("{{r2}}", router2)
    .replace("{{r1route}}", r1route)
    .replace("{{r2route}}", r2route)
    .replace("{{hrdhcp}}", hrdhcp)
    .replace("{{salesdhcp}}", saleshdcp)
    .replace("{{itdhcp}}", itdhcp)
    .replace("{{marketingdhcp}}", marketingdhcp)
    .replace("{{scopehr}}", scopehr)
    .replace("{{scopesales}}", scopesales)
    .replace("{{scopeit}}", scopeit)
    .replace("{{scopemarketing}}", scopemarketing);

    
// Data for the projects, with an added 'longDescription' and 'date' for the detail page.
const projects = [
 
  /**{
    title: "Configuring Self-Service Password Reset in Microsoft Entra ID",
    description: "Configured Entra ID Connect to sync On-Prem users to Entra ID",
    date: "2025-10-23",
    longDescription: entra,
    tags: ["Entra ID Connect", "Hybrid Identity", "Active Directory", "Synchronization", "Single Sign-On", "Password Writeback"],
    image: banner
  }, **/
  
  {
    title: "DHCP Deployment with Cross-VM Custom VNet Integration in VMware",
    description: "Configured DHCP Relay in an EVE-NG topology to assign IP addresses from a centralized Windows Server hosted on a separate VMware Custom VNet.",
    date: "2025-10-20",
    longDescription: projectec,
    tags: ["VMware", "DHCP Relay", "Windows Server", "OSPF", "Custom VNet"],
    image: topology
  },
   {
    title: "Implementing Hybrid Identity with Microsoft Entra ID Connect",
    description: "Configured Entra ID Connect to sync On-Prem users to Entra ID",
    date: "2025-10-16",
    longDescription: entra,
    tags: ["Entra ID Connect", "Hybrid Identity", "Active Directory", "Synchronization", "Single Sign-On", "Password Writeback"],
    image: banner
  },

];


// Component for the grid of project cards
function ProjectsGrid({ onProjectSelect }) {
  return (
    <section id="projects" className="bg-background text-foreground py-24 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
          Featured Projects
        </h2>
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              layoutId={`card-container-${project.title}`}
              className="bg-card rounded-xl shadow-lg overflow-hidden group cursor-pointer flex flex-col" 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.1 }}
              whileHover={{ scale: 1.03, boxShadow: '0px 10px 30px rgba(0, 255, 255, 0.1)' }}
              onClick={() => onProjectSelect(project)}
            >
              <motion.div layoutId={`card-image-${project.title}`} className="w-full h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/1200x800/0f172a/94a3b8?text=Image+Not+Found'; }}
                />
              </motion.div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-blue-400 transition-colors"> 
                  {project.title}
                </h3>
                 <p className="text-muted-foreground text-xs mb-2"> 
                    {new Date(project.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>
                <p className="text-muted-foreground text-sm mb-4 flex-grow">
                  {project.description}
                </p>
                <div className="flex justify-end mt-auto">
                    <span className="text-sm text-teal-400 group-hover:underline">View Details &rarr;</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Component for the detailed project view (the "blog post" overlay)
function ProjectDetail({ project, onBack }) {
    const scrollContainerRef = useRef(null);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [copyText, setCopyText] = useState('Copy Link');
    const lastScrollY = useRef(0);

    useEffect(() => {
        // Force scroll to top on mount
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
            setIsButtonVisible(true);
        }

        // Logic to show/hide the sticky button based on scroll direction
        const handleScroll = () => {
            const container = scrollContainerRef.current;
            if (container) {
                const currentScrollY = container.scrollTop;
                // Show button if scrolling up OR near the top (less than 100px scroll)
                if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
                    setIsButtonVisible(true);
                } else {
                    // Hide button if scrolling down significantly
                    setIsButtonVisible(false);
                }
                lastScrollY.current = currentScrollY;
            }
        };

        const currentRef = scrollContainerRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', handleScroll, { passive: true });
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', handleScroll);
            }
        };
    }, [project]);

    const handleCopyLink = () => {
        const link = window.location.href;
        navigator.clipboard.writeText(link).then(() => {
            setCopyText('Copied!');
            setTimeout(() => setCopyText('Copy Link'), 2000);
        }).catch(err => {
            console.error('Could not copy text: ', err);
            setCopyText('Error!');
            setTimeout(() => setCopyText('Copy Link'), 2000);
        });
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: project.title,
                text: project.title,
                url: window.location.href,
            }).catch(err => console.error('Error sharing', err));
        } else {
            alert("Web Share API is not supported in this browser.");
        }
    };

    return (
        <motion.div 
            ref={scrollContainerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm text-foreground p-4 sm:p-8 overflow-y-auto" 
        >
            <div className="max-w-4xl mx-auto relative">
                <div className="sticky top-0 z-10 h-12 flex items-center pointer-events-none">
                    <AnimatePresence>
                        {isButtonVisible && (
                            <motion.button
                                onClick={onBack}
                                initial={{ y: '-150%', opacity: 0 }}
                                animate={{ y: '0%', opacity: 1 }}
                                exit={{ y: '-150%', opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                // UPDATED: Added glass effect (bg-card/90 and backdrop-blur-md) and padding
                                className="flex items-center gap-2 font-semibold bg-card/90 backdrop-blur-md rounded-full shadow-lg border border-border/70 px-4 py-2 hover:border-blue-400 transition-all duration-300
                                           bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 pointer-events-auto"
                            >
                                <ArrowLeft size={20} className="text-blue-400" />
                                <span className="text-base text-primary">Back to Projects</span>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

                <div className="bg-card rounded-2xl shadow-2xl shadow-teal-500/20 p-8 -mt-12">
                    <motion.div 
                        layoutId={`card-image-${project.title}`}
                        className="w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8"
                    >
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/1200x800/0f172a/94a3b8?text=Image+Not+Found'; }}
                        />
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-black text-foreground mb-2">{project.title}</h1>
                    <p className="text-muted-foreground text-sm mb-6">
                        Posted on {new Date(project.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span 
                                    key={tag} 
                                    className="bg-muted/70 text-blue-400 border border-blue-400/50 text-xs font-mono px-3 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <button onClick={handleCopyLink} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors bg-muted/70 px-3 py-1 rounded-full">
                                <Link size={14} />
                                {copyText}
                            </button>
                            <button onClick={handleShare} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors bg-muted/70 px-3 py-1 rounded-full">
                                <Share2 size={14} />
                                Share
                            </button>
                        </div>
                    </div>

                    <div 
                        className="prose prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed test-mic" 
                        dangerouslySetInnerHTML={{ __html: project.longDescription }}
                    />
                </div>
            </div>
        </motion.div>
    );
}

// Main App component to manage state and switch between views
// ... (All code above this point remains the same) ...

// Main App component to manage state and switch between views
export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleSelectProject = (project) => {
    const slug = createSlug(project.title);
    window.location.hash = slug;
    window.dispatchEvent(new CustomEvent('project-detail-view', {
    detail: { isOpen: true }
  }));
  };

  const handleGoBack = () => {
    window.location.hash = 'projects';
     window.dispatchEvent(new CustomEvent('project-detail-view', {
    detail: { isOpen: false }
  }));
  };

  // --- START: UPDATED SCROLL LOCK LOGIC ---
  useEffect(() => {
    const isProjectOpen = selectedProject !== null;
    
    if (isProjectOpen) {
      document.body.style.overflow = 'hidden';
      // Optionally add a class for broader CSS control/compatibility
      document.body.classList.add('modal-open'); 
    } else {
      document.body.style.overflow = ''; // Resets to default
      document.body.classList.remove('modal-open');
    }

    // Cleanup function ensures scrolling is re-enabled when the component unmounts or state changes
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [selectedProject]);
  // --- END: UPDATED SCROLL LOCK LOGIC ---

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const projectFromHash = projects.find(p => createSlug(p.title) === hash);
        setSelectedProject(projectFromHash || null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);


  return (
    <div className="bg-background">
        <ProjectsGrid onProjectSelect={handleSelectProject} />
        <AnimatePresence>
            {selectedProject && (
                <ProjectDetail 
                    key={selectedProject.title}
                    project={selectedProject} 
                    onBack={handleGoBack} 
                />
            )}
        </AnimatePresence>
    </div>
  );
}