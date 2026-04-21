import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const Parallax = ({showLogo}) => {
  const [scrollY, setScrollY] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

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

    const floatingCards = [
    {
      icon: "🏗️",
      title: "Modern Design",
      description: "Sustainable architecture",
      delay: 0,
    },
    {
      icon: "✨",
      title: "Innovation",
      description: "Cutting-edge solutions",
      delay: 0.5,
    },
    {
      icon: "🏆",
      title: "Excellence",
      description: "Award-winning projects",
      delay: 1,
    },
  ];

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
      {/* Sticky Logo - Inspired by hitoba-office */}
      <motion.div
        className="fixed bottom-8 left-8 z-50 pointer-events-none"
        style={{
          opacity: logoOpacity,
          y: logoY
        }}
      >
        <div className="text-4xl font-serif font-bold text-black">
          ARCHITECTURE
        </div>
      </motion.div>

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

      {/* Spacer */}
      <div className="h-[80vh] md:h-[60vh]" />

      {/* Works Section - Grid Layout */}
          {/* Floating Cards */}
          <motion.div
            className="relative h-80 sm:h-96 lg:h-[500px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={
              !showLogo
                ? { delay: 7, duration: 1.0, ease: "easeInOut" }
                : { delay: 1 }
            }
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500  rounded-3xl flex items-center justify-center text-white text-6xl"></div>
            {/* to-secondary-500 */}

            {floatingCards.map((card, index) => (
              <motion.div
                key={index}
                className="absolute bg-white rounded-2xl p-6 shadow-xl"
                style={{
                  top: `${20 + index * 25}%`,
                  right: index % 2 === 0 ? "-10%" : "10%",
                  left: index % 2 === 1 ? "-10%" : "auto",
                }}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  delay: 1.5 + card.delay,
                  duration: 1.0,
                  ease: "easeInOut",
                  rotate: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 0,
                  transition: { duration: 0.5, ease: "easeInOut" },
                }}
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600">{card.description}</p>
              </motion.div>
            ))}
          </motion.div>

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

      {/* Contact Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${getParallaxOffset(0.5)}px) scale(1.2)`,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000&q=80"
            alt="Contact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Contact Content */}
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-8xl font-serif font-light mb-8">Contact</h2>
          <p className="text-xl md:text-2xl mb-12 text-black/90 max-w-2xl mx-auto">
            Let's discuss how we can bring your architectural vision to life.
            Get in touch to start your project.
          </p>
          <motion.a
            href="#"
            className="inline-flex items-center gap-4 px-12 py-4 bg-white text-black hover:bg-gray-100 transition-all duration-300 text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </motion.a>
        </motion.div>
      </section>
    </div>
  )
}

export default Parallax
