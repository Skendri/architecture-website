import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef as useReactRef } from "react";
import { ExternalLink, X } from "lucide-react";
import ParallaxHero from "../childComponents/ParallaxHero";

const ProjectsPage = () => {
  const ref = useReactRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      id: 1,
      title: "Modern Residential Complex",
      category: "Residential",
      description:
        "A sustainable residential development featuring innovative green building techniques and modern amenities. This project showcases our commitment to eco-friendly living spaces.",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80",
      features: [
        "Solar Panels",
        "Green Roof",
        "Smart Home Tech",
        "Rainwater Harvesting",
      ],
      status: "Completed",
      year: "2024",
      area: "50,000 sq ft",
      location: "Downtown District",
    },
    {
      id: 2,
      title: "Corporate Headquarters",
      category: "Commercial",
      description:
        "An award-winning office building that combines functionality with stunning architectural design. Features state-of-the-art facilities and sustainable practices.",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",
      features: [
        "LEED Certified",
        "Open Workspaces",
        "Natural Lighting",
        "Green Spaces",
      ],
      status: "Completed",
      year: "2023",
      area: "120,000 sq ft",
      location: "Business Park",
    },
    {
      id: 3,
      title: "Cultural Arts Center",
      category: "Cultural",
      description:
        "A vibrant cultural hub designed to inspire creativity and bring communities together. Features performance halls, galleries, and community spaces.",
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=900&q=80",
      features: [
        "Performance Hall",
        "Gallery Spaces",
        "Community Areas",
        "Outdoor Amphitheater",
      ],      status: "Under Construction",
      year: "2025",
      area: "75,000 sq ft",
      location: "Cultural District",
    },
    {
      id: 4,
      title: "Sustainable School Campus",
      category: "Educational",
      description:
        "An innovative educational facility that promotes learning through sustainable design principles and biophilic architecture.",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?w=900&q=80",
      features: [
        "Natural Ventilation",
        "Outdoor Classrooms",
        "Renewable Energy",
        "Learning Gardens",
      ],
      status: "Completed",
      year: "2024",
      area: "200,000 sq ft",
      location: "University District",
    },
    {
      id: 5,
      title: "Luxury Hotel Resort",
      category: "Hospitality",
      description:
        "A world-class resort that seamlessly blends luxury with environmental consciousness, featuring stunning ocean views and eco-friendly amenities.",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80",
      features: [
        "Ocean Views",
        "Spa Facilities",
        "Eco-Friendly Design",
        "Infinity Pool",
      ],
     status: "Planning",
      year: "2026",
      area: "300,000 sq ft",
      location: "Coastal Area",
    },
    {
      id: 6,
      title: "Urban Mixed-Use Development",
      category: "Mixed-Use",
      description:
        "A comprehensive development that combines residential, commercial, and recreational spaces in a vibrant urban environment.",
      image:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80",
      features: [
        "Retail Spaces",
        "Residential Units",
        "Public Parks",
        "Community Center",
      ],
      status: "Under Construction",
      year: "2025",
      area: "500,000 sq ft",
      location: "Urban Center",
    },
  ];

  const categories = [
    "All",
    "Residential",
    "Commercial",
    "Cultural",
    "Educational",
    "Hospitality",
    "Mixed-Use",
  ];

  // this is for sliders with fade-out white background
  const slides = [
  {
    id: 1,
    title: "Modern Office Design",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000&q=80",
    client: "Corporate Headquarters",
    area: "3206㎡",
    year: "2024"
  },
  {
    id: 2,
    title: "Innovative Workspace",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=2000&q=80",
    client: "Tech Innovation Hub",
    area: "1322㎡",
    year: "2024"
  },
  {
    id: 3,
    title: "Sustainable Architecture",
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=2000&q=80",
    client: "Green Building Complex",
    area: "661㎡",
    year: "2023"
  },
  {
    id: 4,
    title: "Hotel Architecture",
    image: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=2000&q=80",
    client: "Green Building Complex",
    area: "661㎡",
    year: "2023"
  }
]

  // this slide effect is for compoment with slides prop
  const [heroSlideIndex, setHeroSlideIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])
    // this slide effect is for compoment with slides prop
  
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className=" min-h-screen bg-white">

      {/* Hero Section */}
      <section  className="relative w-full h-[100vh] bg-white">
              <ParallaxHero slides={slides} currentSlide={heroSlideIndex} scrollY={scrollY} />
      </section>
      {/* end of Hero Section */}
      
      <section className="py-10 bg-white/5 backdrop-blur-md">
        <div className="container">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold text-black mb-8">
              Our <span>Portfolio</span>
            </h1>
            <p className="text-xl text-black leading-relaxed">
              Explore our comprehensive collection of architectural projects
              spanning residential, commercial, cultural, and institutional
              designs that showcase our commitment to innovation,
              sustainability, and exceptional design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-10 bg-white/5 backdrop-blur-sm" ref={ref}>
        <div className="container">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg"
                    : "bg-white/10 text-black-300 hover:bg-white/20 backdrop-blur-sm"
                }`}
                onClick={() => setSelectedCategory(category)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid with quick view modal*/}
      <section className="relative py-20 bg-gray-900 backdrop-blur-sm">
        <div className="container">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden group hover:bg-white/15 transition-all duration-500"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 50, scale: 0.8 }
                }
                transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Project Image */}
                <div className="relative h-64 bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color}`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-90 mix-blend-luminosity"
                    />
                  </motion.div>

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                        project.status === "Completed"
                          ? "bg-green-500"
                          : project.status === "Under Construction"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <span className="text-cyan-400 font-bold text-sm">
                      {project.year}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Project Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <span className="text-gray-400">Area:</span>
                      <p className="text-white font-semibold">{project.area}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Location:</span>
                      <p className="text-white font-semibold">
                        {project.location}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.features.map((feature, featureIndex) => (
                      <motion.span
                        key={featureIndex}
                        className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs font-medium"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={
                          isInView
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0 }
                        }
                        transition={{
                          delay: 1.0 + index * 0.1 + featureIndex * 0.05,
                          duration: 0.3,
                        }}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "#667eea",
                          color: "white",
                        }}
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>

                  {/* View Details Button */}
                  <motion.button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 rounded-xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Project Details
                    <ExternalLink className="ml-2 group-hover:rotate-12 transition-transform duration-300" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* quick view modal */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-8 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
              >
                <motion.div
                  className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-gray-950 shadow-2xl ring-1 ring-white/15"
                  initial={{ opacity: 0, y: 40, scale: 0.86 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 220, damping: 24 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="relative min-h-[320px] overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900 lg:min-h-[620px]">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${selectedProject.color}`}
                      >
                        <img
                          src={selectedProject.image}
                          alt={selectedProject.title}
                          className="h-full w-full object-cover opacity-95 mix-blend-luminosity"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute left-5 top-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                            selectedProject.status === "Completed"
                              ? "bg-green-500"
                              : selectedProject.status === "Under Construction"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }`}
                        >
                          {selectedProject.status}
                        </span>
                      </div>
                      <div className="absolute right-5 top-5">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                          {selectedProject.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-7 md:p-10">
                      <div className="mb-6 flex items-start justify-between gap-5">
                        <div>
                          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-cyan-400">
                            {selectedProject.year}
                          </p>
                          <h3 className="text-3xl font-bold leading-tight text-white md:text-5xl">
                            {selectedProject.title}
                          </h3>
                        </div>
                        <button
                          type="button"
                          aria-label="Close project details"
                          onClick={() => setSelectedProject(null)}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <p className="mb-8 text-base leading-relaxed text-gray-300 md:text-lg">
                        {selectedProject.description}
                      </p>

                      <div className="mb-8 grid grid-cols-2 gap-4">
                        <div className="rounded-2xl bg-white/5 p-4">
                          <span className="text-sm text-gray-400">Area</span>
                          <p className="mt-1 text-lg font-bold text-white">
                            {selectedProject.area}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-white/5 p-4">
                          <span className="text-sm text-gray-400">
                            Location
                          </span>
                          <p className="mt-1 text-lg font-bold text-white">
                            {selectedProject.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {selectedProject.features.map((feature) => (
                          <span
                            key={feature}
                            className="rounded-full bg-cyan-500/15 px-4 py-2 text-sm font-medium text-cyan-100"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* the end of quick view modal */}
        </div>
      </section>

    </div>
  );
};

export default ProjectsPage;
