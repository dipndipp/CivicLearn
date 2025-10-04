import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/news/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal memuat detail berita");
        return res.json();
      })
      .then(setNews)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen bg-[#f8f3ec] py-8 px-2 flex flex-col">
      <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col">
        <Link
          to="/berita"
          className="mb-4 inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold text-sm group"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              d="M15 19l-7-7 7-7"
              stroke="#f4845f"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Kembali ke Berita
        </Link>
        {loading ? (
          <div className="flex justify-center items-center py-20">
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
          </div>
        ) : error ? (
          <div className="text-center text-red-500 font-semibold py-10">
            {error}
          </div>
        ) : news ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-xl border border-[#f3e7d9] p-7 sm:p-10 flex flex-col gap-5 relative transition-all duration-300 hover:shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src="/cl-icon.svg"
                alt="icon"
                className="w-10 h-10 rounded-full shadow border border-[#f3e7d9] bg-[#f8f3ec]"
              />
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">
                  {new Date(news.created_at).toLocaleString()}
                </span>
                <span className="text-xs text-gray-400">
                  Oleh {news.author}
                </span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 tracking-tight font-sans">
              {news.title}
            </h1>
            <div
              className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed"
              style={{ wordBreak: "break-word" }}
            >
              {news.content.split("\n").map((p, i) => (
                <p key={i} className="mb-3 last:mb-0">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
