import type React from "react";

import { useState } from "react";
import { BarChart, LineChart, PieChart } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import type {
  CardProps,
  EngagementData,
  PostData,
  TabContentProps,
} from "../../../src/app/type";
import { Loading } from "../Loading";
import { usePostGet } from "../../hooks/usePostGet";

const mainTab = ["overview", "posts", "likes", "engagement"];

const tooltipStyle = {
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  border: "none",
};

export const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");

  const { posts, isLoading, error } = usePostGet("server/instagram-data");

  const postCountByMonth: Record<string, { posts: number; likes: number }> = {};

  posts.forEach((item) => {
    const date = new Date(item.timestamp);
    const month = date.toLocaleString("default", { month: "short" });

    if (!postCountByMonth[month]) {
      postCountByMonth[month] = { posts: 0, likes: 0 };
    }

    postCountByMonth[month].posts += 1;
    postCountByMonth[month].likes += item.likeCount;
  });

  const postData: PostData[] = Object.entries(postCountByMonth).map(
    ([month, data]) => ({
      month,
      posts: data.posts,
      likes: data.likes,
    })
  );

  const totalPosts: number = postData.reduce(
    (sum, item) => sum + item.posts,
    0
  );

  const totalLikes: number = postData.reduce(
    (sum, item) => sum + item.likes,
    0
  );
  const avgLikesPerPost: number =
    totalPosts > 0 ? Math.round(totalLikes / totalPosts) : 0;

  const engagementData: EngagementData[] = postData.map((item) => ({
    month: item.month,
    engagement: item.posts > 0 ? Math.round(item.likes / item.posts) : 0,
  }));

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f5f5]">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-6 shadow-sm">
          <h1 className="text-xl font-medium text-[#212121]">Пост Аналітика</h1>
        </header>
        <main className="flex flex-1 flex-col gap-6 p-6 md:gap-8 md:p-8">
          <div className="grid gap-6 md:grid-cols-3">
            <StatCard
              title="Загальна кількість постів"
              value={totalPosts}
              change={
                postData.length > 0 ? postData[postData.length - 1].posts : 0
              }
              icon={<BarChart className="h-4 w-4 text-[#6200ee]" />}
              iconBgColor="bg-[#6200ee]/10"
              iconColor="text-[#6200ee]"
              headerBgColor="bg-[#6200ee]/5"
              titleColor="text-[#6200ee]"
            />
            <StatCard
              title="Загальна кількість лайків"
              value={totalLikes}
              change={
                postData.length > 0 ? postData[postData.length - 1].likes : 0
              }
              icon={<LineChart className="h-4 w-4 text-[#018786]" />}
              iconBgColor="bg-[#03dac6]/10"
              iconColor="text-[#018786]"
              headerBgColor="bg-[#03dac6]/5"
              titleColor="text-[#018786]"
            />
            <StatCard
              title="Середня кількість лайків на пост"
              value={avgLikesPerPost}
              change={
                postData.length > 0 && postData[postData.length - 1].posts > 0
                  ? Math.round(
                      postData[postData.length - 1].likes /
                        postData[postData.length - 1].posts
                    )
                  : 0
              }
              icon={<PieChart className="h-4 w-4 text-[#7b1fa2]" />}
              iconBgColor="bg-[#bb86fc]/10"
              iconColor="text-[#7b1fa2]"
              headerBgColor="bg-[#bb86fc]/5"
              titleColor="text-[#7b1fa2]"
            />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-full h-12 p-1 shadow-sm flex">
              {mainTab.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 rounded-full px-6 py-2 text-sm font-medium transition-colors
                    ${activeTab === tab ? "bg-[#6200ee] text-white" : "text-[#212121] hover:bg-[#6200ee]/5"}`}
                >
                  {tab === "overview" && "Огляд"}
                  {tab === "posts" && "Пости"}
                  {tab === "likes" && "Лайки"}
                  {tab === "engagement" && "Залученість"}
                </button>
              ))}
            </div>
            {activeTab === "overview" && (
              <TabContent
                title="Загальна статистика"
                description="Огляд активності постів та лайків за останні 12 місяців"
              >
                <ResponsiveContainer width="100%" height={350}>
                  <RechartsLineChart
                    data={postData}
                    margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" stroke="#757575" />
                    <YAxis yAxisId="left" stroke="#6200ee" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#03dac6"
                    />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="posts"
                      stroke="#6200ee"
                      strokeWidth={2}
                      name="Пости"
                      activeDot={{ r: 8, fill: "#6200ee" }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="likes"
                      stroke="#03dac6"
                      strokeWidth={2}
                      name="Лайки"
                      activeDot={{ r: 6, fill: "#03dac6" }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </TabContent>
            )}
            {activeTab === "posts" && (
              <TabContent
                title="Кількість постів по місяцях"
                description="Детальний аналіз кількості опублікованих постів"
              >
                <ResponsiveContainer width="100%" height={350}>
                  <RechartsBarChart
                    data={postData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" stroke="#757575" />
                    <YAxis stroke="#757575" />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Bar
                      dataKey="posts"
                      fill="#6200ee"
                      radius={[4, 4, 0, 0]}
                      name="Пости"
                    />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </TabContent>
            )}
            {activeTab === "likes" && (
              <TabContent
                title="Кількість лайків по місяцях"
                description="Детальний аналіз кількості отриманих лайків"
              >
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart
                    data={postData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" stroke="#757575" />
                    <YAxis stroke="#757575" />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="likes"
                      stroke="#03dac6"
                      fill="#03dac6"
                      fillOpacity={0.2}
                      name="Лайки"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </TabContent>
            )}
            {activeTab === "engagement" && (
              <TabContent
                title="Залученість (лайки на пост)"
                description="Середня кількість лайків на пост по місяцях"
              >
                <ResponsiveContainer width="100%" height={350}>
                  <RechartsBarChart
                    data={engagementData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" stroke="#757575" />
                    <YAxis stroke="#757575" />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Bar
                      dataKey="engagement"
                      fill="#bb86fc"
                      radius={[4, 4, 0, 0]}
                      name="Лайки на пост"
                    />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </TabContent>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

const StatCard: React.FC<CardProps> = ({
  title,
  value,
  change,
  icon,
  iconBgColor,
  headerBgColor,
  titleColor,
}) => {
  return (
    <div className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      <div
        className={`flex flex-row items-center justify-between space-y-0 p-4 ${headerBgColor}`}
      >
        <h3 className={`text-sm font-medium ${titleColor}`}>{title}</h3>
        <div className={`rounded-full ${iconBgColor} p-2`}>{icon}</div>
      </div>
      <div className="p-6 pt-6">
        <div className="text-3xl font-bold text-[#212121]">{value}</div>
        <p className="text-xs text-[#757575] mt-1">
          +{change} за останній місяць
        </p>
      </div>
    </div>
  );
};

const TabContent: React.FC<TabContentProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="rounded-xl shadow-md overflow-hidden bg-white">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium text-[#212121]">{title}</h2>
        <p className="text-sm text-[#757575]">{description}</p>
      </div>
      <div className="p-6 bg-white">{children}</div>
    </div>
  );
};
