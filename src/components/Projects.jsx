import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, ArrowRight } from 'lucide-react'
// import bgImage from '../images/firstFlor.png'

const Projects = ({ isFullPage = false }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
  const sectionClasses = isFullPage 
    ? "min-h-screen py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
    : " section-padding bg-project"

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
            className={`${isFullPage ? 'text-5xl md:text-6xl text-white mb-8' : 'heading-2 mb-6'}`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.3, duration: 1.0, ease: 'easeInOut' }}
          >
            {isFullPage ? 'Our Complete Portfolio' : 'Our Featured Projects'}
          </motion.h2>
          <motion.p
            className={`${isFullPage ? 'text-xl text-gray-300 max-w-4xl mx-auto' : 'text-large max-w-3xl mx-auto'}`}
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
              whileHover={{
                y: -10,
                transition: { duration: 0.5, ease: 'easeInOut' }
              }}
            >
              {/* Project Image */}
              <motion.div
                className={`relative h-48 bg-gradient-to-br ${project.color} flex items-center justify-center text-6xl text-white overflow-hidden`}
                whileHover={{ scale: 1.05, transition: { duration: 0.5, ease: 'easeInOut' } }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  {project.image}
                </motion.div>
                <motion.div
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700"
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
