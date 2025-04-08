import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import { Home, BarChart, LogOut, Send, Settings, ListIcon } from "lucide-react";
import { useSidebar } from "../../hooks/useSidebarGet";
import { BASE_URL } from "../../constants";

const navItems = [
  { icon: Home, label: "Дашборд", route: "dashboard" },
  { icon: BarChart, label: "Аналітика", route: "analitics" },
  { icon: Send, label: "Пост", route: "postsocial" },
  { icon: ListIcon, label: "TaskManager", route: "ToDoList" },
];

const accountItems = [
  { icon: Settings, label: "Налаштування", route: "settings" },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const { currentUser } = useSidebar("server/current");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-[400px] bg-white h-screen flex flex-col border-r border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Avatar
            src={`${BASE_URL}${currentUser?.avatarUrl ?? undefined}`}
            className="w-00 h-20 border border-gray-300"
          />

          <div>
            <h3 className="font-medium text-sm">{currentUser?.name}</h3>
            <p className="text-xs text-gray-500">{currentUser?.email}</p>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto py-4">
        <div className="px-4 mb-2">
          <h4 className="text-xs font-medium text-gray-500 mb-2">НАВІГАЦІЯ</h4>
        </div>
        <ul>
          {navItems.map((item) => (
            <li key={item.route}>
              <NavLink
                to={item.route}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 text-sm ${
                    isActive
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                <item.icon className="w-[18px] h-[18px]" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="px-4 mt-6 mb-2">
          <h4 className="text-xs font-medium text-gray-500 mb-2">АКАУНТ</h4>
        </div>
        <ul>
          {accountItems.map((item) => (
            <li key={item.route}>
              <NavLink
                to={item.route}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 text-sm ${
                    isActive
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                <item.icon className="w-[18px] h-[18px]" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 mt-auto">
        <Button
          variant="contained"
          startIcon={<LogOut className="w-4 h-4" />}
          className="w-full justify-start text-red-600 bg-red-50 hover:bg-red-100"
          onClick={handleLogOut}
        >
          Вийти
        </Button>
      </div>
    </div>
  );
};
