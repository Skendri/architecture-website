import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { Menu, X } from "lucide-react";

const Header = ({ showLogo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const [animationStage, setAnimationStage] = useState("fadeIn");
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });

  const centerRef = useRef(null);
  const headerLogoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation moving element from x position to y position
  useEffect(() => {
    if (showLogo) {
      setAnimationStage("fadeIn");
      {/* 🔹 animation moves from center to positions i choose */}
      const timer = setTimeout(() => {
        if (headerLogoRef.current) {
          const rect = headerLogoRef.current.getBoundingClientRect();
          setTargetPos({
            x: rect.left - window.innerWidth / 1.8,
            y: rect.top - window.innerHeight / 2,
          });
          setAnimationStage("move");
        }
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showLogo]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <>
      {/* 🔹 Centered animated logo (appears first) */}
      {showLogo && (
        <motion.h1
          ref={centerRef}
          initial={{ opacity: 0, scale: 0, x: -160, y: -50 }}
          animate={
            animationStage === "fadeIn"
              ? { opacity: 1, scale: 1 }
              : { x: targetPos.x, y: targetPos.y, scale: 0.5 }
          }
          transition={{ duration: 2, ease: easeInOut }}
          className="fixed top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2 text-7xl font-bold text-indigo-400 shadow-lg-600"
        >
          ArchStudio
        </motion.h1>
      )}

      {/* 🔹 Centered animated logo child (appears first) */}
      {showLogo && (
        <motion.h1
          ref={centerRef}
          initial={{ opacity: 0, scale: 0, x: -270, y: 10 }}
          animate={
            animationStage === "fadeIn"
              ? { opacity: 1, scale: 1 }
              : { x: targetPos.x, y: targetPos.y, scale: 0.5 }
          }
          transition={{ duration: 2.5, ease: ["easeIn", "easeOut"] }}
          className="fixed top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold  text-green-900 shadow-lg-600"
        >
          Designing Tomorrow's{" "}
          <span className="gradient-text">Architecture</span>
        </motion.h1>
      )}

       {/* 🔹 start NAVBAR  */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200" : "bg-transparent"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 6.5, duration: 0.6, ease: "easeOut" }}
      >
        <div className="container">
          <div className="flex justify-between items-center py-4">
            {/* 🔹 logo header  */}
            <div
              ref={headerLogoRef}
              id="header-logo"
              className="text-2xl font-serif font-semibold text-gray-900"
            >
              ArchStudio
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative ${activeSection === item.id ? "text-primary-500" : "text-gray-700"} hover:text-primary-500 font-medium transition-colors duration-300`}
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  {item.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
                    initial={{ scaleX: activeSection === item.id ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ fontSize: "50px" }}
                  />
                </motion.button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.nav
                className="md:hidden bg-white border-t border-gray-200"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="py-4 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left px-4 py-3 ${activeSection === item.id ? "text-primary-500 bg-primary-50" : "text-gray-700"} hover:text-primary-500 hover:bg-gray-50 transition-colors duration-300`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
