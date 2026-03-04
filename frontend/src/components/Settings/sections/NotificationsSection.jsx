import {
    FiSettings,
    FiBell,
    FiMail,
    FiVolume2,
    FiVolumeX,
    FiInfo
} from 'react-icons/fi';
import { TbRobot } from 'react-icons/tb';

const NotificationsSection = ({ isDarkMode, notifications, setNotifications, ToggleSwitch, SettingRow }) => {
    return (
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
};

export default NotificationsSection;
