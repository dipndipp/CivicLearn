import { motion } from "framer-motion";
import { BookOpen, MessageSquare, Users } from "lucide-react";

const services = [
  {
    title: "Forum & Mentoring",
    description:
      "Gabung forum interaktif dan mentoring langsung dari pakar hukum untuk memperluas wawasanmu.",
    icon: <Users className="w-6 h-6 text-white" />,
    color: "from-blue-500 to-indigo-600",
    type: "forum",
  },
  {
    title: "AI Chatbot",
    description:
      "Tanyakan apa saja tentang hukum secara instan dan dapatkan jawaban jelas dengan AI.",
    icon: <MessageSquare className="w-6 h-6 text-white" />,
    color: "from-green-500 to-emerald-600",
    type: "chatbot",
  },
  {
    title: "Materi Hukum",
    description:
      "Akses ringkasan materi hukum yang mudah dipahami, terpercaya, dan selalu up-to-date.",
    icon: <BookOpen className="w-6 h-6 text-white" />,
    color: "from-orange-400 to-red-500",
    type: "materi",
  },
];

const bubbleVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const ServiceSection = () => {
  return (
    <section className="bg-[#f8f3ec] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
        {/* Left Title */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-1 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
            CivicLearn <br /> Services
          </h2>
          <p className="text-gray-600 text-lg">
            Layanan utama untuk mendukung pembelajaran hukum yang modern,
            fleksibel, dan mudah diakses.
          </p>
        </motion.div>

        {/* Right Services */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              className="relative group bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 p-8 flex flex-col"
            >
              {/* Icon */}
              <div
                className={`relative z-10 w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-r ${service.color} mb-6 shadow`}
              >
                {service.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                {service.description}
              </p>

              {/* Dynamic Preview */}
              {service.type === "chatbot" && (
                <div className="relative z-10 mt-6 bg-gray-50 rounded-xl p-4 text-sm shadow-inner flex flex-col gap-3 h-32 overflow-hidden pb-6">
                  <motion.div
                    variants={bubbleVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="self-start bg-white px-4 py-2 rounded-lg shadow text-gray-700"
                  >
                    Apa itu pasal 27 ayat 3?
                  </motion.div>
                  <motion.div
                    variants={bubbleVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="self-end bg-green-500 text-white px-4 py-2 rounded-lg shadow"
                  >
                    Pasal 27 ayat 3 KUHP mengatur tentang pencemaran nama
                    baik...
                  </motion.div>
                </div>
              )}

              {service.type === "forum" && (
                <div className="relative z-10 mt-6 bg-gray-50 rounded-xl p-4 text-sm shadow-inner flex flex-col gap-3 h-32 overflow-hidden">
                  <motion.div
                    variants={bubbleVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-200" />
                    <span className="text-gray-700">
                      Bagaimana pendapatmu tentang RKUHP?
                    </span>
                  </motion.div>
                  <motion.div
                    variants={bubbleVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="flex items-center gap-2 ml-auto"
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-200" />
                    <span className="text-gray-700">
                      Menurut saya masih perlu revisi.
                    </span>
                  </motion.div>
                </div>
              )}

              {service.type === "materi" && (
                <div className="relative z-10 mt-6 bg-gray-50 rounded-xl p-4 text-sm shadow-inner flex flex-col gap-2 h-32 overflow-hidden">
                  {["Pasal 27 KUHP", "Hukum Lingkungan", "HAM Dasar"].map(
                    (materi, idx) => (
                      <motion.div
                        key={idx}
                        variants={bubbleVariants}
                        initial="hidden"
                        whileInView="visible"
                        transition={{ delay: idx * 0.2, duration: 0.3 }}
                        className="flex items-center justify-between text-gray-700"
                      >
                        <span className="font-medium">{materi}</span>
                        <span className="text-xs text-gray-500">
                          {3 + idx} min read
                        </span>
                      </motion.div>
                    )
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
