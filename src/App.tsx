import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./page/Home";
import { Auth } from "./components/Auth/Auth";
import { Layout } from "./components/Layout";
import { NotFound } from "./page";
import { Dashboard } from "./components/Dashboard";
import { AnalyticsDashboard } from "./components/Analytics";

import FacebookRedirectHandler from "./components/FacebookRedirectHandler";
import { TaskManager } from "./components/TaskManager";
import { Settings } from "./components/Settings";
import { Reviews } from "./components/Reviews";
import { Post } from "./components/Post";
import { AnalyticsAI } from "./components/AnalyticsAI";

const App = () => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login/success" element={<FacebookRedirectHandler />} />
          <Route path="/maincontent" element={<Layout />}>
            <Route index path="dashboard" element={<Dashboard />} />
            <Route path="analytics" element={<AnalyticsDashboard />} />
            <Route path="ToDoList" element={<TaskManager />} />
            <Route path="postsocial" element={<Post />} />
            <Route path="settings" element={<Settings />} />
            <Route path="analyticsai" element={<AnalyticsAI />} />
          </Route>
          <Route path="reviews" element={<Reviews />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
