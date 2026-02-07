const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`h-full bg-white transition-all duration-300
        ${isOpen ? "w-64 p-4" : "w-0 p-0 overflow-hidden"}
      `}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold">Menu</h2>
        <button onClick={toggleSidebar} className="text-sm">
          ✖
        </button>
      </div>

      {/* Dummy options (you’ll replace later) */}
      <ul className="space-y-3">
        <li className="cursor-pointer hover:text-blue-300">
          Dashboard
        </li>
        <li className="cursor-pointer hover:text-blue-300">
          History
        </li>
        <li className="cursor-pointer hover:text-blue-300">
          Settings
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
