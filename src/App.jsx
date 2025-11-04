import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <Router>
        <Header />
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
