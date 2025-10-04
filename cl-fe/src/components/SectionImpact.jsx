import { motion } from "framer-motion";
import {
  FaBalanceScale,
  FaGlobeAsia,
  FaExclamationTriangle,
} from "react-icons/fa";

const impacts = [
  {
    icon: <FaBalanceScale className="text-green-500 text-4xl" />,
    stat: "2.305 Kasus HAM",
    desc: "Komnas HAM menerima 2.305 pengaduan dugaan pelanggaran HAM sepanjang 2024, dengan DKI Jakarta sebagai wilayah terbanyak.",
    source: "Komnas HAM 2024",
    tag: "HAM",
    color: "green",
  },
  {
    icon: <FaExclamationTriangle className="text-red-500 text-4xl" />,
    stat: "113 Konflik Papua",
    desc: "Tercatat 113 peristiwa kekerasan di Papua pada 2024, sebagian besar terkait konflik bersenjata.",
    source: "Detik News 2024",
    tag: "Konflik",
    color: "red",
  },
  {
    icon: <FaGlobeAsia className="text-blue-500 text-4xl" />,
    stat: "Kasus Bloody Paniai",
    desc: "Salah satu kasus pelanggaran HAM berat di Papua yang masih menjadi sorotan hingga kini.",
    source: "Wikipedia",
    tag: "Kasus Besar",
    color: "blue",
  },
];

const SectionImpact = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-40 -z-10" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-100 rounded-full blur-3xl opacity-40 -z-10" />

      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-gray-900 mb-4"
        >
          Fakta & Dampak Nyata
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 max-w-2xl mx-auto mb-12"
        >
          Data terbaru menunjukkan tantangan nyata dalam isu HAM di Indonesia.
          Inilah fakta yang menjadi dasar mengapa platform ini hadir.
        </motion.p>

        {/* Fact Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {impacts.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border-t-4 border-${item.color}-500`}
            >
              {/* Icon */}
              <div className="mb-4">{item.icon}</div>

              {/* Tag */}
              <span
                className={`px-3 py-1 text-xs font-semibold text-${item.color}-600 bg-${item.color}-50 rounded-full mb-2`}
              >
                {item.tag}
              </span>

              {/* Stat */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {item.stat}
              </h3>

              {/* Desc */}
              <p className="text-gray-600 text-sm flex-1">{item.desc}</p>

              {/* Source */}
              <span className="text-xs text-gray-400 mt-4">
                Sumber: {item.source}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionImpact;
