import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";

import { Auth } from "./components/Auth/Auth";
import { Layout } from "./components/mainContent";
import { Home, NotFound, RootErrorBoundary } from "./page";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
          errorElement={<RootErrorBoundary />}
        />
        <Route
          path="/auth"
          element={<Auth />}
          errorElement={<RootErrorBoundary />}
        />
        <Route
          path="/maincontent"
          element={<Layout />}
          errorElement={<RootErrorBoundary />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
