import { CardContent, Typography } from "@mui/material";
import { CheckCircle, Pending, FormatListBulleted } from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Text } from "lucide-react";

interface Task {
  id: number;
  title: string;
  priority: "High" | "Medium" | "Normal" | "Low";
  team: string[];
  createdAt: string;
  type: "blue" | "orange" | "green";
}

export const Dashboard = () => {
  const cardsBaseInfo = [
    {
      title: "TOTAL TASK",
      count: 10,
      createdAt: "last month",
      icon: <Pending sx={{ fontSize: 40 }} />,
    },
    {
      title: "COMPLITED TASKS",
      count: 4,
      createdAt: "last month",
      icon: <CheckCircle sx={{ fontSize: 40 }} />,
    },
    {
      title: "TASK IN PROGRESS",
      count: 10,
      createdAt: "last month",
      icon: <FormatListBulleted sx={{ fontSize: 40 }} />,
    },
  ];

  const tasks = [
    { title: "Task 1", status: "done", createdAt: "last month" },
    { title: "Task 2", status: "in_progress", createdAt: "last month" },
    { title: "Task 3", status: "done", createdAt: "last month" },
    { title: "Task 4", status: "done", createdAt: "last month" },
    { title: "Task 5", status: "done", createdAt: "last month" },
    { title: "Task 6", status: "done", createdAt: "last month" },
    { title: "Task 7", status: "done", createdAt: "last month" },
    { title: "Task 8", status: "in_progress", createdAt: "last month" },
    { title: "Task 9", status: "in_progress", createdAt: "last month" },
    { title: "Task 10", status: "in_progress", createdAt: "last month" },
  ];

  const totalTask = tasks.length;
  const totalDone = tasks.filter((done) => done.status === "done").length;
  const totalInProgress = tasks.filter(
    (process) => process.status === "in_progress"
  ).length;
  const data = [
    { name: "Зроблені", value: totalDone },
    { name: "В процесі", value: totalInProgress },
    { name: "Всього", value: totalTask },
  ];

  const COLORS = ["#4caf50", "#ff9800", "#2196f3"];
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="flex justify-between">
        {cardsBaseInfo.map((item) => {
          return (
            <CardContent
              sx={{
                width: 350,
                height: "auto",
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                backgroundColor: "#ffffff",
              }}
            >
              <div className="ml-12 mr-28">
                <Typography
                  sx={{
                    fontSize: 16,
                    color: "#888888",
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 20,
                    color: "#111827",
                  }}
                >
                  {item.count}
                </Typography>
                <Typography sx={{ color: "#9CA3AF", fontSize: 10 }}>
                  {item.createdAt}
                </Typography>
              </div>

              <div style={{ color: "#3B82F6" }}>{item.icon}</div>
            </CardContent>
          );
        })}
      </div>

      <div className="mt-10 flex items-center justify-center">
        <BarChart width={1500} height={700} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#82ca9d">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </div>

      <div className="m-auto rounded-lg p-4 shadow-lg">
        <div className="max-w-screen-xl m-auto">
          <div className="flex justify-between border-b-2 mb-2 font-semibold text-gray-700">
            <Typography sx={{ fontSize: 16, width: 200 }}>Title</Typography>
            <Typography sx={{ fontSize: 16 }}>Priority</Typography>
            <Typography sx={{ fontSize: 16 }}>Created At</Typography>
          </div>

          <div className="space-y-2">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="flex justify-between text-sm text-gray-800 border-b-1"
              >
                <Typography>{task.title}</Typography>
                <Typography>{task.status}</Typography>
                <Typography>{task.createdAt}</Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
