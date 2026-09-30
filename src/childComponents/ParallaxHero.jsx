import { motion, AnimatePresence } from 'framer-motion'

const ParallaxHero = ({ slides, currentSlide, scrollY }) => (
  <section className="relative h-screen w-full overflow-hidden">
    <AnimatePresence mode="wait">
      {slides.map((slide, index) => (
        index === currentSlide && (
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <div
              className="absolute inset-0"
              style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.1)` }}
            >
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </motion.div>
        )
      ))}
    </AnimatePresence>

    <div className="absolute inset-0 z-10 flex items-end">
      <div className="w-full max-w-7xl mx-auto px-4 pb-20 text-white">
        <div className="grid grid-cols-12 gap-4 items-end">
          <div className="col-span-2 text-sm font-light">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-normal">{String(currentSlide + 1).padStart(2, '0')}</span>
              <span className="text-white/40">/</span>
              <span className="text-white/40">{String(slides.length).padStart(2, '0')}</span>
            </div>
          </div>

          <div className="col-span-8 relative h-px bg-white/20">
            <motion.div
              className="absolute top-0 left-0 h-full bg-white"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="col-span-12 mt-8">
            <motion.h1
              key={currentSlide}
              className="text-5xl md:text-7xl font-serif font-light mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {slides[currentSlide].title}
            </motion.h1>
            <div className="flex gap-8 text-sm font-light text-white/80">
              <div><span className="text-white/40">Client: </span>{slides[currentSlide].client}</div>
              <div><span className="text-white/40">Area: </span>{slides[currentSlide].area}</div>
              <div><span className="text-white/40">Year: </span>{slides[currentSlide].year}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <motion.div
      className="absolute bottom-8 right-8 z-20 text-white"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-light tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-white/40" />
      </div>
    </motion.div>
  </section>
)

export default ParallaxHero