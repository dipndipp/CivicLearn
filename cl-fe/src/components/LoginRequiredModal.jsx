import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function LoginRequiredModal({ show, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-[95vw] flex flex-col items-center gap-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-2 right-3 text-gray-400 hover:text-orange-400 text-xl"
              onClick={onClose}
              aria-label="Tutup"
            >
              &times;
            </button>
            <img
              src="/cl-icon.svg"
              alt="CivicLearn"
              className="w-14 h-14 mb-2"
            />
            <h2 className="text-xl font-bold text-orange-500 text-center">
              Login atau Daftar Dulu
            </h2>
            <p className="text-gray-600 text-center text-sm mb-2">
              Untuk mengakses forum mentoring, menambah atau membalas diskusi,
              kamu harus login atau daftar akun CivicLearn.
            </p>
            <div className="flex gap-3 w-full justify-center mt-2">
              <Link
                to="/login"
                className="bg-orange-500 text-white rounded px-4 py-2 font-bold hover:bg-orange-400 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-orange-100 text-orange-500 rounded px-4 py-2 font-bold hover:bg-orange-200 border border-orange-200 transition"
              >
                Daftar
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
