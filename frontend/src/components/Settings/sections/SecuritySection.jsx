import { useState } from 'react';
import {
    FiShield,
    FiBell,
    FiGlobe,
    FiLock,
    FiKey,
    FiChevronRight,
    FiTrash2
} from 'react-icons/fi';
import ChangePasswordModal from '../../ChangePasswordModal';

const SecuritySection = ({ isDarkMode, security, setSecurity, ToggleSwitch, SettingRow, onLogout, sessionTimeout, setSessionTimeout }) => {
    const [showChangePassword, setShowChangePassword] = useState(false);

    return (
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
                            value={sessionTimeout}
                            onChange={(e) => setSessionTimeout(e.target.value)}
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
                    <button
                        onClick={() => setShowChangePassword(true)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${isDarkMode
                            ? 'hover:bg-gray-800/50 text-gray-300'
                            : 'hover:bg-gray-50 text-gray-700'
                            }`}
                    >
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

            {/* Change Password Modal */}
            <ChangePasswordModal
                isOpen={showChangePassword}
                onClose={() => setShowChangePassword(false)}
                isDarkMode={isDarkMode}
                onPasswordChanged={onLogout}
            />
        </div>
    );
};

export default SecuritySection;
