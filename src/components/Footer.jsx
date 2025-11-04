import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUp, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { name: 'Architectural Design', href: '#about' },
      { name: 'Project Management', href: '#projects' },
      { name: 'Consultation', href: '#contact' },
      { name: '3D Visualization', href: '#contact' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Work', href: '#projects' },
      { name: 'Careers', href: '#contact' },
      { name: 'Contact', href: '#contact' }
    ]
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ]

  return (
    <footer className="bg-gray-900 text-white section-padding bg-gray-50 sticky top-0 z-50" ref={ref}>
      <div className="container">
        {/* Main Footer Content */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 py-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.0, ease: 'easeInOut' }}
        >
          {/* Company Info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 0.3, duration: 1.0, ease: 'easeInOut' }}
          >
            <motion.h3
              className="text-3xl font-serif font-semibold mb-4 gradient-text"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              ArchStudio
            </motion.h3>
            <motion.p
              className="text-gray-300 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 1.0, ease: 'easeInOut' }}
            >
              Creating innovative architectural solutions that inspire and transform
              communities for a sustainable future.
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.9, duration: 1.0, ease: 'easeInOut' }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-300"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: '#667eea'
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.6, duration: 1.0, ease: 'easeInOut' }}
          >
            <motion.h4
              className="text-lg font-semibold mb-6"
              whileHover={{ color: '#667eea' }}
              transition={{ duration: 0.3 }}
            >
              Services
            </motion.h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                >
                  <motion.a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.9, duration: 1.0, ease: 'easeInOut' }}
          >
            <motion.h4
              className="text-lg font-semibold mb-6"
              whileHover={{ color: '#667eea' }}
              transition={{ duration: 0.3 }}
            >
              Company
            </motion.h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                >
                  <motion.a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="border-t border-gray-800 py-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.2, duration: 1.0, ease: 'easeInOut' }}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h5 className="font-semibold mb-2">📍 Address</h5>
              <p className="text-gray-300">123 Architecture Lane<br />Design District, City 12345</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h5 className="font-semibold mb-2">📞 Phone</h5>
              <p className="text-gray-300">+1 (555) 123-4567</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h5 className="font-semibold mb-2">✉️ Email</h5>
              <p className="text-gray-300">hello@archstudio.com</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          className="border-t border-gray-800 py-6 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.5, duration: 1.0, ease: 'easeInOut' }}
        >
          <motion.p
            className="text-gray-400 mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            &copy; {currentYear} ArchStudio. All rights reserved.
          </motion.p>

          <motion.div
            className="flex items-center space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <motion.a
              href="#privacy"
              className="text-gray-400 hover:text-white transition-colors duration-300"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#terms"
              className="text-gray-400 hover:text-white transition-colors duration-300"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
            >
              Terms of Service
            </motion.a>
            <motion.button
              onClick={scrollToTop}
              className="flex items-center text-primary-500 hover:text-secondary-500 transition-colors duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUp className="mr-1" />
              Back to Top
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
