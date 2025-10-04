import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
    // Tambahkan logic submit ke backend/newsletter service jika ada
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-12 items-start">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">CivicLearn</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Platform edukasi & layanan masyarakat berbasis teknologi.
            <br />
            Mengintegrasikan SDG 4 & 16 untuk masa depan yang lebih adil,
            inklusif, dan berdaya.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h4 className="text-white font-semibold mb-4">Navigasi</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-white transition"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link
                to="/chat"
                className="hover:text-white transition"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Chat
              </Link>
            </li>
            <li>
              <Link
                to="/mentoring"
                className="hover:text-white transition"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Mentoring
              </Link>
            </li>
            <li>
              <Link
                to="/berita"
                className="hover:text-white transition"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Berita
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold mb-4">Newsletter</h4>
          <p className="text-gray-400 text-sm mb-4">
            Dapatkan info & update terbaru seputar CivicLearn langsung ke
            emailmu.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              required
              placeholder="Email kamu..."
              className="px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitted}
            />
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-lg transition"
              disabled={submitted}
            >
              {submitted ? "Terdaftar!" : "Langganan"}
            </button>
          </form>
          {submitted && (
            <span className="text-green-400 text-xs mt-2 block">
              Terima kasih sudah berlangganan!
            </span>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} CivicLearn. All Right Reserved.
      </div>
    </footer>
  );
};

export default Footer;
