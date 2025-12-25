import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, ArrowRight, Filter, Grid, List } from 'lucide-react'

const ProjectsPage = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const projects = [
    {
      id: 1,
      title: 'Modern Residential Complex',
      category: 'Residential',
      description: 'A sustainable residential development featuring innovative green building techniques and modern amenities. This project showcases our commitment to eco-friendly living spaces.',
      image: '🏢',
      features: ['Solar Panels', 'Green Roof', 'Smart Home Tech', 'Rainwater Harvesting'],
      color: 'from-blue-500 to-cyan-500',
      status: 'Completed',
      year: '2024',
      area: '50,000 sq ft',
      location: 'Downtown District'
    },
    {
      id: 2,
      title: 'Corporate Headquarters',
      category: 'Commercial',
      description: 'An award-winning office building that combines functionality with stunning architectural design. Features state-of-the-art facilities and sustainable practices.',
      image: '🏢',
      features: ['LEED Certified', 'Open Workspaces', 'Natural Lighting', 'Green Spaces'],
      color: 'from-purple-500 to-pink-500',
      status: 'Completed',
      year: '2023',
      area: '120,000 sq ft',
      location: 'Business Park'
    },
    {
      id: 3,
      title: 'Cultural Arts Center',
      category: 'Cultural',
      description: 'A vibrant cultural hub designed to inspire creativity and bring communities together. Features performance halls, galleries, and community spaces.',
      image: '🎭',
      features: ['Performance Hall', 'Gallery Spaces', 'Community Areas', 'Outdoor Amphitheater'],
      color: 'from-orange-500 to-red-500',
      status: 'Under Construction',
      year: '2025',
      area: '75,000 sq ft',
      location: 'Cultural District'
    },
    {
      id: 4,
      title: 'Sustainable School Campus',
      category: 'Educational',
      description: 'An innovative educational facility that promotes learning through sustainable design principles and biophilic architecture.',
      image: '🎓',
      features: ['Natural Ventilation', 'Outdoor Classrooms', 'Renewable Energy', 'Learning Gardens'],
      color: 'from-green-500 to-emerald-500',
      status: 'Completed',
      year: '2024',
      area: '200,000 sq ft',
      location: 'University District'
    },
    {
      id: 5,
      title: 'Luxury Hotel Resort',
      category: 'Hospitality',
      description: 'A world-class resort that seamlessly blends luxury with environmental consciousness, featuring stunning ocean views and eco-friendly amenities.',
      image: '🏨',
      features: ['Ocean Views', 'Spa Facilities', 'Eco-Friendly Design', 'Infinity Pool'],
      color: 'from-teal-500 to-blue-500',
      status: 'Planning',
      year: '2026',
      area: '300,000 sq ft',
      location: 'Coastal Area'
    },
    {
      id: 6,
      title: 'Urban Mixed-Use Development',
      category: 'Mixed-Use',
      description: 'A comprehensive development that combines residential, commercial, and recreational spaces in a vibrant urban environment.',
      image: '🏙️',
      features: ['Retail Spaces', 'Residential Units', 'Public Parks', 'Community Center'],
      color: 'from-indigo-500 to-purple-500',
      status: 'Under Construction',
      year: '2025',
      area: '500,000 sq ft',
      location: 'Urban Center'
    }
  ]

  const categories = ['All', 'Residential', 'Commercial', 'Cultural', 'Educational', 'Hospitality', 'Mixed-Use']
  const [selectedCategory, setSelectedCategory] = React.useState('All')

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-8">
              Our <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Explore our comprehensive collection of architectural projects spanning residential, 
              commercial, cultural, and institutional designs that showcase our commitment to 
              innovation, sustainability, and exceptional design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-10" ref={ref}>
        <div className="container">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm'
                }`}
                onClick={() => setSelectedCategory(category)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden group hover:bg-white/15 transition-all duration-500"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Project Image */}
                <div className="relative h-64 bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} flex items-center justify-center text-8xl`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {project.image}
                  </motion.div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                      project.status === 'Completed' ? 'bg-green-500' :
                      project.status === 'Under Construction' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <span className="text-cyan-400 font-bold text-sm">{project.year}</span>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                  {/* Project Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <span className="text-gray-400">Area:</span>
                      <p className="text-white font-semibold">{project.area}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Location:</span>
                      <p className="text-white font-semibold">{project.location}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.features.map((feature, featureIndex) => (
                      <motion.span
                        key={featureIndex}
                        className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs font-medium"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ delay: 1.0 + index * 0.1 + featureIndex * 0.05, duration: 0.3 }}
                        whileHover={{ scale: 1.05, backgroundColor: '#667eea', color: 'white' }}
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>

                  {/* View Details Button */}
                  <motion.button
                    className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 rounded-xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Project Details
                    <ExternalLink className="ml-2 group-hover:rotate-12 transition-transform duration-300" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">Ready to Start Your Project?</h3>
            <p className="text-gray-300 text-lg mb-8">
              Let's discuss how we can bring your architectural vision to life. 
              From initial concept to final construction, we're here to guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Project
              </motion.button>
              <motion.button
                className="border border-white/30 text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Consultation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ProjectsPage
