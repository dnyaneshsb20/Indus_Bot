import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Search, 
  Bell, 
  Settings, 
  LogOut, 
  User, 
  ChevronDown,
  MessageSquare,
  HelpCircle,
  Zap,
  Sparkles,
  Bot,
  BarChart3,
  Users,
  FileText,
  Shield
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, text: "AI model update available", time: "2 mins ago", read: false },
    { id: 2, text: "New conversation saved", time: "1 hour ago", read: false },
    { id: 3, text: "Storage usage alert", time: "2 hours ago", read: true },
  ]);
  const [unreadCount, setUnreadCount] = useState(2);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const userMenuRef = useRef(null);
  const notificationsRef = useRef(null);
  const searchRef = useRef(null);

  // Mock user data - replace with your actual auth context
  const user = {
    name: "Dnyanesh H.",
    email: "dnyanesh@example.com",
    role: "Premium User",
    initials: "DH",
    avatarColor: "from-blue-600 to-cyan-500"
  };

  const navItems = [
    { path: "/chat", label: "Chat", icon: MessageSquare, active: location.pathname === "/chat" },
    { path: "/history", label: "History", icon: BarChart3, active: location.pathname === "/history" },
    { path: "/analytics", label: "Analytics", icon: Users, active: location.pathname === "/analytics" },
    { path: "/documents", label: "Documents", icon: FileText, active: location.pathname === "/documents" },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when expanded
  useEffect(() => {
    if (isSearchExpanded && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleNotificationClick = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
    setUnreadCount(prev => prev > 0 ? prev - 1 : 0);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    setUnreadCount(0);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchExpanded(false);
      setSearchQuery("");
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-950 border-b border-gray-800 backdrop-blur-lg bg-opacity-95 shadow-2xl">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Bot size={22} className="text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                  <Sparkles size={8} className="text-white" />
                </div>
              </div>
              <div className="hidden lg:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                  AI Machine Help
                </h1>
                <p className="text-xs text-gray-400">Intelligent Solutions Platform</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 ml-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    item.active
                      ? "bg-gradient-to-r from-blue-900/40 to-cyan-900/20 text-white border-l-4 border-blue-500"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <item.icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            
            {/* Search Bar */}
            <div className="relative">
              {isSearchExpanded ? (
                <form onSubmit={handleSearch} className="relative">
                  <div className="flex items-center bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden">
                    <Search className="absolute left-4 text-gray-400" size={18} />
                    <input
                      ref={searchRef}
                      type="text"
                      placeholder="Search conversations, documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onBlur={() => !searchQuery && setIsSearchExpanded(false)}
                      className="w-64 lg:w-80 pl-12 pr-4 py-2.5 bg-transparent text-white placeholder-gray-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:opacity-90 transition-opacity"
                    >
                      Search
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchExpanded(true)}
                  className="p-2.5 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2.5 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                aria-label="Notifications"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-xs rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-4 border-b border-gray-800">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">Notifications</h3>
                      <button
                        onClick={markAllAsRead}
                        className="text-sm text-blue-400 hover:text-blue-300"
                      >
                        Mark all as read
                      </button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification.id)}
                        className={`p-4 border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer transition-colors ${
                          !notification.read ? "bg-gray-800/30" : ""
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
                            <Zap size={14} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-white">{notification.text}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-800">
                    <Link
                      to="/notifications"
                      onClick={() => setIsNotificationsOpen(false)}
                      className="text-center block text-sm text-blue-400 hover:text-blue-300"
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Help */}
            <Link
              to="/help"
              className="p-2.5 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors text-gray-400 hover:text-white hidden lg:flex"
              aria-label="Help"
            >
              <HelpCircle size={20} />
            </Link>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-2xl bg-gray-800/50 hover:bg-gray-800 transition-colors"
              >
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${user.avatarColor} flex items-center justify-center shadow-lg`}>
                    <span className="font-bold text-white">{getInitials(user.name)}</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="font-semibold text-white text-sm">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.role}</p>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-200 ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  {/* User Info */}
                  <div className="p-4 border-b border-gray-800">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${user.avatarColor} flex items-center justify-center`}>
                        <span className="font-bold text-white text-lg">{getInitials(user.name)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-white">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center space-x-2">
                      <Shield size={14} className="text-blue-400" />
                      <span className="text-xs text-blue-400 font-medium">{user.role}</span>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      to="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-800/50 transition-colors"
                    >
                      <User size={18} className="text-gray-400" />
                      <span className="text-gray-300">Profile & Settings</span>
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-800/50 transition-colors"
                    >
                      <Settings size={18} className="text-gray-400" />
                      <span className="text-gray-300">Account Settings</span>
                    </Link>
                    <Link
                      to="/subscription"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-800/50 transition-colors"
                    >
                      <Shield size={18} className="text-gray-400" />
                      <span className="text-gray-300">Subscription Plan</span>
                    </Link>
                  </div>

                  <div className="border-t border-gray-800 py-2">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        // Add your logout logic here
                        navigate("/login");
                      }}
                      className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-900/20 transition-colors w-full"
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="lg:hidden border-t border-gray-800 py-2 mt-2">
          <div className="flex items-center justify-around">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                  item.active
                    ? "text-blue-400 bg-gray-800/50"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <item.icon size={20} />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            ))}
            <Link
              to="/help"
              className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                location.pathname === "/help"
                  ? "text-blue-400 bg-gray-800/50"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <HelpCircle size={20} />
              <span className="text-xs mt-1">Help</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;