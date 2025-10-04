import { motion } from "framer-motion";

const SDGSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-red-50 via-white to-blue-50 py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Text */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Fondasi CivicLearn: <br />
            <span className="text-red-600">SDG 4</span> &{" "}
            <span className="text-blue-700">SDG 16</span>
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            CivicLearn dibangun di atas dua pilar penting PBB:{" "}
            <span className="font-semibold">Pendidikan Berkualitas</span> (SDG
            4) untuk memastikan akses pengetahuan hukum bagi semua, dan{" "}
            <span className="font-semibold">
              Perdamaian, Keadilan & Institusi yang Kuat
            </span>{" "}
            (SDG 16) untuk mendorong masyarakat adil, inklusif, dan
            berkelanjutan.
          </p>

          {/* Highlighted Feature */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white rounded-2xl shadow-lg border-t-4 border-red-600"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">SDG 4</h3>
              <p className="text-sm text-gray-600">
                Pendidikan hukum inklusif, mudah diakses, dan relevan dengan
                kebutuhan masyarakat modern.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white rounded-2xl shadow-lg border-t-4 border-blue-700"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">SDG 16</h3>
              <p className="text-sm text-gray-600">
                Menumbuhkan budaya hukum yang adil, transparan, serta mendukung
                institusi yang kuat dan akuntabel.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - SDG Icons */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center items-center gap-8"
        >
          {/* SDG 4 Icon */}
          <motion.img
            src="/img/sdg-04.jpg"
            alt="SDG 4"
            loading="lazy"
            className="w-40 h-40 md:w-48 md:h-48 rounded-xl shadow-lg hover:scale-105 transition"
            whileHover={{ rotate: -5 }}
          />
          {/* SDG 16 Icon */}
          <motion.img
            src="/img/sdg-16.png"
            alt="SDG 16"
            loading="lazy"
            className="w-40 h-40 md:w-48 md:h-48 rounded-xl shadow-lg hover:scale-105 transition"
            whileHover={{ rotate: 5 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default SDGSection;
