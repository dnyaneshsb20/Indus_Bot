import { useState, useEffect } from "react";
import { askQuestion } from "./services/api";
import ChatUI from "./components/ChatUI";
import Sidebar from "./components/Sidebar";
import StartupScreen from "./components/StartupScreen";

function App() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // ✅ Splash state
  const [showStartup, setShowStartup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStartup(false);
    }, 5500);

    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const sendMessage = async () => {
    if (!question.trim() || !selectedMachine) return;

    setMessages((prev) => [...prev, { sender: "user", text: question }]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await askQuestion(question);
      setMessages((prev) => [...prev, { sender: "bot", text: res.data.answer }]);
    } catch {
      setMessages((prev) => [...prev, { sender: "bot", text: "❌ Backend error" }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  if (showStartup) {
    return <StartupScreen isDarkMode={isDarkMode} />;
  }

  return (
    <div className="h-screen flex">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isDarkMode={isDarkMode}
      />

      <div className="flex-1 relative">
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
