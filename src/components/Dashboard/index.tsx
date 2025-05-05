import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  CheckCircle,
  Clock,
  ListTodo,
  AlertTriangle,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { Card } from "@mui/material";
import { Badge } from "lucide-react";
import { useTasksAllGet } from "../../hooks/useTasksAllGet";
import { formatRelativeDate } from "../../utils/formatRelativeDate";

export default function Dashboard() {
  const { tasks, setTasks } = useTasksAllGet("server/todoall");

  const totalTask = tasks.length;
  const totalDone = tasks.filter(
    (item) => item.priority === "COMPLETED"
  ).length;
  const totalInProgress = tasks.filter(
    (item) => item.priority === "IN_PROGRESS"
  ).length;
  const totalHighPriority = tasks.filter(
    (task) => task.priority === "HIGH_PRIORITY"
  ).length;

  const cardsBaseInfo = [
    {
      title: "TOTAL TASKS",
      count: totalTask,
      createdAt: "last month",
      icon: <ListTodo className="h-10 w-10" />,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "COMPLETED TASKS",
      count: totalDone,
      createdAt: "last month",
      icon: <CheckCircle className="h-10 w-10" />,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      title: "TASKS IN PROGRESS",
      count: totalInProgress,
      createdAt: "last month",
      icon: <Clock className="h-10 w-10" />,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      title: "HIGH PRIORITY TASKS",
      count: totalHighPriority,
      createdAt: "last month",
      icon: <AlertTriangle className="h-10 w-10" />,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
  ];

  const chartData = [
    { name: "Completed", value: totalDone },
    { name: "In Progress", value: totalInProgress },
    { name: "High priority", value: totalHighPriority },
  ];

  const COLORS = [
    "rgba(16, 185, 129, 0.9)",
    "rgba(249, 115, 22, 0.9)",
    "rgba(239, 68, 68, 0.9)",
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH_PRIORITY":
        return "bg-red-100 text-red-800";
      case "IN_PROGRESS":
        return "bg-orange-100 text-orange-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Task Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cardsBaseInfo.map((item, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="p-6 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0 text-center md:text-left">
                <p className="text-sm text-gray-500">{item.title}</p>
                <p className="text-2xl font-bold mt-1">{item.count}</p>
                <p className="text-xs text-gray-400 mt-1">{item.createdAt}</p>
              </div>
              <div className={`${item.bgColor} ${item.color} p-3 rounded-full`}>
                {item.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mb-8 p-4 bg-gradient-to-br from-white to-gray-50">
        <h2 className="text-xl font-semibold mb-4 px-2">Task Overview</h2>
        <div className="w-full h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="name" tick={{ fill: "#4b5563" }} />
              <YAxis tick={{ fill: "#4b5563" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  border: "none",
                }}
                itemStyle={{ padding: "4px 0" }}
                labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                formatter={(value) => (
                  <span style={{ color: "#4b5563", fontWeight: 500 }}>
                    {value}
                  </span>
                )}
              />
              <Bar dataKey="value" name="Tasks" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    style={{
                      filter: "drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.2))",
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="p-4 md:p-6">
          <h2 className="text-xl font-semibold mb-4">Task List</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                    Title
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 hidden md:table-cell">
                    Priority
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 hidden sm:table-cell">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.slice(0, 10).map((task, index) => (
                  <tr key={task.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="mr-2">
                          {task.priority === "COMPLETED" && (
                            <CheckCircle className="h-5 w-5 text-emerald-500" />
                          )}
                          {task.priority === "IN_PROGRESS" && (
                            <CheckCircle className="h-5 w-5 text-orange-500" />
                          )}
                          {task.priority === "HIGH_PRIORITY" && (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                        <span className="font-medium">{task.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-sm hidden sm:table-cell">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatRelativeDate(task.createdAt)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
