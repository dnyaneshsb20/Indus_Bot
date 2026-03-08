import {
    FiX,
    FiMenu,
    FiHome,
    FiSettings,
    FiFileText,
    FiHelpCircle,
    FiUsers,
    FiBarChart2,
    FiFolder,
    FiClock,
    FiBell,
    FiDownload,
    FiUpload,
    FiShield,
    FiTool,
    FiChevronRight,
    FiMessageSquare,
    FiMoon,
    FiSun
} from 'react-icons/fi';
import {
    TbRobot,
    TbDatabase,
    TbReportAnalytics,
    TbLogout
} from 'react-icons/tb';
import ib from "../assets/ib2.png";

const Sidebar = ({ isOpen, toggleSidebar, isDarkMode, activePage, onNavigate, toggleTheme }) => {
    const menuItems = [
        { icon: <FiHome />, label: 'Dashboard', page: 'dashboard' },
        { icon: <FiMessageSquare />, label: 'Chat Sessions', page: 'chatSessions' },
        { icon: <FiFileText />, label: 'Documentation', page: 'documentation' },
        { icon: <FiSettings />, label: 'Machine Settings', page: 'machineSettings' },
        { icon: <TbDatabase />, label: 'Knowledge Base', page: 'knowledgeBase' },
        { icon: <FiBarChart2 />, label: 'Analytics' },
        { icon: <FiUsers />, label: 'Team Members' },
        { icon: <FiFolder />, label: 'Projects' },
        { icon: <TbReportAnalytics />, label: 'Reports' },
        { icon: <FiClock />, label: 'Activity Log' },
        { icon: <FiTool />, label: 'Maintenance' },
        { icon: <FiShield />, label: 'Security' },
        { icon: <FiHelpCircle />, label: 'Support' },
        { icon: <FiSettings />, label: 'Settings', page: 'settings' },
    ];

    const recentChats = [
        { id: 1, title: 'Error E-102 Fix', time: '10:30 AM' },
        { id: 2, title: 'Machine Calibration', time: 'Yesterday' },
        { id: 3, title: 'Safety Protocols', time: '2 days ago' },
    ];

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar Container */}
            <div
                className={`fixed lg:relative h-full transition-all duration-300 ease-in-out z-50
                    ${isOpen ? "w-72 translate-x-0" : "w-0 -translate-x-full lg:translate-x-0 lg:w-20"}
                    ${isDarkMode ? "bg-gray-900" : "bg-white"}
                    border-r ${isDarkMode ? "border-gray-800" : "border-gray-200"}
                    flex flex-col
                `}
            >
                {/* Header */}
                <div className={`p-4 flex items-center justify-between border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"
                    }`}>
                    {/* Logo Section */}
                    <div className={`flex items-center gap-2 ${!isOpen && "justify-center w-full"
                        }`}>
                        <button
                            onClick={toggleSidebar}
                            className={`p-1 rounded-xl ${isDarkMode
                                ? "hover:bg-gray-800"
                                : "hover:bg-gray-300"
                                }`}
                            title="Toggle Sidebar"
                        >
                            <div className="w-10 h-10 ml-2 overflow-hidden">
                                <img
                                    src={ib}   // your image
                                    alt="Toggle Sidebar"
                                    className="w-full h-full object-contain scale-100"
                                />
                            </div>
                        </button>

                        {isOpen && (
                            <div className="overflow-hidden">
                                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                    IndusBot
                                </h1>
                                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    Industrial Machine Assistant
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Close Button - Only shown when sidebar is open */}
                    {isOpen && (
                        <button
                            onClick={toggleSidebar}
                            className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${isDarkMode
                                ? "hover:bg-gray-800 text-gray-400"
                                : "hover:bg-gray-100 text-gray-500"
                                }`}
                            title="Close sidebar"
                        >
                            <FiX className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Main Menu */}
                <div className="flex-1 overflow-y-auto py-4 px-3">
                    {/* Navigation Section */}
                    <div className="mb-8">
                        <h3 className={`text-xs font-semibold uppercase tracking-wider mb-4 px-3 ${isOpen ? "block" : "hidden lg:block lg:text-center"
                            } ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                            {isOpen ? "Navigation" : "Nav"}
                        </h3>
                        <ul className="space-y-1">
                            {menuItems.slice(0, 5).map((item, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => item.page && onNavigate && onNavigate(item.page)}
                                        className={`flex items-center w-full px-3 py-3 rounded-xl transition-all duration-200 group ${isOpen ? "justify-start gap-3" : "justify-center"
                                            } ${activePage === item.page
                                                ? isDarkMode
                                                    ? "bg-blue-900/30 text-blue-400 border border-blue-800/30"
                                                    : "bg-blue-50 text-blue-600 border border-blue-200"
                                                : isDarkMode
                                                    ? "hover:bg-gray-800 text-gray-400 hover:text-gray-300"
                                                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                                            }`}
                                    >
                                        <span className={`transition-transform group-hover:scale-110 ${activePage === item.page ? "text-blue-500" : ""
                                            }`}>
                                            {item.icon}
                                        </span>
                                        {isOpen && (
                                            <span className="font-medium text-sm flex-1 text-left">
                                                {item.label}
                                            </span>
                                        )}
                                        {activePage === item.page && isOpen && (
                                            <span className={`w-2 h-2 rounded-full ${isDarkMode ? "bg-blue-500" : "bg-blue-600"
                                                }`}></span>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Recent Chats Section */}
                    {isOpen && (
                        <div className="mb-8">
                            <h3 className={`text-xs font-semibold uppercase tracking-wider mb-4 px-3 ${isDarkMode ? "text-gray-500" : "text-gray-400"
                                }`}>
                                Recent Chats
                            </h3>
                            <div className="space-y-2 px-3">
                                {recentChats.map((chat) => (
                                    <button
                                        key={chat.id}
                                        className={`flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200 group ${isDarkMode
                                            ? "hover:bg-gray-800 text-gray-400 hover:text-gray-300"
                                            : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-1.5 rounded-lg ${isDarkMode
                                                ? "bg-gray-800"
                                                : "bg-gray-100"
                                                }`}>
                                                <FiFileText className="w-4 h-4" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-medium">{chat.title}</p>
                                                <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"
                                                    }`}>{chat.time}</p>
                                            </div>
                                        </div>
                                        <FiChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${isDarkMode ? "text-gray-500" : "text-gray-400"
                                            }`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tools Section */}
                    <div>
                        <h3 className={`text-xs font-semibold uppercase tracking-wider mb-4 px-3 ${isOpen ? "block" : "hidden lg:block lg:text-center"
                            } ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                            {isOpen ? "Tools" : "Tools"}
                        </h3>
                        <div className={`grid ${isOpen ? "grid-cols-2" : "grid-cols-1"} gap-2 px-3`}>
                            <button className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${isDarkMode
                                ? "hover:bg-gray-800 text-gray-400"
                                : "hover:bg-gray-100 text-gray-600"
                                }`}>
                                <FiDownload className="w-5 h-5 mb-2" />
                                {isOpen && (
                                    <span className="text-xs font-medium">Export</span>
                                )}
                            </button>
                            <button className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${isDarkMode
                                ? "hover:bg-gray-800 text-gray-400"
                                : "hover:bg-gray-100 text-gray-600"
                                }`}>
                                <FiUpload className="w-5 h-5 mb-2" />
                                {isOpen && (
                                    <span className="text-xs font-medium">Import</span>
                                )}
                            </button>
                            <button className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${isDarkMode
                                ? "hover:bg-gray-800 text-gray-400"
                                : "hover:bg-gray-100 text-gray-600"
                                }`}>
                                <FiBell className="w-5 h-5 mb-2" />
                                {isOpen && (
                                    <span className="text-xs font-medium">Alerts</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className={`p-6 border-t ${isDarkMode ? "border-gray-800" : "border-gray-200"
                    }`}>
                    {isOpen ? (
                        <div className="space-y-4">
                            {/* User Profile */}
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? "bg-gray-100" : "bg-gray-800"
                                    }`}>
                                    <span className={`font-semibold ${isDarkMode ? "text-gray-900" : "text-white"}`}>
                                        DB
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <p className={`font-medium text-sm ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
                                        Dnyanesh Badave
                                    </p>
                                    <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                                        Admin
                                    </p>
                                </div>
                            </div>

                            {/* Dark Mode Toggle */}
                            <div className={`flex items-center justify-between px-1 py-2 rounded-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                <div className="flex items-center gap-2">
                                    <FiMoon className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-gray-500'}`} />
                                    <span className="text-sm font-medium">Dark Mode</span>
                                </div>
                                <button
                                    onClick={toggleTheme}
                                    className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${isDarkMode
                                        ? 'bg-blue-600'
                                        : 'bg-gray-300'
                                        }`}
                                >
                                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${isDarkMode ? 'translate-x-5' : 'translate-x-0'
                                        }`}></div>
                                </button>
                            </div>

                            {/* Footer Actions */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => onNavigate && onNavigate('settings')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm transition-colors ${isDarkMode
                                        ? "hover:bg-gray-800 text-gray-400"
                                        : "hover:bg-gray-100 text-gray-600"
                                        }`}>
                                    <FiSettings className="w-4 h-4" />
                                    Settings
                                </button>
                                <button className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm transition-colors ${isDarkMode
                                    ? "hover:bg-gray-800 text-gray-400"
                                    : "hover:bg-gray-100 text-gray-600"
                                    }`}>
                                    <TbLogout className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center space-y-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? "bg-gray-100" : "bg-gray-800"
                                }`}>
                                <span className={`font-semibold ${isDarkMode ? "text-gray-900" : "text-white"}`}>
                                    DB
                                </span>
                            </div>
                            <button
                                onClick={toggleTheme}
                                className={`p-2.5 rounded-lg transition-colors ${isDarkMode
                                    ? "hover:bg-gray-800 text-blue-400"
                                    : "hover:bg-gray-100 text-gray-600"
                                    }`}
                                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                            >
                                {isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                            </button>
                            <button
                                onClick={() => onNavigate && onNavigate('settings')}
                                className={`p-2.5 rounded-lg ${isDarkMode
                                    ? "hover:bg-gray-800 text-gray-400"
                                    : "hover:bg-gray-100 text-gray-600"
                                    }`}>
                                <FiSettings className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Sidebar;