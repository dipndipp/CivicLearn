import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ show, onClose, title, children, icon, fullscreen }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/40 ${
            fullscreen ? "px-2 py-8" : ""
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`bg-white rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col items-center relative border border-orange-100 ${
              fullscreen ? "p-8 sm:p-10" : "p-7"
            }`}
          >
            {icon && <div className="mb-2">{icon}</div>}
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
              {title}
            </h3>
            <div className="mb-4 text-center text-gray-500 text-base">
              {children}
            </div>
            {!fullscreen && (
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2 rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold shadow hover:from-orange-500 hover:to-orange-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-200"
              >
                Tutup
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
