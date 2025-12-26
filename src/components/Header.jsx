import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ showLogo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(location.pathname === "/" ? "home" : location.pathname.slice(1));

  const [animationStage, setAnimationStage] = useState("fadeIn");
  const [targetPos, setTargetPos] = useState({ x: -200, y: -800 });

  const centerRef = useRef(null);

  const headerLogoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveSection(location.pathname === "/" ? "home" : location.pathname.slice(1));
  }, [location.pathname]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    if (!showLogo) return;

    // faza 1: fade in
    setAnimationStage("fadeIn");

    // faza 2: pas 2 sekondash zhvendosja
    const timer = setTimeout(() => {
      setAnimationStage("moveLogo");
    }, 4000);

    return () => clearTimeout(timer);
  }, [showLogo]);

  return (
    <>
        {/* 🔹 Centered animated logo (appears first) */}
        {showLogo && (
          <motion.h1
            initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)", x: -175, y: 0 }}
            animate={
              animationStage === "fadeIn"
                ? {
                    opacity: [0, 1],
                    scale: [0.85, 1.02, 1],
                    filter: ["blur(10px)", "blur(2px)", "blur(0px)"],
                  }
                : {
                    x: targetPos.x,
                    y: targetPos.y,
                    scale: 0.45,
                    opacity: 0,
                    filter: "blur(20px)", // blur while leaving
                  }
            }
            transition={{
              duration: animationStage === "fadeIn" ? 1.6 : 1.8,
              ease: "easeInOut",
            }}
            className="fixed top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2 text-7xl font-bold text-indigo-400"
          >
            ArchStudio
          </motion.h1>
        )}

        {/* 🔹 Centered animated logo child (appears first) */}
        {showLogo && (
          <motion.h1
            initial={{ opacity: 0, scale: 0.8, filter: "blur(12px)", x: -285 , y: 65 }}
            animate={
              animationStage === "fadeIn"
                ? {
                    opacity: [0, 1],
                    scale: [0.8, 1],
                    filter: ["blur(12px)", "blur(0px)"],
                  }
                : {
                    opacity: 0,
                    scale: 0.6,
                    filter: "blur(20px)",
                  }
            }
            transition={{
              duration: 2.2,
              delay: 0.4, // ➜ DELAY mes logos & sloganit
              ease: "easeOut",
            }}
            className="fixed top-1/2 left-1/2 z-40 text-4xl font-bold text-green-900"
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
                <motion.div
                  key={item.href}
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <Link
                    to={item.href}
                    className={`relative ${activeSection === item.href.slice(1) || (item.href === "/" && activeSection === "home") ? "text-primary-500" : "text-gray-700"} hover:text-primary-500 font-medium transition-colors duration-300`}
                  >
                    {item.name}
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
                      initial={{ scaleX: (activeSection === item.href.slice(1) || (item.href === "/" && activeSection === "home")) ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
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
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        to={item.href}
                        className={`block w-full text-left px-4 py-3 ${activeSection === item.href.slice(1) || (item.href === "/" && activeSection === "home") ? "text-primary-500 bg-primary-50" : "text-gray-700"} hover:text-primary-500 hover:bg-gray-50 transition-colors duration-300`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
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
