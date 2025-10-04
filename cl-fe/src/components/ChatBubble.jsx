import ReactMarkdown from "react-markdown";

const botAvatar = (
  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600">
    🤖
  </span>
);

const userAvatar = (
  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-700">
    🧑
  </span>
);

export default function ChatBubble({ text, sender }) {
  const isBot = sender === "bot";
  return (
    <div
      className={`flex items-start gap-2 mb-3 ${
        isBot ? "self-start" : "self-end flex-row-reverse"
      }`}
    >
      {isBot ? botAvatar : userAvatar}
      <div
        className={`p-3 rounded-xl max-w-[75%] text-sm leading-relaxed shadow-sm ${
          isBot
            ? "bg-white text-gray-900 border border-gray-200"
            : "bg-blue-600 text-white"
        }`}
      >
        <div
          className={`prose prose-sm ${
            isBot ? "prose-gray" : "prose-invert"
          } max-w-none`}
        >
          <ReactMarkdown
            components={{
              h2: ({ node, ...props }) => (
                <h2
                  className={`mt-2 mb-1 font-semibold text-base ${
                    isBot ? "text-gray-800" : "text-white"
                  }`}
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p className="mb-2 last:mb-0" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-5 mb-2 space-y-1" {...props} />
              ),
              li: ({ node, ...props }) => <li {...props} />,
              code: ({ node, ...props }) => (
                <code
                  className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed shadow-sm ${
                    isBot
                      ? "bg-gray-50 text-gray-900 border border-gray-200"
                      : "bg-blue-500 text-white"
                  }`}
                  {...props}
                />
              ),
            }}
          >
            {text}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
