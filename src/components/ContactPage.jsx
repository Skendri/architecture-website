import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare, Calendar, Users, Building } from 'lucide-react'

const ContactPage = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    timeline: '',
    budget: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        project: '',
        timeline: '',
        budget: '',
        message: ''
      })

      setTimeout(() => setSubmitStatus(''), 5000)
    }, 2000)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Studio',
      details: '123 Architecture Lane, Design District, City 12345',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: 'hello@archstudio.com',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: 'Mon - Fri: 9:00 AM - 6:00 PM',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const services = [
    {
      icon: Building,
      title: 'Architectural Design',
      description: 'Complete architectural design services from concept to construction.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Consultation',
      description: 'Expert advice and guidance for your architectural projects.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Calendar,
      title: 'Project Management',
      description: 'Full project management services to ensure successful completion.',
      color: 'from-green-500 to-emerald-500'
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
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Ready to transform your architectural vision into reality? Our team of experienced 
              architects and designers is here to guide you through every step of your project. 
              Let's discuss how we can bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20" ref={ref}>
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">How We Can Help</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              From initial consultation to project completion, we offer comprehensive 
              architectural services tailored to your unique needs.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-20"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center text-white`}
                  whileHover={{ rotate: 360, transition: { duration: 1.0 } }}
                >
                  <service.icon size={32} />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="container pb-20">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Contact Information</h3>
              <p className="text-gray-300 text-lg mb-8">
                We believe that great architecture starts with great communication. 
                Whether you have a specific project in mind or simply want to explore 
                possibilities, we're here to listen and help bring your vision to life.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 group hover:bg-white/15 transition-all duration-300"
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
                  transition={{ delay: 1.0 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${info.color} flex items-center justify-center text-white mb-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <info.icon size={24} />
                  </motion.div>
                  <h4 className="font-semibold text-white mb-2">{info.title}</h4>
                  <p className="text-gray-300 text-sm">{info.details}</p>
                </motion.div>
              ))}
            </div>

            {/* Process Steps */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <h4 className="text-xl font-bold text-white mb-6">Our Process</h4>
              <div className="space-y-4">
                {[
                  'Initial consultation and project assessment',
                  'Conceptual design and feasibility study',
                  'Detailed design and planning approval',
                  'Construction documentation and oversight',
                  'Project completion and handover'
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-300">{step}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <motion.h3
              className="text-2xl font-bold text-white mb-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Start Your Project Today
            </motion.h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Your full name"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 1.6, duration: 0.8 }}
                >
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="+1 (555) 123-4567"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 1.7, duration: 0.8 }}
                >
                  <label htmlFor="project" className="block text-sm font-medium text-gray-300 mb-2">
                    Project Type *
                  </label>
                  <select
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all duration-300"
                  >
                    <option value="" className="bg-gray-800">Select Project Type</option>
                    <option value="residential" className="bg-gray-800">Residential</option>
                    <option value="commercial" className="bg-gray-800">Commercial</option>
                    <option value="institutional" className="bg-gray-800">Institutional</option>
                    <option value="mixed-use" className="bg-gray-800">Mixed-Use</option>
                    <option value="renovation" className="bg-gray-800">Renovation</option>
                    <option value="other" className="bg-gray-800">Other</option>
                  </select>
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 1.8, duration: 0.8 }}
                >
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-2">
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all duration-300"
                  >
                    <option value="" className="bg-gray-800">Select Timeline</option>
                    <option value="immediate" className="bg-gray-800">Immediate (1-3 months)</option>
                    <option value="short" className="bg-gray-800">Short-term (3-6 months)</option>
                    <option value="medium" className="bg-gray-800">Medium-term (6-12 months)</option>
                    <option value="long" className="bg-gray-800">Long-term (12+ months)</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 1.9, duration: 0.8 }}
                >
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all duration-300"
                  >
                    <option value="" className="bg-gray-800">Select Budget Range</option>
                    <option value="under-100k" className="bg-gray-800">Under $100K</option>
                    <option value="100k-500k" className="bg-gray-800">$100K - $500K</option>
                    <option value="500k-1m" className="bg-gray-800">$500K - $1M</option>
                    <option value="1m-5m" className="bg-gray-800">$1M - $5M</option>
                    <option value="over-5m" className="bg-gray-800">Over $5M</option>
                  </select>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 2.0, duration: 0.8 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 resize-none"
                  placeholder="Tell us about your project, vision, and any specific requirements..."
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 rounded-xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 2.1, duration: 0.8 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Sending Message...
                  </>
                ) : (
                  <>
                    Start Project Discussion
                    <Send className="ml-2" />
                  </>
                )}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div
                  className="flex items-center justify-center p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle className="mr-2" />
                  Thank you! We'll get back to you within 24 hours.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
