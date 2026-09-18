import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect  } from 'react'
import { Award, Users, Building, Lightbulb } from 'lucide-react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
    const [currentSlide, setCurrentSlide] = useState(0)

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

  // slides for about section
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
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000)
      return () => clearInterval(interval)
    }, [slides.length])


  return (
      <section className="relative py-32 bg-about" ref={ref}>
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
  )
}

export default About
