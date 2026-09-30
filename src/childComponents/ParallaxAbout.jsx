import { motion, AnimatePresence } from 'framer-motion'

const ParallaxAbout = ({ slides, currentSlide }) => (
  <section className="relative py-32 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          className="relative h-[500px] overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            {slides.map((slide, index) => (
              index === currentSlide && (
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

export default ParallaxAbout