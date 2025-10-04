import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Berita() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/news")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal memuat berita");
        return res.json();
      })
      .then(setNews)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-[#f8f3ec] to-orange-100 pb-10 pt-24 px-2 flex flex-col">
      {/* Hero Section with animation */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto w-full flex flex-col sm:flex-row items-center gap-6 sm:gap-10 mb-8 px-2"
      >
        <motion.img
          src="/img/sdg-16.png"
          alt="Ilustrasi Berita"
          className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl border border-[#f3e7d9] bg-[#f8f3ec] object-cover shadow-lg shadow-orange-100"
          initial={{ scale: 0.8, rotate: -8, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 14,
            delay: 0.2,
          }}
        />
        <div className="flex-1 text-center sm:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold text-orange-500 mb-2 tracking-tight font-sans drop-shadow"
          >
            Portal Berita Hukum
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-500 text-base sm:text-lg"
          >
            Update terbaru seputar hukum, regulasi, dan edukasi masyarakat.
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto w-full flex-1">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-20"
            >
              <svg
                className="animate-spin h-8 w-8 text-orange-400"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-red-500 font-semibold py-10"
            >
              {error}
            </motion.div>
          ) : news.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-400 py-10"
            >
              Belum ada berita.
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.08 },
                },
                exit: { opacity: 0, y: 20 },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {news.map((item, idx) => (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.97 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 90,
                        delay: idx * 0.04,
                      },
                    },
                    exit: { opacity: 0, y: 30, scale: 0.97 },
                  }}
                  whileHover={{
                    scale: 1.025,
                    boxShadow: "0 8px 32px 0 rgba(244,132,95,0.13)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="relative bg-white rounded-2xl border border-[#f3e7d9] shadow p-5 flex flex-col gap-3 cursor-pointer transition-all duration-200 group hover:shadow-xl hover:border-orange-300 hover:-translate-y-0.5 overflow-hidden"
                >
                  <Link
                    to={`/berita/${item.id}`}
                    className="absolute inset-0 z-10"
                  />
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src="/cl-icon.svg"
                      alt="icon"
                      className="w-7 h-7 rounded-full border border-[#f3e7d9] bg-[#f8f3ec]"
                    />
                    <span className="text-xs text-gray-400">
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <motion.h2
                    className="text-lg font-bold text-gray-800 group-hover:text-orange-500 transition-colors duration-150 line-clamp-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.04, duration: 0.3 }}
                  >
                    {item.title}
                  </motion.h2>
                  <motion.div
                    className="text-gray-500 text-sm line-clamp-3 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + idx * 0.04, duration: 0.3 }}
                  >
                    {item.content}
                  </motion.div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-400">
                      Oleh {item.author}
                    </span>
                    <motion.span
                      className="text-xs font-semibold text-orange-400 group-hover:text-orange-500 transition-colors duration-150 flex items-center gap-1"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.18 + idx * 0.04, duration: 0.3 }}
                    >
                      Lihat Detail
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <motion.path
                          d="M5 12h14M12 5l7 7-7 7"
                          stroke="#f4845f"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{
                            delay: 0.22 + idx * 0.04,
                            duration: 0.4,
                            type: "spring",
                          }}
                        />
                      </svg>
                    </motion.span>
                  </div>
                  {/* Decorative animated accent */}
                  <motion.div
                    className="absolute -top-6 -right-6 w-20 h-20 bg-orange-100 rounded-full opacity-40 z-0"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.4 }}
                    transition={{
                      delay: 0.2 + idx * 0.04,
                      duration: 0.5,
                      type: "spring",
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
