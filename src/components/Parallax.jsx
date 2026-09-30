import { useEffect, useState } from 'react'
import ParallaxAbout from '../childComponents/ParallaxAbout'
import ParallaxHero from '../childComponents/ParallaxHero'

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
  }
]

const Parallax = () => {
  const [scrollY, setScrollY] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden bg-white">
      <ParallaxHero slides={slides} currentSlide={currentSlide} scrollY={scrollY} />
      <ParallaxAbout slides={slides} currentSlide={currentSlide} />
    </div>
  )
}

export default Parallax
