import { useState } from "react";
import { askQuestion } from "./services/api";
import ChatUI from "./components/ChatUI";
import Sidebar from "./components/Sidebar";

function App() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false); // ✅ added

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const sendMessage = async () => {
    if (!question.trim() || !selectedMachine) return;

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
    <div className="h-screen flex">

      {/* Sidebar (UNCHANGED) */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isDarkMode={isDarkMode}
      />

      {/* Chat Section */}
      <div className="flex-1 relative">

        {/* Hamburger when sidebar closed */}
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="absolute top-4 left-4 z-10 bg-gray-800 text-white px-3 py-1 rounded"
          >
            ☰
          </button>
        )}

        <ChatUI
          messages={messages}
          question={question}
          setQuestion={setQuestion}
          sendMessage={sendMessage}
          loading={loading}
          isSidebarOpen={isSidebarOpen}
          selectedMachine={selectedMachine}
          setSelectedMachine={setSelectedMachine}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      </div>

    </div>
  );
}

export default App;
