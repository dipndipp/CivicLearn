import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-[#f8f3ec] pt-32 pb-16 px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        {/* Left Content */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900 font-poppins">
            Hukum Bijak, <br />
            Wujudkan Masa Depan <br />
            <span className="text-orange-500">Berkelanjutan</span>
          </h1>

          <p className="mt-4 text-gray-600 text-lg md:text-xl max-w-xl mx-auto md:mx-0">
            CivicLearn membantu masyarakat memahami hukum dengan cara yang
            sederhana, interaktif, dan mudah diakses.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/mentoring">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-orange-600 transition w-full sm:w-auto"
              >
                Forum Diskusi
              </motion.button>
            </Link>
            <Link to="/berita">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition w-full sm:w-auto"
              >
                Jelajahi Topik Hukum
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center md:justify-end"
        >
          <img
            src="/img/hero.png"
            loading="lazy"
            alt="CivicLearn Discussion"
            className="w-[85%] md:w-[90%] lg:w-[80%] rounded-xl shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
