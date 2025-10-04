import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Modal from "../../components/Modal";
import { useUser } from "../../components/useUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const errorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Login gagal");
      const data = await res.json();
      // Simpan ke context global
      // Ambil email dari input, usn dari email jika tidak ada di response
      if (!data.usn && email) {
        data.usn = email.split("@")[0];
      }
      if (!data.email && email) {
        data.email = email;
      }
      login(data);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/");
      }, 1200);
    } catch (err) {
      setError(err.message);
      // Trigger shake animation
      if (errorRef.current) {
        errorRef.current.classList.remove("animate-shake");
        void errorRef.current.offsetWidth; // reflow
        errorRef.current.classList.add("animate-shake");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f3ec] px-2">
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          navigate("/");
        }}
        title="Login Berhasil!"
        icon={
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#f4845f" />
            <path
              d="M7 13l3 3 7-7"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      >
        Selamat datang kembali di CivicLearn!
      </Modal>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#f3e7d9] p-5 sm:p-7 flex flex-col gap-5 relative transition-all duration-300 hover:shadow-2xl hover:scale-[1.025]"
      >
        <div className="flex flex-col items-center mb-1 group">
          <img
            src="/cl-icon.svg"
            alt="CivicLearn"
            className="w-10 h-10 mb-1 group-hover:scale-110 transition-transform duration-200"
          />
          <span className="text-xl font-bold text-gray-800 tracking-tight font-sans group-hover:text-orange-500 transition-colors duration-200">
            CivicLearn
          </span>
        </div>
        <div className="flex flex-col items-center justify-center mb-2">
          <h2 className="text-lg font-semibold text-gray-700 text-center mb-1">
            Masuk ke Akun
          </h2>
        </div>
        <p className="text-center text-gray-400 mb-1 text-xs">
          Akses fitur edukasi hukum yang interaktif dan inspiratif
        </p>
        {error && (
          <div
            ref={errorRef}
            className="mb-2 text-red-500 text-center font-medium text-xs animate-shake cursor-help"
            title={error}
          >
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Floating label input */}
          <div className="relative mt-2">
            <input
              type="email"
              id="login-email"
              className={`peer w-full border border-[#f3e7d9] pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 transition text-gray-700 bg-[#f9f7f3] ${
                email ? "not-empty" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              autoComplete="off"
            />
            <span className="absolute left-3 top-2.5 text-orange-300 pointer-events-none">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path
                  d="M2 6.5A2.5 2.5 0 014.5 4h15A2.5 2.5 0 0122 6.5v11a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 012 17.5v-11z"
                  stroke="#f4845f"
                  strokeWidth="1.5"
                />
                <path
                  d="M3 7l8.293 6.293a1 1 0 001.414 0L21 7"
                  stroke="#f4845f"
                  strokeWidth="1.5"
                />
              </svg>
            </span>
            <label
              htmlFor="login-email"
              className={`absolute left-10 top-2.5 text-gray-400 text-sm pointer-events-none transition-all duration-200 origin-left
                ${email ? "-translate-y-5 scale-90 text-orange-500" : ""}
                peer-focus:-translate-y-5 peer-focus:scale-90 peer-focus:text-orange-500
              `}
            >
              Email
            </label>
          </div>
          <div className="relative mt-2">
            <input
              type={showPassword ? "text" : "password"}
              id="login-password"
              className={`peer w-full border border-[#f3e7d9] pl-10 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 transition text-gray-700 bg-[#f9f7f3] ${
                password ? "not-empty" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
            />
            <span className="absolute left-3 top-2.5 text-orange-300 pointer-events-none">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <rect
                  x="3"
                  y="10"
                  width="18"
                  height="10"
                  rx="2"
                  stroke="#f4845f"
                  strokeWidth="1.5"
                />
                <path
                  d="M7 10V7a5 5 0 1110 0v3"
                  stroke="#f4845f"
                  strokeWidth="1.5"
                />
              </svg>
            </span>
            <button
              type="button"
              tabIndex={-1}
              aria-label={
                showPassword ? "Sembunyikan password" : "Tampilkan password"
              }
              title={
                showPassword ? "Sembunyikan password" : "Tampilkan password"
              }
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-2.5 text-orange-300 hover:text-orange-500 transition-colors duration-200 focus:outline-none"
            >
              {showPassword ? (
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"
                    stroke="#f4845f"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                    stroke="#f4845f"
                    strokeWidth="1.5"
                  />
                  <path d="M4 4l16 16" stroke="#f4845f" strokeWidth="1.5" />
                </svg>
              ) : (
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"
                    stroke="#f4845f"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="#f4845f"
                    strokeWidth="1.5"
                  />
                </svg>
              )}
            </button>
            <label
              htmlFor="login-password"
              className={`absolute left-10 top-2.5 text-gray-400 text-sm pointer-events-none transition-all duration-200 origin-left
                ${password ? "-translate-y-5 scale-90 text-orange-500" : ""}
                peer-focus:-translate-y-5 peer-focus:scale-90 peer-focus:text-orange-500
              `}
            >
              Password
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#f7b267] to-[#f4845f] text-white py-2 rounded-lg font-semibold text-base shadow hover:from-[#f4845f] hover:to-[#f7b267] transition-all duration-200 focus:ring-2 focus:ring-orange-200 focus:outline-none active:scale-95 flex items-center justify-center gap-2 mt-2"
            disabled={loading}
            title="Login ke CivicLearn"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
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
                Loading...
              </span>
            ) : (
              <>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Login
              </>
            )}
          </button>
        </form>
        <div className="text-center text-gray-400 mt-1 text-xs">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="font-semibold underline cursor-pointer hover:text-orange-500"
            title="Daftar akun CivicLearn"
          >
            Daftar
          </Link>
        </div>
        <div className="text-center text-xs text-gray-300 mt-2">
          CivicLearn - Belajar Hukum, Mudah & Menyenangkan
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
