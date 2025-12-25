import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award, Users, Building, Lightbulb } from 'lucide-react'

const About = () => {
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

  return (
    <section id="about" className="section-padding bg relative" ref={ref}>
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      <div className="container relative z-0">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <motion.h2
              className="heading-2"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.3, duration: 1.0, ease: 'easeInOut' }}
              style={{color: 'whitesmoke'}}
            >
              About Our Studio
            </motion.h2>

            <motion.p
              className="text-large"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.6, duration: 1.0, ease: 'easeInOut' }}
              style={{color: 'whitesmoke'}}
            >
              Founded in 2010, ArchStudio has been at the forefront of modern architectural
              design. We specialize in creating spaces that not only meet functional requirements
              but also inspire and delight. Our team of experienced architects and designers
              brings together decades of expertise in residential, commercial, and institutional projects.
            </motion.p>

            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.9, duration: 1.0, ease: 'easeInOut' }}
              style={{color: 'whitesmoke'}}
            >
              We believe that great architecture should be accessible, sustainable, and beautiful.
              Our approach combines innovative design thinking with practical solutions, ensuring
              that every project we undertake exceeds expectations while respecting the environment
              and the communities we serve.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 1.2, duration: 1.0, ease: 'easeInOut' }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 1.5 + index * 0.2, duration: 1.0, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.5, ease: 'easeInOut' } }}
                >
                  <motion.h3
                    className="text-4xl font-bold gradient-text"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 1.8 + index * 0.2, duration: 1.0, type: 'spring', stiffness: 100 }}
                  >
                    {stat.number}
                  </motion.h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card p-6 text-center group"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
                transition={{ delay: 1.2 + index * 0.2, duration: 1.0, ease: 'easeInOut' }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.5, ease: 'easeInOut' }
                }}
              >
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white`}
                  whileHover={{ rotate: 360, transition: { duration: 1.0, ease: 'easeInOut' } }}
                  transition={{ duration: 1.0, ease: 'easeInOut' }}
                >
                  <feature.icon size={32} />
                </motion.div>
                <h3 className="heading-3 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
