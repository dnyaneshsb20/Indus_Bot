import { useState, useEffect, useRef, useCallback } from "react";
import { askQuestion, getMessages } from "./services/api";
import ChatUI from "./components/ChatUI";
import Sidebar from "./components/Sidebar";
import StartupScreen from "./components/StartupScreen";
import ChatSessions from "./components/ChatSessions";
import MachineSettings from "./components/MachineSettings";
import Documentation from "./components/Documentation";
import KnowledgeBase from "./components/KnowledgeBase";
import Settings from "./components/Settings/Settings";
import LoginScreen from "./components/LoginScreen";
import SessionTimeoutModal from "./components/SessionTimeoutModal";

function App() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth >= 1024;
  });
  const [selectedMachine, setSelectedMachine] = useState("");
  const [chatId, setChatId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // ✅ Auth & Splash states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showStartup, setShowStartup] = useState(false);

  // ✅ Page navigation state
  const [activePage, setActivePage] = useState("dashboard");

  // ✅ Appearance settings — lifted from Settings component & persisted
  const [appearance, setAppearance] = useState(() => {
    const saved = localStorage.getItem("appearance");
    return saved
      ? JSON.parse(saved)
      : {
        fontSize: "medium",
        language: "English",
        compactMode: false,
        animations: true,
        chatBubbleStyle: "modern",
      };
  });

  // ✅ Session Timeout — lifted from Settings, persisted in localStorage
  const [sessionTimeout, setSessionTimeout] = useState(() => {
    return localStorage.getItem("sessionTimeout") || "30";
  });

  // Session timeout warning state
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const [timeoutSecondsLeft, setTimeoutSecondsLeft] = useState(30);

  // Refs for timeout management
  const inactivityTimerRef = useRef(null);
  const warningTimerRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  const WARNING_DURATION = 30; // seconds of warning before auto-logout

  // Persist session timeout
  useEffect(() => {
    localStorage.setItem("sessionTimeout", sessionTimeout);
  }, [sessionTimeout]);

  // ✅ Reset inactivity timer — called on every user activity
  const resetInactivityTimer = useCallback(() => {
    // Don't track if not logged in, or timeout is "never"
    if (!isLoggedIn || showStartup || sessionTimeout === "never") return;

    // Clear existing timers
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    // Hide warning if it's showing (user became active)
    setShowTimeoutWarning(false);
    setTimeoutSecondsLeft(WARNING_DURATION);

    // Calculate timeout in milliseconds (subtract warning duration)
    const timeoutMinutes = parseInt(sessionTimeout, 10);
    const timeoutMs = timeoutMinutes * 60 * 1000 - WARNING_DURATION * 1000;

    // Set the inactivity timer
    inactivityTimerRef.current = setTimeout(() => {
      // Show the warning modal
      setShowTimeoutWarning(true);
      setTimeoutSecondsLeft(WARNING_DURATION);

      // Start countdown
      let secondsRemaining = WARNING_DURATION;
      countdownIntervalRef.current = setInterval(() => {
        secondsRemaining -= 1;
        setTimeoutSecondsLeft(secondsRemaining);

        if (secondsRemaining <= 0) {
          clearInterval(countdownIntervalRef.current);
          // Auto-logout
          handleLogout();
        }
      }, 1000);
    }, timeoutMs);
  }, [isLoggedIn, showStartup, sessionTimeout]);

  // ✅ Track user activity — attach/detach event listeners
  useEffect(() => {
    if (!isLoggedIn || showStartup || sessionTimeout === "never") {
      // Cleanup if not needed
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      setShowTimeoutWarning(false);
      return;
    }

    const activityEvents = ["mousemove", "mousedown", "keydown", "scroll", "touchstart", "click"];

    const handleActivity = () => {
      // Only reset if the warning is not showing (to avoid resetting during warning)
      if (!showTimeoutWarning) {
        resetInactivityTimer();
      }
    };

    // Attach listeners
    activityEvents.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Start the initial timer
    resetInactivityTimer();

    // Cleanup
    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [isLoggedIn, showStartup, sessionTimeout, resetInactivityTimer, showTimeoutWarning]);

  // ✅ "Stay Logged In" — user clicked to stay
  const handleStayLoggedIn = () => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setShowTimeoutWarning(false);
    setTimeoutSecondsLeft(WARNING_DURATION);
    resetInactivityTimer();
  };

  // Persist appearance settings to localStorage
  useEffect(() => {
    localStorage.setItem("appearance", JSON.stringify(appearance));
  }, [appearance]);

  // ✅ Apply appearance settings to the root element
  useEffect(() => {
    const root = document.documentElement;

    // Font size — set CSS variable
    const fontSizeMap = { small: "14px", medium: "16px", large: "18px" };
    root.style.setProperty("--app-font-size", fontSizeMap[appearance.fontSize] || "16px");

    // Compact mode — toggle class
    if (appearance.compactMode) {
      root.classList.add("compact-mode");
    } else {
      root.classList.remove("compact-mode");
    }

    // Animations — toggle class
    if (!appearance.animations) {
      root.classList.add("no-animations");
    } else {
      root.classList.remove("no-animations");
    }

    // Language — set lang attribute on <html>
    const langMap = { English: "en", Hindi: "hi", Marathi: "mr" };
    root.setAttribute("lang", langMap[appearance.language] || "en");
  }, [appearance]);

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

  // ✅ Logout handler — used after password change, session timeout, etc.
  const handleLogout = () => {
    // Clear all timers
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    setShowTimeoutWarning(false);
    setIsLoggedIn(false);
    setShowStartup(false);
    setActivePage('dashboard');
    setMessages([]);
    setQuestion('');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    // Auto-close sidebar on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setQuestion("");
    setChatId(null);
    setActivePage("dashboard");
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const handleLoadChat = async (id, machineName = null) => {
    setLoading(true);
    
    try {
      const res = await getMessages(id);
      const loadedMessages = res.data.map(m => ({
        sender: m.sender,
        text: m.content?.text || ""
      }));
      
      setMessages(loadedMessages);
      setChatId(id);
      if (machineName) {
        setSelectedMachine(machineName);
      }
      setActivePage("dashboard");
    } catch (err) {
      console.error("Failed to load chat messages:", err);
      // Even if load fails, we should probably go to dashboard to show the error
      setMessages([{ sender: "bot", text: "❌ Failed to load messages. Please try again." }]);
      setActivePage("dashboard");
    } finally {
      setLoading(false);
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    }
  };

  const sendMessage = async () => {

    if (!question.trim() || !selectedMachine) return;

    const userMessage = {
      sender: "user",
      text: question
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {

      const res = await askQuestion(question, chatId);

      // Save chat id returned from backend
      if (!chatId) {
        setChatId(res.data.chat_id);
      }

      const botMessage = {
        sender: "bot",
        text: res.data.answer
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Backend error" }
      ]);

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
            onNewChat={handleNewChat}
            onLoadChat={handleLoadChat}
          />
        );
      case 'machineSettings':
        return (
          <MachineSettings
            isDarkMode={isDarkMode}
            onBack={() => setActivePage("dashboard")}
          />
        );
      case 'documentation':
        return (
          <Documentation
            isDarkMode={isDarkMode}
            onBack={() => setActivePage("dashboard")}
          />
        );
      case 'knowledgeBase':
        return (
          <KnowledgeBase
            isDarkMode={isDarkMode}
            onBack={() => setActivePage("dashboard")}
          />
        );
      case 'settings':
        return (
          <Settings
            isDarkMode={isDarkMode}
            onBack={() => setActivePage("dashboard")}
            toggleTheme={toggleTheme}
            appearance={appearance}
            setAppearance={setAppearance}
            onLogout={handleLogout}
            sessionTimeout={sessionTimeout}
            setSessionTimeout={setSessionTimeout}
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
            toggleSidebar={toggleSidebar}
            selectedMachine={selectedMachine}
            setSelectedMachine={setSelectedMachine}
            isDarkMode={isDarkMode}
            appearance={appearance}
          />
        );
    }
  };

  return (
    <div className="h-screen flex" style={{ fontSize: "var(--app-font-size, 16px)" }}>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isDarkMode={isDarkMode}
        activePage={activePage}
        onNavigate={handleNavigate}
        toggleTheme={toggleTheme}
        onLoadChat={handleLoadChat}
      />

      <div className="flex-1 relative">
        {renderPage()}
      </div>

      {/* Session Timeout Warning Modal */}
      <SessionTimeoutModal
        isOpen={showTimeoutWarning}
        isDarkMode={isDarkMode}
        secondsLeft={timeoutSecondsLeft}
        onStayLoggedIn={handleStayLoggedIn}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default App;
