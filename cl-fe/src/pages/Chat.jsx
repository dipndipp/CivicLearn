import { useState, useRef, useEffect } from "react";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import { motion, AnimatePresence } from "framer-motion";

const triviaList = [
  "Tahukah kamu? Setiap warga negara berhak atas bantuan hukum! 🇮🇩",
  "Trivia: Pasal 28D UUD 1945 menjamin persamaan di hadapan hukum.",
  "Fakta: Bantuan hukum gratis tersedia untuk masyarakat kurang mampu.",
  "Tips: Sertakan detail kasus agar CivicBot bisa membantu lebih tepat.",
  "Tahukah kamu? Anak-anak juga punya perlindungan hukum khusus.",
  "UU ITE mengatur soal kejahatan siber di Indonesia.",
  "Hak atas pengacara dijamin dalam KUHAP, lho!",
];

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      text: "Halo 👋, saya CivicBot. Saya siap membantu menjelaskan informasi hukum di Indonesia. Silakan ajukan pertanyaan.",
      sender: "bot",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef(null);
  const [trivia, setTrivia] = useState(triviaList[0]);
  const [showTips, setShowTips] = useState(true);

  const handleSend = async (text) => {
    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setTrivia(triviaList[Math.floor(Math.random() * triviaList.length)]);
    setIsTyping(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
        },
        body: JSON.stringify({
          model: "z-ai/glm-4.5-air:free",
          messages: [
            {
              role: "system",
              content: `Anda adalah CivicBot, asisten hukum virtual.
- Jawab hanya pertanyaan terkait hukum di Indonesia, gunakan bahasa formal.
- Gunakan format Markdown yang rapi dengan heading:
## Ringkasan
(tuliskan ringkasan singkat)

## Penjelasan
(uraikan dengan detail namun tetap jelas)

## Referensi
(cantumkan pasal/undang-undang/peraturan resmi)`,
            },
            { role: "user", content: text },
          ],
        }),
      });

      const data = await res.json();

      const reply =
        data?.choices?.[0]?.message?.content ||
        "⚠️ Tidak ada jawaban dari API.";

      setMessages((prev) => [...prev, { text: reply.trim(), sender: "bot" }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Error koneksi ke server.", sender: "bot" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Auto scroll to bottom
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-100 pt-24 pb-10 px-2 md:px-0 font-poppins flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-3xl mx-auto rounded-2xl shadow-lg flex flex-col h-[80vh] bg-white border border-gray-100"
      >
        {/* Chat Header (sticky) */}
        <div className="sticky top-0 z-20 flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-orange-100/60 to-blue-100/60 backdrop-blur-sm">
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow text-2xl border border-orange-200">
            🤖
          </span>
          <div>
            <h2 className="text-lg font-bold text-gray-900">CivicBot</h2>
            <p className="text-xs text-gray-500">
              Tanya seputar hukum Indonesia
            </p>
          </div>
        </div>

        {/* Tips (sticky, dismissible) */}
        {showTips && (
          <div className="sticky top-14 z-10 px-6 py-2 bg-white/80 border-b border-gray-100 text-xs text-gray-600 flex items-center gap-2 backdrop-blur-sm">
            <span className="text-orange-400 text-lg">💡</span>
            <span className="flex-1">
              Tips: Tanyakan seputar <b>UU, pasal, hak warga, bantuan hukum</b>,
              dsb. Jawaban akan disertai referensi resmi.
            </span>
            <button
              aria-label="Tutup tips"
              title="Tutup tips"
              onClick={() => setShowTips(false)}
              className="ml-2 text-gray-400 hover:text-orange-500 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-orange-200"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path
                  d="M6 6l12 12M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Chat Body */}
        <div
          ref={chatBodyRef}
          className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1 bg-white"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.18 }}
              >
                <ChatBubble text={msg.text} sender={msg.sender} />
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-2 mb-3 self-start">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600">
                  🤖
                </span>
                <div className="p-3 rounded-xl max-w-[75%] text-sm leading-relaxed shadow-sm bg-white text-gray-900 border border-gray-200 flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                    <span className="text-xs text-gray-400 ml-2">
                      CivicBot sedang mengetik…
                    </span>
                  </div>
                  <div className="text-xs text-orange-500 italic">{trivia}</div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Chat Input (sticky bottom) */}
        <div className="sticky bottom-0 z-30 border-t border-gray-100 bg-white px-4 py-3">
          <ChatInput onSend={handleSend} />
        </div>
      </motion.div>
    </div>
  );
}
