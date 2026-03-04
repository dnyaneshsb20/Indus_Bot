import {
    FiInfo,
    FiCheckCircle
} from 'react-icons/fi';
import ib from "../../../assets/ib2.png";

const AboutSection = ({ isDarkMode }) => {
    return (
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
};

export default AboutSection;
