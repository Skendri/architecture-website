import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award, Users, Building, Lightbulb, MapPin, Calendar, Target } from 'lucide-react'

const AboutPage = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const features = [
    {
      icon: Building,
      title: 'Innovative Design',
      description: 'We push the boundaries of architectural design with cutting-edge concepts and sustainable solutions.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Lightbulb,
      title: 'Sustainable Architecture',
      description: 'Our commitment to environmental responsibility drives every design decision we make.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Award-Winning Projects',
      description: 'Recognition from industry leaders for our exceptional work and innovative approach.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'Client Collaboration',
      description: 'We work closely with clients to ensure their vision becomes reality through collaborative design.',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const stats = [
    { number: '150+', label: 'Projects Completed' },
    { number: '15+', label: 'Years Experience' },
    { number: '25+', label: 'Awards Won' }
  ]

  const timeline = [
    {
      year: '2010',
      title: 'Foundation',
      description: 'ArchStudio was founded with a vision to transform architectural design.'
    },
    {
      year: '2015',
      title: 'Growth',
      description: 'Expanded our team and began taking on international projects.'
    },
    {
      year: '2020',
      title: 'Innovation',
      description: 'Pioneered sustainable design practices and won multiple awards.'
    },
    {
      year: '2025',
      title: 'Future',
      description: 'Leading the industry in smart building technologies and green architecture.'
    }
  ]

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
              About <span className="gradient-text">ArchStudio</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              We are passionate architects and designers dedicated to creating spaces that inspire, 
              function beautifully, and respect our environment. For over a decade, we have been 
              at the forefront of architectural innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20" ref={ref}>
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <Target className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300">
                To create architectural solutions that enhance human experience while 
                promoting environmental sustainability and social responsibility.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Building className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-300">
                To be the leading architectural firm known for innovative design, 
                sustainable practices, and creating spaces that stand the test of time.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                <Award className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Values</h3>
              <p className="text-gray-300">
                Innovation, sustainability, collaboration, and excellence guide 
                every decision we make and every project we undertake.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-gray-300 text-lg mb-6">
                Founded in 2010, ArchStudio began with a simple yet ambitious vision: 
                to create architecture that truly serves people and the planet.
              </p>
              <p className="text-gray-300 text-lg mb-6">
                What started as a small team of passionate architects has grown into 
                a multidisciplinary practice known for pushing boundaries and setting 
                new standards in sustainable design.
              </p>
              <p className="text-gray-300 text-lg">
                Today, we continue to evolve, embracing new technologies and methodologies 
                while staying true to our core principles of innovation, sustainability, 
                and exceptional design.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Our Journey</h3>
                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                        {item.year.slice(-2)}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{item.title}</h4>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Our Impact</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence and the trust our clients place in us.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
                transition={{ delay: 1.8 + index * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <motion.h3
                  className="text-5xl font-bold gradient-text mb-4"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 2.0 + index * 0.2, duration: 0.8, type: 'spring' }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-gray-300 text-lg font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 2.4, duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">What Sets Us Apart</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Our unique approach combines innovative thinking with practical solutions, 
              ensuring every project exceeds expectations.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 2.6, duration: 0.8 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-6"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
                transition={{ delay: 2.8 + index * 0.1, duration: 0.8 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white`}
                  whileHover={{ rotate: 360, transition: { duration: 1.0 } }}
                >
                  <feature.icon size={32} />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
