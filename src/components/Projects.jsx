import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExternalLink, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import split1 from '../images/split_1.png'
import split2 from '../images/split_2.png'
import split3 from '../images/split_3.png'
import split4 from '../images/split_4.png'
// import bgImage from '../images/firstFlor.png'

const projectCarouselSlides = [split1, split2, split3, split4]

const ProjectHeroCarousel = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % projectCarouselSlides.length)
    }, 4500)
    return () => window.clearInterval(id)
  }, [])

  const prev = () => setIndex((i) => (i - 1 + projectCarouselSlides.length) % projectCarouselSlides.length)
  const next = () => setIndex((i) => (i + 1) % projectCarouselSlides.length)

  return (
    <div className="absolute inset-0">
      {projectCarouselSlides.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${i === index ? 'opacity-100' : 'opacity-0'
            }`}
        />
      ))}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          prev()
        }}
        className="absolute left-2 top-1/2 z-[15] flex h-8 w-8 -translate-y-1/2 items-center justify-center mx-8 rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          next()
        }}
        className="absolute right-2 top-1/2 z-[15] flex h-8 w-8 -translate-y-1/2 items-center justify-center mx-8 rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      <div className="absolute bottom-2 left-1/2 z-[15] flex -translate-x-1/2 gap-1.5">
        {projectCarouselSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setIndex(i)
            }}
            className={`h-1.5 rounded-full transition-[width] ${i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/45'
              }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

const Projects = ({ isFullPage = false }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const navigate = useNavigate()

  const projects = [
    {
      id: 1,
      title: 'Modern Residential Complex',
      category: 'Residential',
      description: 'A sustainable residential development featuring innovative green building techniques and modern amenities.',
      image: '🏢',
      features: ['Solar Panels', 'Green Roof', 'Smart Home Tech'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Corporate Headquarters',
      category: 'Commercial',
      description: 'An award-winning office building that combines functionality with stunning architectural design.',
      image: '🏢',
      features: ['LEED Certified', 'Open Workspaces', 'Natural Lighting'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: 'Cultural Arts Center',
      category: 'Cultural',
      description: 'A vibrant cultural hub designed to inspire creativity and bring communities together.',
      image: '🎭',
      features: ['Performance Hall', 'Gallery Spaces', 'Community Areas'],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 4,
      title: 'Sustainable School Campus',
      category: 'Educational',
      description: 'An innovative educational facility that promotes learning through sustainable design principles.',
      image: '🎓',
      features: ['Natural Ventilation', 'Outdoor Classrooms', 'Renewable Energy'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 5,
      title: 'Luxury Hotel Resort',
      category: 'Hospitality',
      description: 'A world-class resort that seamlessly blends luxury with environmental consciousness.',
      image: '🏨',
      features: ['Ocean Views', 'Spa Facilities', 'Eco-Friendly Design'],
      color: 'from-teal-500 to-blue-500'
    },
    {
      id: 6,
      title: 'Urban Mixed-Use Development',
      category: 'Mixed-Use',
      description: 'A comprehensive development that combines residential, commercial, and recreational spaces.',
      image: '🏙️',
      features: ['Retail Spaces', 'Residential Units', 'Public Parks'],
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  // Conditional styling based on context
  const sectionClasses = isFullPage ? "min-h-screen py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black" : " section-padding bg-project"

  const scrollToContact = () => {
    if (!isFullPage) {
      const element = document.getElementById('contact')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section id={isFullPage ? undefined : "projects"} className={sectionClasses} ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.0, ease: 'easeInOut' }}
        >
          <motion.h2
            className={`${isFullPage ? 'text-5xl md:text-6xl text-white mb-8' : 'heading-2 text-white mb-6'}`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.3, duration: 1.0, ease: 'easeInOut' }}
          >
            {isFullPage ? 'Our Complete Portfolio' : 'Our Featured Projects'}
          </motion.h2>
          <motion.p
            className={`${isFullPage ? 'text-xl text-gray-300 max-w-4xl mx-auto' : 'text-large text-white max-w-3xl mx-auto'}`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.6, duration: 1.0, ease: 'easeInOut' }}
          >
            {isFullPage
              ? 'Discover our comprehensive collection of architectural projects spanning residential, commercial, cultural, and institutional designs that showcase our commitment to innovation and sustainability.'
              : 'Explore our portfolio of innovative architectural designs that have transformed communities and set new standards for sustainable development.'
            }
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${isFullPage ? 'mb-20' : 'mb-16'}`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.9, duration: 1.0, ease: 'easeInOut' }}
        >
          {projects.map((project, index) => {
            // Pattern: full-width, 2 cards, full-width, 2 cards...
            const shouldBeFullWidth = index % 3 === 0

            return (
              <motion.div
                key={project.id}
                className={`card overflow-hidden group cursor-pointer ${shouldBeFullWidth ? 'md:col-span-2' : ''}`}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
                transition={{ delay: 1.2 + index * 0.15, duration: 1.0, ease: 'easeInOut' }}
                whileHover={{ y: -10, transition: { duration: 0.5, ease: 'easeInOut' } }}>
                {/* Project Image */}
                <motion.div
                  className={`relative h-48 bg-gradient-to-br ${project.color} overflow-hidden`}
                  whileHover={{ scale: 1.05, transition: { duration: 0.5, ease: 'easeInOut' } }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <ProjectHeroCarousel />
                  <motion.div
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 z-20"
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeInOut' } }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  >
                    {project.category}
                  </motion.div>
                </motion.div>

                {/* Project Content */}
                <div className="p-6">
                  <motion.h3
                    className="heading-3 mb-3"
                    whileHover={{ color: '#667eea', transition: { duration: 0.5, ease: 'easeInOut' } }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  >
                    {project.title}
                  </motion.h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.features.map((feature, featureIndex) => (
                      <motion.span
                        key={featureIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ delay: 1.5 + index * 0.15 + featureIndex * 0.1, duration: 0.5, ease: 'easeInOut' }}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: '#667eea',
                          color: 'white',
                          transition: { duration: 0.5, ease: 'easeInOut' }
                        }}
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>

                  {/* View Details Button */}
                  <motion.button
                    type="button"
                    onClick={() => navigate('/projects')}
                    className="flex items-center text-primary-500 font-semibold group-hover:text-secondary-500 transition-colors duration-300"
                    whileHover={{ x: 5, transition: { duration: 0.5, ease: 'easeInOut' } }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  >
                    View Details
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Section - only show on section page */}
        {!isFullPage && (
          <motion.div
            className="text-center bg-white rounded-3xl p-12 shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 1.5, duration: 1.0, ease: 'easeInOut' }}
          >
            <motion.h3
              className="heading-3 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 1.8, duration: 1.0, ease: 'easeInOut' }}
            >
              Ready to Start Your Project?
            </motion.h3>
            <motion.p
              className="text-large mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 2.1, duration: 1.0, ease: 'easeInOut' }}
            >
              Let's discuss how we can bring your architectural vision to life.
            </motion.p>
            <motion.button
              onClick={scrollToContact}
              className="btn group"
              whileHover={{ scale: 1.05, transition: { duration: 0.5, ease: 'easeInOut' } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.3, ease: 'easeInOut' } }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 2.4, duration: 1.0, ease: 'easeInOut' }}
            >
              Start a Project
              <ExternalLink className="ml-2 group-hover:rotate-12 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Projects
