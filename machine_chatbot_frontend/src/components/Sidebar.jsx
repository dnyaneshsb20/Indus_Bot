import {
  MessageSquare,
  Clock,
  BarChart3,
  Users,
  FileText,
  Settings,
  HelpCircle,
} from "lucide-react";

const Sidebar = () => {
  const items = [
    { label: "Chat", icon: MessageSquare },
    { label: "History", icon: Clock },
    { label: "Analytics", icon: BarChart3 },
    { label: "Team", icon: Users },
    { label: "Documents", icon: FileText },
    { label: "Settings", icon: Settings },
    { label: "Help", icon: HelpCircle },
  ];

  return (
    <aside className="w-72 bg-gray-900 border-r border-gray-800 p-4">
      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800"
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
