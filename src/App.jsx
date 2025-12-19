import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion'



const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.05
  }
}

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
}

function App() {
  const [showLogo, setShowLogo] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true)
    }, 2000) // 5 seconds + 0.5s fade in

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="App">
      <Router>
        <Header showLogo={showLogo} />
        <Routes>
          <Route path="/" element={
            <AnimatePresence mode="wait">
              <motion.div
                key="home"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Hero />
                <About />
                <Projects />
                <Contact />
              </motion.div>
            </AnimatePresence>
          } />
          <Route path="/about" element={
            <AnimatePresence mode="wait">
              <motion.div
                key="about"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <About />
              </motion.div>
            </AnimatePresence>
          } />
          <Route path="/projects" element={
            <AnimatePresence mode="wait">
              <motion.div
                key="projects"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Projects />
              </motion.div>
            </AnimatePresence>
          } />
          <Route path="/contact" element={
            <AnimatePresence mode="wait">
              <motion.div
                key="contact"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Contact />
              </motion.div>
            </AnimatePresence>
          } />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
