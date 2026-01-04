import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

const Hero = ({showLogo}) => {
  const heroRef = useRef(null)

  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const floatingCards = [
    {
      icon: '🏗️',
      title: 'Modern Design',
      description: 'Sustainable architecture',
      delay: 0
    },
    {
      icon: '✨',
      title: 'Innovation',
      description: 'Cutting-edge solutions',
      delay: 0.5
    },
    {
      icon: '🏆',
      title: 'Excellence',
      description: 'Award-winning projects',
      delay: 1
    }
  ]

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="https://shuttle-storage.s3.amazonaws.com/arkshelter/Flavor/Videos/Hero%20Video.mp4?1648821220" type="video/mp4" />
      </video>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}  // 👈 starting position
            animate={{ opacity: 1, x: 0 }}  // 👈 animate to normal position
            transition={ !showLogo ? { delay: 7, duration: 1.5, ease: 'easeInOut'} : {delay: 1} }  // 👈 smooth animation
            style={{zIndex: 1, maxWidth: '100rem', gap: '7rem'}}
          >
            <motion.h1
              className="heading-1 text-green-900"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.0, ease: 'easeInOut' }}
            >
              Designing Tomorrow's{' '}
              <span className="gradient-text">Architecture</span>
            </motion.h1>

            <motion.p 
             className=" text-4xl font-serif font-semibold text-white"
              // animate={{ opacity: 1 }} 
              // initial={{ opacity: 0 }} 
              // transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            >
              Hello World
            </motion.p>

            <motion.p
              className="text-large max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.0, ease: 'easeInOut' }}
              style={{color: "whitesmoke"}}
            >
              We create innovative, sustainable, and beautiful architectural solutions
              that stand the test of time. Our designs blend functionality with aesthetic
              excellence to shape the future of living spaces.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1.0, ease: 'easeInOut' }}
            >
              <motion.button
                onClick={scrollToProjects}
                className="btn group "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Work
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>

              <motion.button
                onClick={scrollToContact}
                className="btn btn-outline group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
                <Sparkles className="ml-2 group-hover:rotate-12 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Floating Cards */}
          <motion.div
            className="relative h-96 lg:h-[500px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={ !showLogo ? {delay: 7, duration: 1.0, ease: 'easeInOut'} : {delay: 1} }
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500  rounded-3xl flex items-center justify-center text-white text-6xl">
              
            </div> 
            {/* to-secondary-500 */}

            {floatingCards.map((card, index) => (
              <motion.div
                key={index}
                className="absolute bg-white rounded-2xl p-6 shadow-xl"
                style={{
                  top: `${20 + index * 25}%`,
                  right: index % 2 === 0 ? '-10%' : '10%',
                  left: index % 2 === 1 ? '-10%' : 'auto'
                }}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  delay: 1.5 + card.delay,
                  duration: 1.0,
                  ease: 'easeInOut',
                  rotate: {
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 0,
                  transition: { duration: 0.5, ease: 'easeInOut' }
                }}
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero