import { useState } from "react";
import { askQuestion } from "./services/api";

function App() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!question.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: question },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const res = await askQuestion(question);
      const answer = res.data.answer || "No response";

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: answer },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Backend error" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col p-4">

      {/* Header */}
      <h1 className="text-xl font-bold mb-4">
        🤖 Andon AI Chatbot
      </h1>

      {/* Messages */}
      <div className="flex-1 border p-3 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded max-w-xl ${
              msg.sender === "user"
                ? "bg-blue-100 ml-auto text-right"
                : "bg-gray-200 mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="bg-gray-200 p-2 rounded w-fit">
            Typing...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2 mt-3">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your question..."
          className="flex-1 border px-3 py-2"
        />
        <button
          onClick={sendMessage}
          className="border px-4 py-2 bg-blue-500 text-white"
        >
          Send
        </button>
      </div>

    </div>
  );
}

export default App;
