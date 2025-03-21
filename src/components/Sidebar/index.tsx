import type React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button } from "@nextui-org/react";
import {
  Home,
  FileText,
  BarChart,
  User,
  LogOut,
  MessageCircle,
  Send,
} from "lucide-react";
import { BASE_URL } from "../../constants";
import { useEffect, useState } from "react";
import { User as mainUser } from "../../app/type";

const navItems = [
  { icon: Home, label: "Dashboard", route: "dashboard" },
  { icon: FileText, label: "Documents", route: "documents" },
  { icon: BarChart, label: "Analytics", route: "analitics" },
  { icon: MessageCircle, label: "ChatGPT", route: "chatai" },
  { icon: Send, label: "Post", route: "postsocial" },
];

export const Sidebar = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<mainUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/auth");
          return;
        }

        const response = await fetch(`${BASE_URL}/server/current`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Помилка запиту: ${response.status}`);
        }
        const data = await response.json();

        setCurrentUser(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [navigate]);

  const handleLogOut = () => {
    localStorage.removeItem("token");

    navigate("/");
  };
  return (
    <div className="w-[350px]  bg-gray-100 h-[1000px] flex flex-col shadow-lg rounded-[40px] mt-10">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-6 ">
          <Avatar
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            size="lg"
          />
          <div>
            <h3 className="font-medium">{currentUser?.name}</h3>
            <p className="text-xs text-gray-600">{currentUser?.email}</p>
          </div>
        </div>
      </div>

      <nav className="flex-grow">
        <div className="px-4 py-2">
          <h4 className="text-xs font-semibold text-gray-600 uppercase">
            Navigation
          </h4>
        </div>
        <ul>
          {navItems.map((item) => (
            <li key={item.route}>
              <NavLink
                to={item.route}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-5 py-2 text-sm rounded-md ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="px-4 py-2 mt-6">
          <h4 className="text-xs font-semibold text-gray-600 uppercase">
            Account
          </h4>
        </div>
        <ul>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 text-sm rounded-md ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="p-4">
        <Button
          color="danger"
          variant="flat"
          startContent={<LogOut className="w-5 h-5" />}
          className="w-full justify-start rounded-3xl bg-red-500 text-white hover:bg-red-600 py-3"
          onClick={handleLogOut}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
