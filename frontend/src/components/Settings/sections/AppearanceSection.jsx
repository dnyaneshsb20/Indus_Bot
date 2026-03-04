import {
    FiSettings,
    FiMoon,
    FiSun,
    FiMonitor,
    FiGlobe,
    FiEdit3
} from 'react-icons/fi';
import { TbRobot } from 'react-icons/tb';

const AppearanceSection = ({ isDarkMode, toggleTheme, appearance, setAppearance, ToggleSwitch, SettingRow }) => {
    return (
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
};

export default AppearanceSection;
