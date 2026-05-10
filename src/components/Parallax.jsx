import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const Parallax = ({showLogo}) => {
  const [scrollY, setScrollY] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({target: containerRef,offset: ["start start", "end end"]})

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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  const getParallaxOffset = (speed) => scrollY * speed
  const logoOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const logoY = useTransform(scrollYProgress, [0, 0.3], [50, 0])



  return (
    <div ref={containerRef} className="relative overflow-hidden bg-white">
      {/* Hero Section - Full Screen Slideshow */}
      <section className="relative h-screen w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {slides.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={slide.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    transform: `translateY(${getParallaxOffset(0.3)}px) scale(1.1)`,
                  }}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Navigation Overlay */}
        <div className="absolute inset-0 z-10 flex items-end">
          <div className="w-full max-w-7xl mx-auto px-4 pb-20 text-white">
            <div className="grid grid-cols-12 gap-4 items-end">
              {/* Slide Counter */}
              <div className="col-span-2 text-sm font-light">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-normal">
                    {String(currentSlide + 1).padStart(2, '0')}
                  </span>
                  <span className="text-white/40">/</span>
                  <span className="text-white/40">{String(slides.length).padStart(2, '0')}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="col-span-8 relative h-px bg-white/20">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Title */}
              <div className="col-span-12 mt-8">
                <motion.h1
                  key={currentSlide}
                  className="text-5xl md:text-7xl font-serif font-light mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {slides[currentSlide].title}
                </motion.h1>
                <div className="flex gap-8 text-sm font-light text-white/80">
                  <div>
                    <span className="text-white/40">Client: </span>
                    {slides[currentSlide].client}
                  </div>
                  <div>
                    <span className="text-white/40">Area: </span>
                    {slides[currentSlide].area}
                  </div>
                  <div>
                    <span className="text-white/40">Year: </span>
                    {slides[currentSlide].year}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 right-8 z-20 text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-light tracking-widest">SCROLL</span>
            <div className="w-px h-12 bg-white/40" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="relative py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image Slider */}
            <motion.div
              className="relative h-[500px] overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <AnimatePresence mode="wait">
                {slides.map((slide, index) => (
                  index === (currentSlide % slides.length) && (
                    <motion.img
                      key={slide.id}
                      src={slide.image}
                      alt={slide.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.8 }}
                    />
                  )
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-6xl font-serif font-light mb-8">About</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We are a design studio specializing in creating innovative architectural solutions
                that blend functionality with aesthetic excellence. Our work transforms spaces into
                environments that inspire and enhance the human experience.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through careful attention to detail and a commitment to sustainable design,
                we create buildings that stand as timeless testaments to human creativity and
                engineering excellence.
              </p>
              <a
                href="#"
                className="inline-block mt-8 px-8 py-3 border border-black text-black hover:bg-black hover:text-white transition-all duration-300"
              >
                Learn More
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Parallax
