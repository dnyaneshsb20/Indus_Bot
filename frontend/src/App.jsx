import { useState, useEffect } from "react";
import { askQuestion } from "./services/api";
import ChatUI from "./components/ChatUI";
import Sidebar from "./components/Sidebar";
import StartupScreen from "./components/StartupScreen";
import ChatSessions from "./components/ChatSessions";
import MachineSettings from "./components/MachineSettings";
import LoginScreen from "./components/LoginScreen";

function App() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // ✅ Auth & Splash states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showStartup, setShowStartup] = useState(false);

  // ✅ Page navigation state
  const [activePage, setActivePage] = useState("dashboard");

  // Start the startup timer only after login
  useEffect(() => {
    if (showStartup) {
      const timer = setTimeout(() => {
        setShowStartup(false);
      }, 5500);
      return () => clearTimeout(timer);
    }
  }, [showStartup]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowStartup(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleNavigate = (page) => {
    setActivePage(page);
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

  // ✅ Flow: Login → Startup → Dashboard
  if (!isLoggedIn) {
    return <LoginScreen isDarkMode={isDarkMode} onLogin={handleLogin} />;
  }

  if (showStartup) {
    return <StartupScreen isDarkMode={isDarkMode} />;
  }

  // Render the active page content
  const renderPage = () => {
    switch (activePage) {
      case 'chatSessions':
        return (
          <ChatSessions
            isDarkMode={isDarkMode}
            onBack={() => setActivePage("dashboard")}
          />
        );
      case 'machineSettings':
        return (
          <MachineSettings
            isDarkMode={isDarkMode}
            onBack={() => setActivePage("dashboard")}
          />
        );
      case 'dashboard':
      default:
        return (
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
          />
        );
    }
  };

  return (
    <div className="h-screen flex">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isDarkMode={isDarkMode}
        activePage={activePage}
        onNavigate={handleNavigate}
        toggleTheme={toggleTheme}
      />

      <div className="flex-1 relative">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;

