import { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "../components/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import LoginRequiredModal from "../components/LoginRequiredModal";

// No more initialThreads, will fetch from backend

function randomColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 70%, 90%)`;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });
}

export default function Mentoring() {
  const { user } = useContext(UserContext);
  const [threads, setThreads] = useState([]);
  const [replyCounts, setReplyCounts] = useState({});
  const [selectedThread, setSelectedThread] = useState(null);
  const [showNewThread, setShowNewThread] = useState(false);
  const [newThread, setNewThread] = useState({ title: "", content: "" });
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState([]);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [errorReplies, setErrorReplies] = useState("");
  const replyInputRef = useRef(null);

  // Fetch threads from backend
  async function fetchThreads() {
    try {
      const res = await fetch(
        "https://civiclearn-production.up.railway.app/forum"
      );
      if (!res.ok) throw new Error("Gagal fetch forum");
      const data = await res.json();
      const threadsArr = Array.isArray(data)
        ? data.map((t) => ({
            id: t.id,
            title: t.title,
            body: t.body,
            author: t.author,
            created_at: t.created_at,
          }))
        : [];
      setThreads(threadsArr);
      // Fetch reply counts for each thread
      const counts = {};
      await Promise.all(
        threadsArr.map(async (t) => {
          try {
            const res = await fetch(
              `https://civiclearn-production.up.railway.app/forum/${t.id}/replies`
            );
            if (!res.ok) throw new Error();
            const replies = await res.json();
            counts[t.id] = Array.isArray(replies) ? replies.length : 0;
          } catch {
            counts[t.id] = 0;
          }
        })
      );
      setReplyCounts(counts);
    } catch {
      setThreads([]);
      setReplyCounts({});
    }
  }

  // Fetch on mount
  useEffect(() => {
    fetchThreads();
  }, []);

  // Fetch replies when thread opened
  async function handleOpenThread(thread) {
    setSelectedThread(thread);
    setReplies([]);
    setErrorReplies("");
    setLoadingReplies(true);
    try {
      const res = await fetch(
        `https://civiclearn-production.up.railway.app/forum/${thread.id}/replies`
      );
      if (!res.ok) throw new Error("Gagal mengambil balasan");
      const data = await res.json();
      setReplies(Array.isArray(data) ? data : []);
    } catch (e) {
      setErrorReplies("Gagal mengambil balasan");
    } finally {
      setLoadingReplies(false);
      setTimeout(() => replyInputRef.current?.focus(), 350);
    }
  }

  // Post new thread to backend
  async function handlePostThread(e) {
    e.preventDefault();
    if (!newThread.title.trim() || !newThread.content.trim()) return;
    try {
      const res = await fetch(
        "https://civiclearn-production.up.railway.app/forum",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newThread.title,
            body: newThread.content,
            author: user?.usn || user?.email || "User",
          }),
        }
      );
      if (!res.ok) throw new Error("Gagal posting thread");
      // Setelah post, fetch ulang agar auto-refresh
      await fetchThreads();
      setShowNewThread(false);
      setNewThread({ title: "", content: "" });
    } catch (err) {
      alert("Gagal posting thread");
    }
  }

  // Post reply to backend
  async function handlePostReply(e) {
    e.preventDefault();
    if (!replyText.trim() || !selectedThread) return;
    try {
      const res = await fetch(
        `https://civiclearn-production.up.railway.app/forum/${selectedThread.id}/replies`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            body: replyText,
            author: user?.usn || user?.email || "User",
          }),
        }
      );
      if (!res.ok) throw new Error("Gagal mengirim balasan");
      const reply = await res.json();
      setReplies((prev) => [...prev, reply]);
      setReplyText("");
      replyInputRef.current?.focus();
    } catch (e) {
      alert("Gagal mengirim balasan");
    }
  }

  const [showLoginModal, setShowLoginModal] = useState(false);
  // Cek login: jika belum login, blokir interaksi forum
  const isLoggedIn = !!user?.token;

  // Handler untuk interaksi yang butuh login
  function requireLogin(action) {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return false;
    }
    return true;
  }

  return (
    <div className="min-h-screen bg-[#f8f3ec] flex flex-col items-center relative overflow-x-hidden pt-30 pb-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full flex flex-col items-center mb-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-3xl font-bold text-center text-orange-500 mb-2"
        >
          Forum Mentoring
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-gray-600 max-w-xl"
        >
          Bertanya, berbagi pengalaman, dan saling membantu seputar hukum &
          kehidupan masyarakat.
        </motion.p>
      </motion.div>

      {/* Floating New Thread Button */}
      <motion.button
        onClick={() => {
          if (requireLogin()) setShowNewThread(true);
        }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-6 right-6 z-30 bg-orange-500 text-white font-bold rounded-full shadow-md px-5 py-3 flex items-center gap-2 hover:bg-orange-400 active:bg-orange-600 transition-all duration-150"
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 5v14m7-7H5"
          />
        </svg>
        Buat Diskusi
      </motion.button>

      {/* Modal Thread Baru */}
      <AnimatePresence>
        {showNewThread && isLoggedIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
            onClick={() => setShowNewThread(false)}
          >
            <motion.form
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="bg-white rounded-xl shadow p-6 w-[95vw] max-w-md flex flex-col gap-3 relative"
              onClick={(e) => e.stopPropagation()}
              onSubmit={handlePostThread}
            >
              <button
                type="button"
                className="absolute top-2 right-3 text-gray-400 hover:text-orange-400 text-xl"
                onClick={() => setShowNewThread(false)}
              >
                &times;
              </button>
              <h2 className="text-lg font-bold text-orange-500">
                Buat Diskusi Baru
              </h2>
              <input
                className="border border-orange-200 rounded px-3 py-2 focus:ring-2 focus:ring-orange-200"
                placeholder="Judul diskusi..."
                value={newThread.title}
                onChange={(e) =>
                  setNewThread({ ...newThread, title: e.target.value })
                }
                required
              />
              <textarea
                className="border border-orange-200 rounded px-3 py-2 focus:ring-2 focus:ring-orange-200 min-h-[80px]"
                placeholder="Tulis pertanyaan atau topik..."
                value={newThread.content}
                onChange={(e) =>
                  setNewThread({ ...newThread, content: e.target.value })
                }
                required
              />
              <button
                type="submit"
                className="bg-orange-500 text-white rounded px-4 py-2 font-bold hover:bg-orange-400"
              >
                Posting
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Daftar Thread atau Detail */}
      <div className="max-w-2xl w-full mx-auto px-2 pb-20">
        {/* Jika belum login, tampilkan placeholder interaktif dan blokir forum */}
        {!isLoggedIn ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] gap-6 p-8 bg-white/80 rounded-xl border border-orange-100 mt-10 shadow">
            <img
              src="/cl-icon.svg"
              alt="CivicLearn"
              className="w-16 h-16 mb-2"
            />
            <h2 className="text-xl font-bold text-orange-500 text-center">
              Login atau Daftar Dulu
            </h2>
            <p className="text-gray-600 text-center max-w-md">
              Untuk mengakses forum mentoring, menambah atau membalas diskusi,
              kamu harus login atau daftar akun CivicLearn. Yuk gabung dan mulai
              berdiskusi!
            </p>
            <div className="flex gap-3 mt-2">
              <a
                href="/login"
                className="bg-orange-500 text-white rounded px-4 py-2 font-bold hover:bg-orange-400 transition"
              >
                Login
              </a>
              <a
                href="/register"
                className="bg-orange-100 text-orange-500 rounded px-4 py-2 font-bold hover:bg-orange-200 border border-orange-200 transition"
              >
                Daftar
              </a>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {!selectedThread ? (
              // ...existing code for thread list...
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
                className="flex flex-col gap-5"
              >
                {threads.map((thread, idx) => (
                  <motion.div
                    key={thread.id}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { delay: idx * 0.05 },
                      },
                      exit: { opacity: 0, y: 30 },
                    }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 8px 24px rgba(244,132,95,0.15)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-xl border border-orange-100 p-4 cursor-pointer"
                    onClick={() => handleOpenThread(thread)}
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-orange-500 bg-orange-50">
                        {thread.author?.[0] || "?"}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700 text-sm">
                          {thread.author}
                        </span>
                        <span className="ml-2 text-xs text-gray-400">
                          {formatDate(thread.created_at)}
                        </span>
                      </div>
                      <span className="ml-auto text-xs text-orange-500 font-semibold bg-orange-50 rounded-full px-3 py-1">
                        {replyCounts[thread.id] ?? 0} Balasan
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-gray-800">
                      {thread.title}
                    </h2>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {thread.body}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // ...existing code for thread detail...
              <motion.div
                key={selectedThread.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                className="bg-white rounded-xl border border-orange-100 p-4 flex flex-col gap-3 relative"
              >
                <button
                  onClick={() => setSelectedThread(null)}
                  className="text-xs text-orange-500 hover:underline w-fit"
                >
                  &larr; Kembali
                </button>
                <h2 className="text-lg font-bold text-gray-800">
                  {selectedThread.title}
                </h2>
                <p className="text-gray-600 mb-2">{selectedThread.body}</p>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-orange-500 bg-orange-50">
                    {selectedThread.author?.[0] || "?"}
                  </div>
                  <span className="font-semibold text-gray-700 text-xs">
                    {selectedThread.author}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDate(selectedThread.created_at)}
                  </span>
                </div>
                <div className="border-t border-orange-100 pt-3 flex flex-col gap-3">
                  <span className="text-sm text-gray-400 font-semibold">
                    {loadingReplies
                      ? "Memuat balasan..."
                      : errorReplies
                      ? errorReplies
                      : `${replies.length} Balasan`}
                  </span>
                  <AnimatePresence>
                    {replies.map((reply, idx) => (
                      <motion.div
                        key={reply.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-3 bg-orange-50/50 rounded-lg p-2 border border-orange-100"
                      >
                        <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-orange-500 bg-orange-100">
                          {reply.author?.[0] || "?"}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-700 text-xs">
                              {reply.author}
                            </span>
                            <span className="text-xs text-gray-400">
                              {formatDate(reply.created_at)}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm whitespace-pre-line">
                            {reply.body}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <form
                  className="flex items-end gap-2 mt-4 bg-orange-50/40 rounded-lg p-2 border border-orange-100"
                  onSubmit={handlePostReply}
                >
                  <textarea
                    ref={replyInputRef}
                    className="flex-1 border border-orange-200 rounded px-2 py-1 focus:ring-2 focus:ring-orange-200 min-h-[32px] max-h-28 resize-y"
                    placeholder="Tulis balasan..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    disabled={loadingReplies}
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 text-white font-bold rounded px-3 py-2 hover:bg-orange-400 active:bg-orange-600"
                    disabled={loadingReplies || !replyText.trim()}
                  >
                    Kirim
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Modal login/daftar wajib login */}
      <LoginRequiredModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
