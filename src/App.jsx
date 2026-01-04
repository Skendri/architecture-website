import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AboutPage from "./components/AboutPage";
import ProjectsPage from "./components/ProjectsPage";
import Parallax from "./components/Parallax";
import ContactPage from "./components/ContactPage";


const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.05,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

function App() {
    const [showLogo, setShowLogo] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowLogo(true);
      }, 2000); // 2 seconds + 0.5s fade in
      return () => clearTimeout(timer);
    }, []);

  return (
    <div className="App">
      <Router>
        <Header showLogo={showLogo}/>
        <Routes>
          {/* Home Page - Sections */}
          <Route
            path="/"
            element={
              <AnimatePresence mode="wait">
                <motion.div
                  key="home"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Hero showLogo={showLogo} />
                  <About />
                  <Projects />
                  <Contact />
                </motion.div>
              </AnimatePresence>
            }
          />

          {/* About Page - Full Page */}
          <Route
            path="/about"
            element={
              <AnimatePresence mode="wait">
                <motion.div
                  key="about"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <AboutPage />
                </motion.div>
              </AnimatePresence>
            }
          />

          {/* Projects Page - Full Page */}
          <Route
            path="/projects"
            element={
              <AnimatePresence mode="wait">
                <motion.div
                  key="projects"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ProjectsPage />
                </motion.div>
              </AnimatePresence>
            }
          />

          {/* Contact Page - Full Page */}
          <Route
            path="/parallax"
            element={
              <AnimatePresence mode="wait">
                <motion.div
                  key="parallax"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Parallax />
                </motion.div>
              </AnimatePresence>
            }
          />

          {/* Contact Page - Full Page */}
          <Route
            path="/contact"
            element={
              <AnimatePresence mode="wait">
                <motion.div
                  key="contact"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ContactPage />
                </motion.div>
              </AnimatePresence>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
