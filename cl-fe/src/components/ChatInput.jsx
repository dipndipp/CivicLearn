import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 px-2 py-2 sm:px-4 sm:py-3 bg-gray-50 border-t border-gray-200"
      style={{
        position: "relative",
        width: "100%",
        boxSizing: "border-box",
        minHeight: "60px",
        background: "rgba(250,250,250,0.98)",
      }}
    >
      <input
        type="text"
        className="flex-1 px-4 py-2 sm:px-5 sm:py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 text-base shadow placeholder:text-gray-400 transition-all duration-150"
        placeholder="Ketik pertanyaan hukum di sini…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
        style={{
          minWidth: 0,
          fontSize: "1em",
          background: "#fff",
          border: "1.5px solid #e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
        }}
      />
      <button
        type="submit"
        className="px-4 py-2 sm:px-5 sm:py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition font-semibold shadow flex-shrink-0"
        style={{
          fontSize: "1em",
          minWidth: "70px",
          minHeight: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="hidden sm:inline">Kirim</span>
        <span className="inline sm:hidden">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <path d="M3 12l18-7-7 18-2.5-7.5L3 12z" fill="currentColor" />
          </svg>
        </span>
      </button>
    </form>
  );
}
