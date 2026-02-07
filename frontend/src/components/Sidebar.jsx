const Sidebar = ({ isOpen, toggleSidebar, isDarkMode }) => {
  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-0"
      } transition-all duration-300 overflow-hidden 
        ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}
    >
      <div className="p-4 font-bold flex justify-between items-center">
        Menu
        <button onClick={toggleSidebar}>✕</button>
      </div>

      <ul className="p-4 space-y-2">
        <li className="cursor-pointer hover:underline">Option 1</li>
        <li className="cursor-pointer hover:underline">Option 2</li>
        <li className="cursor-pointer hover:underline">Option 3</li>
      </ul>
    </div>
  );
};

export default Sidebar;