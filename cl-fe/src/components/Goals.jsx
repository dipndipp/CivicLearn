import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBookOpen,
  FaBalanceScale,
  FaRobot,
  FaComments,
  FaUserFriends,
  FaTimes,
} from "react-icons/fa";

const highlights = [
  {
    icon: <FaBookOpen />,
    color: "text-indigo-600",
    title: "Pendidikan Berkualitas",
    desc: "Meningkatkan literasi hukum & civic education agar mudah dipahami semua kalangan.",
  },
  {
    icon: <FaBalanceScale />,
    color: "text-green-600",
    title: "Keadilan yang Inklusif",
    desc: "Mendorong transparansi & akses hukum yang lebih adil bagi masyarakat.",
  },
  {
    icon: <FaRobot />,
    color: "text-gray-700",
    title: "Teknologi Cerdas",
    desc: "Menggunakan AI untuk menyederhanakan akses informasi & layanan hukum.",
  },
];

const SectionMission = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="relative bg-white py-28 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Judul */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-snug"
        >
          Bersama <span className="text-indigo-600">CivicLearn</span>, Mari
          Wujudkan Masa Depan yang{" "}
          <span className="text-green-600">Adil & Inklusif</span>
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-3xl mx-auto text-lg text-gray-600 mb-16"
        >
          CivicLearn mengintegrasikan visi <strong>SDG 4</strong> (pendidikan)
          dan <strong>SDG 16</strong> (institusi yang kuat) melalui teknologi.
          Sebuah langkah nyata untuk membuka akses ilmu, memperkuat keadilan,
          dan membangun masyarakat yang lebih sadar hukum.
        </motion.p>

        {/* Highlights */}
        <div className="grid gap-10 md:grid-cols-3 mb-20">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col items-center"
            >
              {/* Icon wrapper biar rata tengah & konsisten */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-md mb-6">
                <span className={`${h.color} text-3xl`}>{h.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {h.title}
              </h3>
              <p className="text-gray-600 text-base">{h.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA elegan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={() => setShowModal(true)}
            className="inline-block px-10 py-4 rounded-full text-lg font-semibold 
                       bg-orange-600 text-white shadow-md hover:bg-orange-700 
                       transition transform hover:scale-105 focus:outline-none"
          >
            Mulai Perjalanan Bersama CivicLearn 🚀
          </button>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative"
                initial={{ scale: 0.8, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 40 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
                  onClick={() => setShowModal(false)}
                  aria-label="Tutup"
                >
                  <FaTimes />
                </button>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">
                  Pilih Perjalananmu!
                </h3>
                <p className="text-gray-600 mb-6">
                  Mau mulai chat dengan AI atau diskusi bersama mentor?
                </p>
                <div className="flex flex-col gap-4">
                  <a
                    href="/chat"
                    className="flex items-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-lg shadow hover:scale-105 transition"
                  >
                    <FaComments className="text-2xl" />
                    Chat dengan AI
                  </a>
                  <a
                    href="/mentoring"
                    className="flex items-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold text-lg shadow hover:scale-105 transition"
                  >
                    <FaUserFriends className="text-2xl" />
                    Diskusi / Mentoring
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SectionMission;
