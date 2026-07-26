import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = ({ showLogo }) => {
  const heroRef = useRef(null);

  // 🔥 Scroll progress
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // 🔥 Parallax transforms
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="flex relative min-h-screen overflow-hidden"
    >
      {/* 🔥 PARALLAX VIDEO */}
      <motion.video
        autoPlay
        muted
        loop
        style={{ y: videoY, filter: "blur(4px)" }}
        className="absolute inset-0 w-full h-[120%] object-cover z-0"
      >
        <source
          src="https://shuttle-storage.s3.amazonaws.com/arkshelter/Flavor/Videos/Hero%20Video.mp4?1648821220"
          type="video/mp4"
        />
      </motion.video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* 🔥 PARALLAX CONTENT */}
      <motion.div
        style={{
          y: textY,
          opacity,
        }}
        className="container px-4 sm:px-6 lg:px-8 py-20 relative z-10"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div className="flex py-20 items-center lg:gap-8">
            {/* Text Content */}
            <motion.div
              className="flex gap-4 max-w-[80rem]"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={
                !showLogo
                  ? { delay: 7, duration: 1.5, ease: "easeInOut" }
                  : { delay: 1 }
              }
            >
              {/* Title */}
              <motion.h1
                className="heading-1 text-white font-[Miltonian]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 1,
                  ease: "easeInOut",
                }}
              >
                Designing Tomorrow's{" "}
                <span className="text-[50px] md:text-[60px] lg:text-[80px] gradient-text">
                  Architecture
                </span>
              </motion.h1>
              {/* Paragraph
              <motion.p
                className="hidden sm:inline text-medium max-w-sm sm:max-w-lg lg:max-w-2xl text-white/90"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 1,
                  ease: "easeInOut",
                }}
              >
                We create innovative, sustainable, and beautiful
                architectural solutions that stand the test of time.
                Our designs blend functionality with aesthetic excellence
                to shape the future of living spaces.
              </motion.p> */}
            </motion.div>
          </div>
          {/* Buttons */}
          <motion.div
            className="flex flex-col pt-25 sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              !showLogo
                ? { delay: 7, duration: 1.5, ease: "easeInOut" }
                : { delay: 1 }
            }
          >
            <motion.button
              onClick={scrollToProjects}
              className="btn group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Our Work
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
            <motion.button
              onClick={scrollToContact}
              className="btn group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
              <Sparkles className="ml-2 group-hover:rotate-12 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
