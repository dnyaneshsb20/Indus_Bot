import { useState } from 'react';
import {
    FiUser,
    FiBell,
    FiShield,
    FiInfo,
    FiArrowLeft,
    FiCheckCircle,
    FiMonitor
} from 'react-icons/fi';

// Import all section components from the sections subfolder
import ProfileSection from './sections/ProfileSection';
import AppearanceSection from './sections/AppearanceSection';
import NotificationsSection from './sections/NotificationsSection';
import SecuritySection from './sections/SecuritySection';
import AboutSection from './sections/AboutSection';

const Settings = ({ isDarkMode, onBack, toggleTheme, appearance, setAppearance, onLogout, sessionTimeout, setSessionTimeout }) => {
    const [activeSection, setActiveSection] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [showSavePopup, setShowSavePopup] = useState(false);
    const [saveMessage, setSaveMessage] = useState('Settings saved successfully!');

    // Profile state — loaded from localStorage, falls back to defaults
    const [profile, setProfile] = useState(() => {
        const saved = localStorage.getItem('userProfile');
        return saved
            ? JSON.parse(saved)
            : {
                name: 'Dnyanesh Badave',
                email: 'dnyanesh@indusbot.ai',
                role: 'Admin',
                department: 'Engineering',
                phone: '+91 98765 43210'
            };
    });

    // Notification preferences
    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        pushNotifications: true,
        machineAlerts: true,
        maintenanceReminders: true,
        systemUpdates: false,
        weeklyReports: true,
        soundEnabled: true
    });

    // Security settings (sessionTimeout is now managed by App.jsx)
    const [security, setSecurity] = useState({
        twoFactorAuth: false,
        loginAlerts: true,
        apiAccess: false
    });

    const sections = [
        { id: 'profile', label: 'Profile', icon: <FiUser /> },
        { id: 'appearance', label: 'Appearance', icon: <FiMonitor /> },
        { id: 'notifications', label: 'Notifications', icon: <FiBell /> },
        { id: 'security', label: 'Security', icon: <FiShield /> },
        { id: 'about', label: 'About', icon: <FiInfo /> },
    ];

    const handleSave = () => {
        // Validate required fields
        if (!profile.name.trim()) {
            setSaveMessage('Name cannot be empty!');
            setShowSavePopup(true);
            setTimeout(() => setShowSavePopup(false), 2500);
            return;
        }
        if (!profile.email.trim()) {
            setSaveMessage('Email cannot be empty!');
            setShowSavePopup(true);
            setTimeout(() => setShowSavePopup(false), 2500);
            return;
        }

        // Persist profile to localStorage
        localStorage.setItem('userProfile', JSON.stringify(profile));

        setIsEditing(false);
        setSaveMessage('Profile updated successfully!');
        setShowSavePopup(true);
        setTimeout(() => setShowSavePopup(false), 2500);
    };

    // Shared UI components passed as props to section components
    const ToggleSwitch = ({ enabled, onChange }) => (
        <button
            onClick={onChange}
            className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${enabled
                ? 'bg-blue-600'
                : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                }`}
        >
            <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${enabled ? 'translate-x-5' : 'translate-x-0'
                }`}></div>
        </button>
    );

    const SettingRow = ({ icon, label, description, children }) => (
        <div className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${isDarkMode
            ? 'hover:bg-gray-800/50'
            : 'hover:bg-gray-50'
            }`}>
            <div className="flex items-center gap-3 flex-1">
                <div className={`p-2 rounded-lg ${isDarkMode
                    ? 'bg-gray-800 text-gray-400'
                    : 'bg-gray-100 text-gray-500'
                    }`}>
                    {icon}
                </div>
                <div className="flex-1">
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{label}</p>
                    {description && (
                        <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{description}</p>
                    )}
                </div>
            </div>
            <div className="ml-4">
                {children}
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return (
                    <ProfileSection
                        isDarkMode={isDarkMode}
                        profile={profile}
                        setProfile={setProfile}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        handleSave={handleSave}
                    />
                );
            case 'appearance':
                return (
                    <AppearanceSection
                        isDarkMode={isDarkMode}
                        toggleTheme={toggleTheme}
                        appearance={appearance}
                        setAppearance={setAppearance}
                        ToggleSwitch={ToggleSwitch}
                        SettingRow={SettingRow}
                    />
                );
            case 'notifications':
                return (
                    <NotificationsSection
                        isDarkMode={isDarkMode}
                        notifications={notifications}
                        setNotifications={setNotifications}
                        ToggleSwitch={ToggleSwitch}
                        SettingRow={SettingRow}
                    />
                );
            case 'security':
                return (
                    <SecuritySection
                        isDarkMode={isDarkMode}
                        security={security}
                        setSecurity={setSecurity}
                        ToggleSwitch={ToggleSwitch}
                        SettingRow={SettingRow}
                        onLogout={onLogout}
                        sessionTimeout={sessionTimeout}
                        setSessionTimeout={setSessionTimeout}
                    />
                );
            case 'about':
                return <AboutSection isDarkMode={isDarkMode} />;
            default:
                return (
                    <ProfileSection
                        isDarkMode={isDarkMode}
                        profile={profile}
                        setProfile={setProfile}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        handleSave={handleSave}
                    />
                );
        }
    };

    return (
        <div className={`h-full flex flex-col ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Header */}
            <div className={`px-4 sm:px-6 py-3 border-b ${isDarkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onBack}
                            className={`p-2 rounded-lg transition-colors ${isDarkMode
                                ? 'hover:bg-gray-800 text-gray-400'
                                : 'hover:bg-gray-100 text-gray-600'
                                }`}
                            title="Back to Dashboard"
                        >
                            <FiArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                                Settings
                            </h1>
                            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Manage your preferences and account
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="max-w-screen-xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                        {/* Section Navigation */}
                        <div className="lg:w-64 flex-shrink-0">
                            <div className={`p-2 rounded-xl border lg:sticky lg:top-0 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                                }`}>
                                <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                                    {sections.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => setActiveSection(section.id)}
                                            className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeSection === section.id
                                                ? isDarkMode
                                                    ? 'bg-blue-900/30 text-blue-400 border border-blue-800/30'
                                                    : 'bg-blue-50 text-blue-600 border border-blue-200'
                                                : isDarkMode
                                                    ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-300'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                }`}
                                        >
                                            <span className={activeSection === section.id ? 'text-blue-500' : ''}>
                                                {section.icon}
                                            </span>
                                            {section.label}
                                            {activeSection === section.id && (
                                                <span className={`ml-auto w-2 h-2 rounded-full ${isDarkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></span>
                                            )}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        {/* Section Content */}
                        <div className="flex-1 min-w-0">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Save/Error Popup */}
            {showSavePopup && (
                <div className="fixed bottom-6 right-6 z-50 animate-message-in">
                    <div className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl border ${saveMessage.includes('cannot') || saveMessage.includes('empty')
                            ? isDarkMode
                                ? 'bg-gray-900 border-red-800/30 text-red-400'
                                : 'bg-white border-red-200 text-red-600 shadow-red-500/10'
                            : isDarkMode
                                ? 'bg-gray-900 border-green-800/30 text-green-400'
                                : 'bg-white border-green-200 text-green-600 shadow-green-500/10'
                        }`}>
                        <FiCheckCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">{saveMessage}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
