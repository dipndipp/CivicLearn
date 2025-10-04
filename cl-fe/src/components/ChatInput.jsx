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
      className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-t border-gray-200"
    >
      <input
        type="text"
        className="flex-1 px-5 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900 text-base shadow"
        placeholder="Ketik pertanyaan hukum di sini…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />
      <button
        type="submit"
        className="px-5 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition font-semibold shadow"
      >
        Kirim
      </button>
    </form>
  );
}
