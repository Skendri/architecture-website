import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = ({ showLogo }) => {
  const heroRef = useRef(null);

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
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://shuttle-storage.s3.amazonaws.com/arkshelter/Flavor/Videos/Hero%20Video.mp4?1648821220"
          type="video/mp4"
        />
      </video>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Text Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }} // 👈 starting position
            animate={{ opacity: 1, x: 0 }} // 👈 animate to normal position
            transition={
              !showLogo
                ? { delay: 7, duration: 1.5, ease: "easeInOut" }
                : { delay: 1 }
            } // 👈 smooth animation
            style={{ zIndex: 1, maxWidth: "30rem", gap: "7rem" }}
          >
            <motion.h1
              className="heading-1 text-green-900"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.0, ease: "easeInOut" }}
            >
              Designing Tomorrow's{" "}
              <span className="gradient-text">Architecture</span>
            </motion.h1>

            <motion.p
              className="hidden sm:inline text-medium max-w-sm sm:max-w-lg lg:max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.0, ease: "easeInOut" }}
              style={{ color: "whitesmoke" }}
            >
              We create innovative, sustainable, and beautiful architectural
              solutions that stand the test of time. Our designs blend
              functionality with aesthetic excellence to shape the future of
              living spaces.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1.0, ease: "easeInOut" }}
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
                className="btn group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
                <Sparkles className="ml-2 group-hover:rotate-12 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          </motion.div>


        </div>
      </div>
    </section>
  );
};

export default Hero;
