import { useState } from 'react';
import {
    FiSettings,
    FiUser,
    FiMoon,
    FiSun,
    FiBell,
    FiShield,
    FiInfo,
    FiArrowLeft,
    FiEdit3,
    FiSave,
    FiGlobe,
    FiVolume2,
    FiVolumeX,
    FiLock,
    FiMail,
    FiCheckCircle,
    FiMonitor,
    FiSmartphone,
    FiLogOut,
    FiTrash2,
    FiChevronRight,
    FiKey
} from 'react-icons/fi';
import { TbRobot } from 'react-icons/tb';
import ib from "../assets/ib2.png";

const Settings = ({ isDarkMode, onBack, toggleTheme }) => {
    const [activeSection, setActiveSection] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [showSavePopup, setShowSavePopup] = useState(false);

    // Profile state
    const [profile, setProfile] = useState({
        name: 'Dnyanesh Badave',
        email: 'dnyanesh@indusbot.ai',
        role: 'Admin',
        department: 'Engineering',
        phone: '+91 98765 43210'
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

    // Security settings
    const [security, setSecurity] = useState({
        twoFactorAuth: false,
        sessionTimeout: '30',
        loginAlerts: true,
        apiAccess: false
    });

    // Appearance settings
    const [appearance, setAppearance] = useState({
        fontSize: 'medium',
        language: 'English',
        compactMode: false,
        animations: true,
        chatBubbleStyle: 'modern'
    });

    const sections = [
        { id: 'profile', label: 'Profile', icon: <FiUser /> },
        { id: 'appearance', label: 'Appearance', icon: <FiMonitor /> },
        { id: 'notifications', label: 'Notifications', icon: <FiBell /> },
        { id: 'security', label: 'Security', icon: <FiShield /> },
        { id: 'about', label: 'About', icon: <FiInfo /> },
    ];

    const handleSave = () => {
        setIsEditing(false);
        setShowSavePopup(true);
        setTimeout(() => setShowSavePopup(false), 2500);
    };

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

    const renderProfile = () => (
        <div className="space-y-6 animate-fade-in">
            {/* Profile Card */}
            <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-base flex items-center gap-2">
                        <FiUser className="w-5 h-5 text-blue-500" />
                        Personal Information
                    </h3>
                    <button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isEditing
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/25'
                            : isDarkMode
                                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {isEditing ? <><FiSave className="w-4 h-4" /> Save</> : <><FiEdit3 className="w-4 h-4" /> Edit</>}
                    </button>
                </div>

                {/* Avatar Section */}
                <div className="flex items-center gap-5 mb-6">
                    <div className="relative">
                        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold ${isDarkMode
                            ? 'bg-gradient-to-br from-blue-900/50 to-cyan-900/50 text-blue-400'
                            : 'bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-600'
                            }`}>
                            DB
                        </div>
                        {isEditing && (
                            <button className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-blue-600 text-white shadow-lg">
                                <FiEdit3 className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                    <div>
                        <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{profile.name}</h4>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{profile.role} · {profile.department}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-xs text-green-500 font-medium">Active</span>
                        </div>
                    </div>
                </div>

                {/* Profile Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { label: 'Full Name', key: 'name', icon: <FiUser className="w-4 h-4" /> },
                        { label: 'Email Address', key: 'email', icon: <FiMail className="w-4 h-4" /> },
                        { label: 'Role', key: 'role', icon: <FiShield className="w-4 h-4" /> },
                        { label: 'Department', key: 'department', icon: <FiGlobe className="w-4 h-4" /> },
                        { label: 'Phone', key: 'phone', icon: <FiSmartphone className="w-4 h-4" /> },
                    ].map((field) => (
                        <div key={field.key}>
                            <label className={`text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 mb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'
                                }`}>
                                {field.icon} {field.label}
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={profile[field.key]}
                                    onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                                    className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200 ${isDarkMode
                                        ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20'
                                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20'
                                        }`}
                                />
                            ) : (
                                <p className={`text-sm font-medium px-3 py-2.5 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                    {profile[field.key]}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Active Sessions */}
            <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <h3 className="font-semibold text-base flex items-center gap-2 mb-4">
                    <FiMonitor className="w-5 h-5 text-blue-500" />
                    Active Sessions
                </h3>
                <div className="space-y-3">
                    {[
                        { device: 'Windows PC - Chrome', location: 'Pune, India', time: 'Current session', icon: <FiMonitor className="w-4 h-4" />, active: true },
                        { device: 'Android - Mobile App', location: 'Pune, India', time: '2 hours ago', icon: <FiSmartphone className="w-4 h-4" />, active: false },
                    ].map((session, i) => (
                        <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                    {session.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{session.device}</p>
                                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {session.location} · {session.time}
                                    </p>
                                </div>
                            </div>
                            {session.active ? (
                                <span className="text-xs font-medium text-green-500 px-2 py-1 rounded-full bg-green-500/10">Active</span>
                            ) : (
                                <button className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${isDarkMode
                                    ? 'text-red-400 hover:bg-red-900/20'
                                    : 'text-red-500 hover:bg-red-50'
                                    }`}>
                                    Revoke
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderAppearance = () => (
        <div className="space-y-6 animate-fade-in">
            <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <h3 className="font-semibold text-base flex items-center gap-2 mb-4">
                    <FiMonitor className="w-5 h-5 text-blue-500" />
                    Theme & Display
                </h3>
                <div className="space-y-1">
                    <SettingRow
                        icon={isDarkMode ? <FiMoon className="w-4 h-4" /> : <FiSun className="w-4 h-4" />}
                        label="Dark Mode"
                        description="Switch between light and dark themes"
                    >
                        <ToggleSwitch enabled={isDarkMode} onChange={toggleTheme} />
                    </SettingRow>

                    <SettingRow
                        icon={<FiMonitor className="w-4 h-4" />}
                        label="Compact Mode"
                        description="Reduce spacing for denser layout"
                    >
                        <ToggleSwitch
                            enabled={appearance.compactMode}
                            onChange={() => setAppearance({ ...appearance, compactMode: !appearance.compactMode })}
                        />
                    </SettingRow>

                    <SettingRow
                        icon={<TbRobot className="w-4 h-4" />}
                        label="Animations"
                        description="Enable smooth UI animations"
                    >
                        <ToggleSwitch
                            enabled={appearance.animations}
                            onChange={() => setAppearance({ ...appearance, animations: !appearance.animations })}
                        />
                    </SettingRow>
                </div>
            </div>

            <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <h3 className="font-semibold text-base flex items-center gap-2 mb-4">
                    <FiSettings className="w-5 h-5 text-blue-500" />
                    Preferences
                </h3>
                <div className="space-y-1">
                    <SettingRow
                        icon={<FiGlobe className="w-4 h-4" />}
                        label="Language"
                        description="Select your preferred language"
                    >
                        <select
                            value={appearance.language}
                            onChange={(e) => setAppearance({ ...appearance, language: e.target.value })}
                            className={`px-3 py-1.5 rounded-lg text-sm border outline-none transition-all ${isDarkMode
                                ? 'bg-gray-800 border-gray-700 text-gray-300'
                                : 'bg-gray-50 border-gray-200 text-gray-700'
                                }`}
                        >
                            <option>English</option>
                            <option>Hindi</option>
                            <option>Marathi</option>
                        </select>
                    </SettingRow>

                    <SettingRow
                        icon={<FiEdit3 className="w-4 h-4" />}
                        label="Font Size"
                        description="Adjust the text size across the app"
                    >
                        <div className="flex items-center gap-1">
                            {['small', 'medium', 'large'].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setAppearance({ ...appearance, fontSize: size })}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${appearance.fontSize === size
                                        ? 'bg-blue-600 text-white'
                                        : isDarkMode
                                            ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </SettingRow>

                    <SettingRow
                        icon={<TbRobot className="w-4 h-4" />}
                        label="Chat Bubble Style"
                        description="Choose the message appearance style"
                    >
                        <div className="flex items-center gap-1">
                            {['modern', 'classic', 'minimal'].map((style) => (
                                <button
                                    key={style}
                                    onClick={() => setAppearance({ ...appearance, chatBubbleStyle: style })}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${appearance.chatBubbleStyle === style
                                        ? 'bg-blue-600 text-white'
                                        : isDarkMode
                                            ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                        }`}
                                >
                                    {style}
                                </button>
                            ))}
                        </div>
                    </SettingRow>
                </div>
            </div>
        </div>
    );

    const renderNotifications = () => (
        <div className="space-y-6 animate-fade-in">
            <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <h3 className="font-semibold text-base flex items-center gap-2 mb-4">
                    <FiBell className="w-5 h-5 text-blue-500" />
                    Notification Preferences
                </h3>
                <div className="space-y-1">
                    <SettingRow
                        icon={<FiMail className="w-4 h-4" />}
                        label="Email Alerts"
                        description="Receive important alerts via email"
                    >
                        <ToggleSwitch
                            enabled={notifications.emailAlerts}
                            onChange={() => setNotifications({ ...notifications, emailAlerts: !notifications.emailAlerts })}
                        />
                    </SettingRow>

                    <SettingRow
                        icon={<FiBell className="w-4 h-4" />}
                        label="Push Notifications"
                        description="Browser push notifications"
                    >
                        <ToggleSwitch
                            enabled={notifications.pushNotifications}
                            onChange={() => setNotifications({ ...notifications, pushNotifications: !notifications.pushNotifications })}
                        />
                    </SettingRow>

                    <SettingRow
                        icon={notifications.soundEnabled ? <FiVolume2 className="w-4 h-4" /> : <FiVolumeX className="w-4 h-4" />}
                        label="Notification Sound"
                        description="Play sound on new notifications"
                    >
                        <ToggleSwitch
                            enabled={notifications.soundEnabled}
                            onChange={() => setNotifications({ ...notifications, soundEnabled: !notifications.soundEnabled })}
                        />
                    </SettingRow>
                </div>
            </div>

            <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <h3 className="font-semibold text-base flex items-center gap-2 mb-4">
                    <FiSettings className="w-5 h-5 text-blue-500" />
                    Alert Types
                </h3>
                <div className="space-y-1">
                    <SettingRow
                        icon={<TbRobot className="w-4 h-4" />}
                        label="Machine Alerts"
                        description="Get notified about machine status changes"
                    >
                        <ToggleSwitch
                            enabled={notifications.machineAlerts}
                            onChange={() => setNotifications({ ...notifications, machineAlerts: !notifications.machineAlerts })}
                        />
                    </SettingRow>

                    <SettingRow
                        icon={<FiSettings className="w-4 h-4" />}
                        label="Maintenance Reminders"
                        description="Scheduled maintenance notifications"
                    >
                        <ToggleSwitch
                            enabled={notifications.maintenanceReminders}
                            onChange={() => setNotifications({ ...notifications, maintenanceReminders: !notifications.maintenanceReminders })}
                        />
                    </SettingRow>

                    <SettingRow
                        icon={<FiInfo className="w-4 h-4" />}
                        label="System Updates"
                        description="Notifications about system updates"
                    >
                        <ToggleSwitch
                            enabled={notifications.systemUpdates}
                            onChange={() => setNotifications({ ...notifications, systemUpdates: !notifications.systemUpdates })}
                        />
                    </SettingRow>

                    <SettingRow
                        icon={<FiMail className="w-4 h-4" />}
                        label="Weekly Reports"
                        description="Receive weekly summary reports"
                    >
                        <ToggleSwitch
                            enabled={notifications.weeklyReports}
                            onChange={() => setNotifications({ ...notifications, weeklyReports: !notifications.weeklyReports })}
                        />
                    </SettingRow>
                </div>
            </div>
        </div>
    );

    const renderSecurity = () => (
        <div className="space-y-6 animate-fade-in">
            <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <h3 className="font-semibold text-base flex items-center gap-2 mb-4">
                    <FiShield className="w-5 h-5 text-blue-500" />
                    Authentication
                </h3>
                <div className="space-y-1">
                    <SettingRow
                        icon={<FiKey className="w-4 h-4" />}
                        label="Two-Factor Authentication"
                        description="Add extra security layer to your account"
                    >
                        <ToggleSwitch
                            enabled={security.twoFactorAuth}
                            onChange={() => setSecurity({ ...security, twoFactorAuth: !security.twoFactorAuth })}
                        />
                    </SettingRow>

                    <SettingRow
                        icon={<FiBell className="w-4 h-4" />}
                        label="Login Alerts"
                        description="Get notified of new login attempts"
                    >
                        <ToggleSwitch
                            enabled={security.loginAlerts}
                            onChange={() => setSecurity({ ...security, loginAlerts: !security.loginAlerts })}
                        />
                    </SettingRow>

                    <SettingRow
                        icon={<FiGlobe className="w-4 h-4" />}
                        label="API Access"
                        description="Enable API access with tokens"
                    >
                        <ToggleSwitch
                            enabled={security.apiAccess}
                            onChange={() => setSecurity({ ...security, apiAccess: !security.apiAccess })}
                        />
                    </SettingRow>

                    <SettingRow
                        icon={<FiLock className="w-4 h-4" />}
                        label="Session Timeout"
                        description="Auto-lock after inactivity"
                    >
                        <select
                            value={security.sessionTimeout}
                            onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                            className={`px-3 py-1.5 rounded-lg text-sm border outline-none transition-all ${isDarkMode
                                ? 'bg-gray-800 border-gray-700 text-gray-300'
                                : 'bg-gray-50 border-gray-200 text-gray-700'
                                }`}
                        >
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="never">Never</option>
                        </select>
                    </SettingRow>
                </div>
            </div>

            <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <h3 className="font-semibold text-base flex items-center gap-2 mb-4">
                    <FiLock className="w-5 h-5 text-blue-500" />
                    Password & Account
                </h3>
                <div className="space-y-3">
                    <button className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${isDarkMode
                        ? 'hover:bg-gray-800/50 text-gray-300'
                        : 'hover:bg-gray-50 text-gray-700'
                        }`}>
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                <FiKey className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-medium">Change Password</p>
                                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Update your account password</p>
                            </div>
                        </div>
                        <FiChevronRight className={`w-4 h-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    </button>

                    <button className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${isDarkMode
                        ? 'hover:bg-red-900/10 text-red-400'
                        : 'hover:bg-red-50 text-red-500'
                        }`}>
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
                                <FiTrash2 className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-medium">Delete Account</p>
                                <p className={`text-xs ${isDarkMode ? 'text-red-400/60' : 'text-red-400'}`}>Permanently delete your account and data</p>
                            </div>
                        </div>
                        <FiChevronRight className={`w-4 h-4`} />
                    </button>
                </div>
            </div>
        </div>
    );

    const renderAbout = () => (
        <div className="space-y-6 animate-fade-in">
            <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <div className="flex flex-col items-center text-center py-4">
                    <div className="relative mb-4">
                        <img src={ib} alt="IndusBot AI" className="w-20 h-20" />
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                            w-28 h-28 border-2 border-dashed rounded-full animate-spin-slow
                            ${isDarkMode ? "border-blue-500/20" : "border-blue-400/10"}`} />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                        IndusBot AI
                    </h3>
                    <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Industrial Machine Intelligence Platform
                    </p>
                    <span className={`mt-3 px-3 py-1 rounded-full text-xs font-medium ${isDarkMode
                        ? 'bg-blue-900/30 text-blue-400 border border-blue-800/30'
                        : 'bg-blue-50 text-blue-600 border border-blue-200'
                        }`}>
                        Version 2.0.1
                    </span>
                </div>
            </div>

            <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <h3 className="font-semibold text-base flex items-center gap-2 mb-4">
                    <FiInfo className="w-5 h-5 text-blue-500" />
                    System Information
                </h3>
                <div className="space-y-3">
                    {[
                        { label: 'Version', value: '2.0.1' },
                        { label: 'Build', value: '2026.03.01' },
                        { label: 'Environment', value: 'Production' },
                        { label: 'API Endpoint', value: 'api.indusbot.ai' },
                        { label: 'License', value: 'Enterprise' },
                        { label: 'Last Updated', value: 'March 3, 2026' },
                    ].map((item, i) => (
                        <div key={i} className={`flex items-center justify-between py-2 ${i !== 5 ? `border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}` : ''
                            }`}>
                            <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{item.label}</span>
                            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <h3 className="font-semibold text-base flex items-center gap-2 mb-3">
                    <FiCheckCircle className="w-5 h-5 text-green-500" />
                    System Status
                </h3>
                <div className="space-y-2">
                    {[
                        { name: 'AI Engine', status: 'Operational' },
                        { name: 'Database', status: 'Operational' },
                        { name: 'API Gateway', status: 'Operational' },
                        { name: 'Machine Network', status: 'Operational' },
                    ].map((item, i) => (
                        <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
                            }`}>
                            <span className="text-sm font-medium">{item.name}</span>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="text-xs text-green-500 font-medium">{item.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeSection) {
            case 'profile': return renderProfile();
            case 'appearance': return renderAppearance();
            case 'notifications': return renderNotifications();
            case 'security': return renderSecurity();
            case 'about': return renderAbout();
            default: return renderProfile();
        }
    };

    return (
        <div className={`h-full flex flex-col ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Header */}
            <div className={`px-6 py-3 border-b ${isDarkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white'}`}>
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
                            <h1 className="text-2xl font-bold flex items-center gap-2">
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
            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-screen-xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Section Navigation */}
                        <div className="lg:w-64 flex-shrink-0">
                            <div className={`p-2 rounded-xl border sticky top-0 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                                }`}>
                                <nav className="space-y-1">
                                    {sections.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => setActiveSection(section.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${activeSection === section.id
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

            {/* Save Success Popup */}
            {showSavePopup && (
                <div className="fixed bottom-6 right-6 z-50 animate-message-in">
                    <div className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl border ${isDarkMode
                        ? 'bg-gray-900 border-green-800/30 text-green-400'
                        : 'bg-white border-green-200 text-green-600 shadow-green-500/10'
                        }`}>
                        <FiCheckCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Settings saved successfully!</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
