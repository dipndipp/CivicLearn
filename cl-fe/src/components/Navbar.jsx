import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useUser } from "./useUser";
import Modal from "./Modal";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, logout } = useUser();

  const confirmLogout = () => {
    logout();
    setShowProfile(false);
    setShowLogoutModal(false);
    window.location.href = "/";
  };

  return (
    <>
      <header className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-6xl z-50 font-poppins">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/90 backdrop-blur-md rounded-full shadow-lg flex justify-between items-center px-8 py-3 relative"
        >
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/logo.svg"
              alt="CivicLearn Logo"
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation - Centered Absolutely */}
          <nav className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <ul className="flex gap-8 text-base font-semibold text-gray-800">
              <li>
                <Link
                  to="/"
                  className="hover:text-orange-600 transition"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  to="/chat"
                  className="hover:text-orange-600 transition"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Chat
                </Link>
              </li>
              <li>
                <Link
                  to="/mentoring"
                  className="hover:text-orange-600 transition"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Mentoring
                </Link>
              </li>
              <li>
                <Link
                  to="/berita"
                  className="hover:text-orange-600 transition"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Berita
                </Link>
              </li>
            </ul>
          </nav>

          {/* Login Button or User Info */}
          <div className="hidden md:flex items-center gap-3 relative">
            {user && (user.usn || user.email) ? (
              <>
                <span className="text-gray-700 font-semibold">
                  Hello,{" "}
                  {user.usn ? user.usn : user.email ? user.email : "User"}
                </span>
                <button
                  className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center border border-orange-200 hover:bg-orange-200 transition relative"
                  onClick={() => setShowProfile((v) => !v)}
                  aria-label="Profile"
                >
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="8"
                      r="4"
                      stroke="#f4845f"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M4 20v-1c0-2.21 3.58-4 8-4s8 1.79 8 4v1"
                      stroke="#f4845f"
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>
                {/* Modal Logout */}
                {showProfile && (
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute top-16 right-0 bg-white rounded-xl shadow-lg border border-orange-100 p-4 z-50 min-w-[180px] flex flex-col items-center"
                  >
                    <span className="text-gray-700 mb-2 font-semibold text-base">
                      {user.usn ? user.usn : user.email ? user.email : "User"}
                    </span>
                    <button
                      className="w-full bg-orange-500 text-white rounded-lg px-4 py-2 font-semibold hover:bg-orange-600 transition"
                      onClick={() => setShowLogoutModal(true)}
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </>
            ) : (
              <Link to="/login">
                <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden bg-black text-white p-2 rounded-full"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.div>

        {/* Mobile Dropdown */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg rounded-xl p-6 flex flex-col items-center gap-4 font-semibold text-gray-800 md:hidden"
          >
            <Link
              to="/"
              onClick={() => {
                setOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Beranda
            </Link>
            <Link
              to="/chat"
              onClick={() => {
                setOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Chat
            </Link>
            <Link
              to="/mentoring"
              onClick={() => {
                setOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Mentoring
            </Link>
            <Link
              to="/berita"
              onClick={() => {
                setOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Berita
            </Link>
            {user && (user.usn || user.email) ? (
              <div className="flex flex-col items-center gap-2 w-full">
                <span className="text-gray-700 font-semibold">
                  Hello,{" "}
                  {user.usn ? user.usn : user.email ? user.email : "User"}
                </span>
                <button
                  className="w-full bg-orange-500 text-white rounded-lg px-4 py-2 font-semibold hover:bg-orange-600 transition"
                  onClick={() => {
                    setOpen(false);
                    setShowLogoutModal(true);
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)}>
                <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition w-full">
                  Login
                </button>
              </Link>
            )}
          </motion.div>
        )}
      </header>

      {/* Logout Confirmation Modal (always rendered at root, outside header) */}
      <Modal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        fullscreen
      >
        <div className="bg-white/95 rounded-xl shadow-lg border border-orange-100 p-6 max-w-xs w-full mx-auto flex flex-col items-center animate-fadeInUp">
          <div className="mb-3">
            {/* Logout icon: door with arrow */}
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
              <rect
                x="3"
                y="3"
                width="14"
                height="18"
                rx="2"
                fill="#f4845f"
                fillOpacity="0.12"
              />
              <rect
                x="3"
                y="3"
                width="14"
                height="18"
                rx="2"
                stroke="#f4845f"
                strokeWidth="1.5"
              />
              <path
                d="M16 12h5m0 0l-2-2m2 2l-2 2"
                stroke="#f4845f"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="mb-4 text-lg font-semibold text-gray-800 text-center">
            Konfirmasi Logout
          </div>
          <div className="mb-6 text-gray-600 text-center text-sm">
            Apakah Anda yakin ingin logout?
          </div>
          <div className="flex gap-2 w-full">
            <button
              className="flex-1 px-0 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition text-base"
              onClick={confirmLogout}
            >
              Ya, Logout
            </button>
            <button
              className="flex-1 px-0 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition text-base"
              onClick={() => setShowLogoutModal(false)}
            >
              Batal
            </button>
          </div>
        </div>
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp { animation: fadeInUp 0.25s cubic-bezier(.4,0,.2,1) both; }
        `}</style>
      </Modal>
    </>
  );
};

export default Navbar;
