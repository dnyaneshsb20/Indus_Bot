import { useState } from 'react';
import {
    FiSettings,
    FiCpu,
    FiThermometer,
    FiActivity,
    FiAlertTriangle,
    FiCheckCircle,
    FiEdit3,
    FiSave,
    FiArrowLeft,
    FiRefreshCw
} from 'react-icons/fi';
import { TbEngine } from 'react-icons/tb';

const MachineSettings = ({ isDarkMode, onBack }) => {
    const [selectedMachine, setSelectedMachine] = useState(0);
    const [editingParam, setEditingParam] = useState(null);

    const machines = [
        {
            id: 1,
            name: 'CNC Mill #1',
            status: 'online',
            type: 'CNC Milling Machine',
            lastMaintenance: 'Feb 25, 2026',
            nextMaintenance: 'Mar 25, 2026',
            uptime: '98.5%',
            parameters: [
                { key: 'spindle_speed', label: 'Spindle Speed', value: '12000', unit: 'RPM', min: 0, max: 24000 },
                { key: 'feed_rate', label: 'Feed Rate', value: '800', unit: 'mm/min', min: 0, max: 5000 },
                { key: 'coolant_temp', label: 'Coolant Temperature', value: '22', unit: '°C', min: 15, max: 35 },
                { key: 'vibration', label: 'Vibration Level', value: '0.05', unit: 'mm/s', min: 0, max: 1 },
                { key: 'power_consumption', label: 'Power Consumption', value: '15.2', unit: 'kW', min: 0, max: 50 },
            ]
        },
        {
            id: 2,
            name: 'Lathe #1',
            status: 'online',
            type: 'CNC Lathe',
            lastMaintenance: 'Feb 20, 2026',
            nextMaintenance: 'Mar 20, 2026',
            uptime: '96.2%',
            parameters: [
                { key: 'spindle_speed', label: 'Spindle Speed', value: '8000', unit: 'RPM', min: 0, max: 15000 },
                { key: 'feed_rate', label: 'Feed Rate', value: '500', unit: 'mm/min', min: 0, max: 3000 },
                { key: 'coolant_temp', label: 'Coolant Temperature', value: '24', unit: '°C', min: 15, max: 35 },
                { key: 'vibration', label: 'Vibration Level', value: '0.08', unit: 'mm/s', min: 0, max: 1 },
                { key: 'power_consumption', label: 'Power Consumption', value: '12.8', unit: 'kW', min: 0, max: 50 },
            ]
        },
        {
            id: 3,
            name: 'Hydraulic Press #1',
            status: 'maintenance',
            type: 'Hydraulic Press',
            lastMaintenance: 'Mar 1, 2026',
            nextMaintenance: 'Apr 1, 2026',
            uptime: '89.1%',
            parameters: [
                { key: 'pressure', label: 'Operating Pressure', value: '250', unit: 'bar', min: 0, max: 500 },
                { key: 'oil_temp', label: 'Oil Temperature', value: '45', unit: '°C', min: 20, max: 80 },
                { key: 'cycle_time', label: 'Cycle Time', value: '12.5', unit: 'sec', min: 5, max: 60 },
                { key: 'force', label: 'Press Force', value: '150', unit: 'tons', min: 0, max: 300 },
                { key: 'stroke_length', label: 'Stroke Length', value: '200', unit: 'mm', min: 50, max: 500 },
            ]
        },
        {
            id: 4,
            name: 'Assembly Line #2',
            status: 'offline',
            type: 'Automated Assembly',
            lastMaintenance: 'Feb 15, 2026',
            nextMaintenance: 'Mar 15, 2026',
            uptime: '92.7%',
            parameters: [
                { key: 'conveyor_speed', label: 'Conveyor Speed', value: '1.5', unit: 'm/s', min: 0, max: 5 },
                { key: 'torque', label: 'Torque Setting', value: '35', unit: 'Nm', min: 5, max: 100 },
                { key: 'temperature', label: 'Ambient Temperature', value: '26', unit: '°C', min: 15, max: 40 },
                { key: 'humidity', label: 'Humidity', value: '55', unit: '%', min: 20, max: 80 },
                { key: 'parts_per_hour', label: 'Parts per Hour', value: '120', unit: 'pcs/hr', min: 0, max: 500 },
            ]
        },
    ];

    const machine = machines[selectedMachine];

    const getStatusStyle = (status) => {
        switch (status) {
            case 'online':
                return {
                    dot: 'bg-green-500',
                    badge: isDarkMode
                        ? 'bg-green-900/40 text-green-400 border-green-800/40'
                        : 'bg-green-50 text-green-700 border-green-200'
                };
            case 'maintenance':
                return {
                    dot: 'bg-yellow-500',
                    badge: isDarkMode
                        ? 'bg-yellow-900/40 text-yellow-400 border-yellow-800/40'
                        : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                };
            case 'offline':
                return {
                    dot: 'bg-red-500',
                    badge: isDarkMode
                        ? 'bg-red-900/40 text-red-400 border-red-800/40'
                        : 'bg-red-50 text-red-700 border-red-200'
                };
            default:
                return {
                    dot: 'bg-gray-500',
                    badge: isDarkMode
                        ? 'bg-gray-800 text-gray-400 border-gray-700'
                        : 'bg-gray-100 text-gray-600 border-gray-200'
                };
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
                                {/* <FiSettings className="w-7 h-7 text-blue-500" /> */}
                                Machine Settings
                            </h1>
                            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Configure and monitor machine parameters
                            </p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:scale-105">
                        <FiRefreshCw className="w-4 h-4" />
                        Sync All
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-screen-2xl mx-auto">
                    {/* Machine Selector Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                        {machines.map((m, index) => {
                            const statusStyle = getStatusStyle(m.status);
                            return (
                                <button
                                    key={m.id}
                                    onClick={() => setSelectedMachine(index)}
                                    className={`p-4 rounded-xl border text-left transition-all duration-200 ${selectedMachine === index
                                        ? isDarkMode
                                            ? 'bg-blue-900/20 border-blue-700 ring-1 ring-blue-600'
                                            : 'bg-blue-50 border-blue-300 ring-1 ring-blue-400'
                                        : isDarkMode
                                            ? 'bg-gray-900 border-gray-800 hover:border-gray-700'
                                            : 'bg-white border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`w-2 h-2 rounded-full ${statusStyle.dot}`}></div>
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusStyle.badge}`}>
                                            {m.status}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-sm">{m.name}</h3>
                                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{m.type}</p>
                                </button>
                            );
                        })}
                    </div>

                    {/* Machine Detail */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Info Card */}
                        <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                            <h3 className="font-semibold text-base mb-4 flex items-center gap-2">
                                <FiCpu className="w-5 h-5 text-blue-500" />
                                Machine Info
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className={`text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Machine Name</p>
                                    <p className="font-medium mt-1">{machine.name}</p>
                                </div>
                                <div>
                                    <p className={`text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Type</p>
                                    <p className="font-medium mt-1">{machine.type}</p>
                                </div>
                                <div>
                                    <p className={`text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Status</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className={`w-2 h-2 rounded-full ${getStatusStyle(machine.status).dot}`}></div>
                                        <p className="font-medium capitalize">{machine.status}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className={`text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Uptime</p>
                                    <p className="font-medium mt-1 text-green-500">{machine.uptime}</p>
                                </div>
                                <div className={`pt-4 border-t space-y-3 ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                                    <div>
                                        <p className={`text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Last Maintenance</p>
                                        <p className="font-medium mt-1 text-sm">{machine.lastMaintenance}</p>
                                    </div>
                                    <div>
                                        <p className={`text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Next Maintenance</p>
                                        <p className="font-medium mt-1 text-sm text-amber-500">{machine.nextMaintenance}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Parameters Card */}
                        <div className={`lg:col-span-2 p-5 rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                            <h3 className="font-semibold text-base mb-4 flex items-center gap-2">
                                <FiActivity className="w-5 h-5 text-blue-500" />
                                Operating Parameters
                            </h3>
                            <div className="space-y-3">
                                {machine.parameters.map((param, index) => (
                                    <div
                                        key={param.key}
                                        className={`p-4 rounded-xl border transition-all duration-200 ${isDarkMode
                                            ? 'bg-gray-800/50 border-gray-800 hover:border-gray-700'
                                            : 'bg-gray-50 border-gray-100 hover:border-gray-200'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'
                                                    }`}>{param.label}</p>
                                                <div className="flex items-baseline gap-2">
                                                    {editingParam === `${machine.id}-${param.key}` ? (
                                                        <input
                                                            type="text"
                                                            defaultValue={param.value}
                                                            className={`w-24 px-2 py-1 rounded border text-lg font-bold outline-none ${isDarkMode
                                                                ? 'bg-gray-700 border-blue-600 text-white'
                                                                : 'bg-white border-blue-400 text-gray-900'
                                                                }`}
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        <span className="text-xl font-bold">{param.value}</span>
                                                    )}
                                                    <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{param.unit}</span>
                                                </div>
                                                <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                                                    Range: {param.min} - {param.max} {param.unit}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setEditingParam(
                                                    editingParam === `${machine.id}-${param.key}`
                                                        ? null
                                                        : `${machine.id}-${param.key}`
                                                )}
                                                className={`p-2 rounded-lg transition-all ${editingParam === `${machine.id}-${param.key}`
                                                    ? 'bg-blue-600 text-white'
                                                    : isDarkMode
                                                        ? 'hover:bg-gray-700 text-gray-500'
                                                        : 'hover:bg-gray-200 text-gray-400'
                                                    }`}
                                            >
                                                {editingParam === `${machine.id}-${param.key}`
                                                    ? <FiSave className="w-4 h-4" />
                                                    : <FiEdit3 className="w-4 h-4" />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Alerts */}
                    <div className={`mt-6 p-5 rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                        <h3 className="font-semibold text-base mb-4 flex items-center gap-2">
                            <FiAlertTriangle className="w-5 h-5 text-amber-500" />
                            Active Alerts
                        </h3>
                        <div className="space-y-2">
                            {machine.status === 'maintenance' ? (
                                <div className={`flex items-center gap-3 p-3 rounded-lg ${isDarkMode ? 'bg-yellow-900/20 text-yellow-400' : 'bg-yellow-50 text-yellow-700'
                                    }`}>
                                    <FiAlertTriangle className="w-5 h-5 flex-shrink-0" />
                                    <p className="text-sm">Machine is currently under maintenance. Operations are paused.</p>
                                </div>
                            ) : machine.status === 'offline' ? (
                                <div className={`flex items-center gap-3 p-3 rounded-lg ${isDarkMode ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-700'
                                    }`}>
                                    <FiAlertTriangle className="w-5 h-5 flex-shrink-0" />
                                    <p className="text-sm">Machine is offline. Check connectivity and power supply.</p>
                                </div>
                            ) : (
                                <div className={`flex items-center gap-3 p-3 rounded-lg ${isDarkMode ? 'bg-green-900/20 text-green-400' : 'bg-green-50 text-green-700'
                                    }`}>
                                    <FiCheckCircle className="w-5 h-5 flex-shrink-0" />
                                    <p className="text-sm">All parameters are within normal operating range. No active alerts.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MachineSettings;
