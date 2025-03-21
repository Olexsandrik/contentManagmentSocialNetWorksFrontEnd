import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Auth } from "./components/Auth/Auth";
import { Layout } from "./components/Layout";
import { Home, NotFound } from "./page";
import { Dashboard } from "./components/Dashboard";
import { Analitics } from "./components/Analitics";
import { ChatIntegreation } from "./components/ChatIntegration";
import { Post } from "./components/Post";
import FacebookRedirectHandler from "./components/FacebookRedirectHandler";

const App = () => {
  return (
    <div className="bg-gray-200 h-[100vh]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />

          <Route path="/login/success" element={<FacebookRedirectHandler />} />

          <Route path="/maincontent" element={<Layout />}>
            <Route index path="dashboard" element={<Dashboard />} />

            <Route path="analitics" element={<Analitics />} />

            <Route path="chatai" element={<ChatIntegreation />} />

            <Route path="postsocial" element={<Post />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
