import { useState } from 'react';
import {
    FiUser,
    FiMail,
    FiShield,
    FiGlobe,
    FiSmartphone,
    FiMonitor,
    FiEdit3,
    FiSave,
    FiX
} from 'react-icons/fi';

const ProfileSection = ({ isDarkMode, profile, setProfile, isEditing, setIsEditing, handleSave }) => {
    // Keep a backup of the profile when editing starts, so we can cancel
    const [profileBackup, setProfileBackup] = useState(null);

    const handleEditStart = () => {
        setProfileBackup({ ...profile });
        setIsEditing(true);
    };

    const handleCancel = () => {
        if (profileBackup) {
            setProfile(profileBackup);
        }
        setProfileBackup(null);
        setIsEditing(false);
    };

    // Generate avatar initials from name
    const getInitials = (name) => {
        if (!name || !name.trim()) return '??';
        const parts = name.trim().split(' ').filter(Boolean);
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return parts[0].substring(0, 2).toUpperCase();
    };

    const profileFields = [
        { label: 'Full Name', key: 'name', icon: <FiUser className="w-4 h-4" />, type: 'text', required: true },
        { label: 'Email Address', key: 'email', icon: <FiMail className="w-4 h-4" />, type: 'email', required: true },
        { label: 'Role', key: 'role', icon: <FiShield className="w-4 h-4" />, type: 'text', required: false },
        { label: 'Department', key: 'department', icon: <FiGlobe className="w-4 h-4" />, type: 'text', required: false },
        { label: 'Phone', key: 'phone', icon: <FiSmartphone className="w-4 h-4" />, type: 'tel', required: false },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Profile Card */}
            <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-base flex items-center gap-2">
                        <FiUser className="w-5 h-5 text-blue-500" />
                        Personal Information
                    </h3>
                    <div className="flex items-center gap-2">
                        {isEditing && (
                            <button
                                onClick={handleCancel}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isDarkMode
                                    ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300'
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-600'
                                    }`}
                            >
                                <FiX className="w-4 h-4" /> Cancel
                            </button>
                        )}
                        <button
                            onClick={() => isEditing ? handleSave() : handleEditStart()}
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
                </div>

                {/* Avatar Section */}
                <div className="flex items-center gap-5 mb-6">
                    <div className="relative">
                        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all duration-300 ${isDarkMode
                            ? 'bg-gradient-to-br from-blue-900/50 to-cyan-900/50 text-blue-400'
                            : 'bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-600'
                            }`}>
                            {getInitials(profile.name)}
                        </div>
                        {isEditing && (
                            <button className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-blue-600 text-white shadow-lg">
                                <FiEdit3 className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                    <div>
                        <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{profile.name || 'No Name Set'}</h4>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{profile.role || 'No Role'} · {profile.department || 'No Department'}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-xs text-green-500 font-medium">Active</span>
                        </div>
                    </div>
                </div>

                {/* Profile Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profileFields.map((field) => (
                        <div key={field.key}>
                            <label className={`text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 mb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'
                                }`}>
                                {field.icon} {field.label}
                                {field.required && isEditing && <span className="text-red-400 text-xs">*</span>}
                            </label>
                            {isEditing ? (
                                <input
                                    type={field.type}
                                    value={profile[field.key]}
                                    onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                                    placeholder={`Enter ${field.label.toLowerCase()}`}
                                    className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200 ${isDarkMode
                                        ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 placeholder-gray-600'
                                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 placeholder-gray-400'
                                        }`}
                                />
                            ) : (
                                <p className={`text-sm font-medium px-3 py-2.5 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                    {profile[field.key] || <span className={`italic ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>Not set</span>}
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
};

export default ProfileSection;
