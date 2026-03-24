import hero from "../assets/hero.jpg";
import { motion } from "framer-motion";

const Hero = () => {

  return (

    <div className="relative h-[100vh] w-full overflow-hidden">

      {/* Background Image with Slow Zoom */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 20, ease: "linear" }}
        className="absolute w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${hero})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#d4af37] italic text-xl mb-3 tracking-wide"
        >
          Your Own Time At
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-6xl md:text-7xl font-light tracking-widest mb-6"
        >
          AKANTE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="text-gray-200 max-w-xl text-lg leading-relaxed"
        >
          Grab a cup of coffee with delicious food and spend
          quality time with yourself and your loved ones in a
          relaxing and elegant atmosphere.
        </motion.p>

        {/* Gold Divider */}
        <div className="w-24 h-[2px] bg-[#d4af37] mt-6"></div>

      </div>

    </div>

  );

};

export default Hero;