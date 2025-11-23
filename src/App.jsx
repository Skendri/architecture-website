import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";



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
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </Router>
    </div>
  )
}

export default App
