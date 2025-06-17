import { Outlet } from "react-router";
import { Sidebar } from "../Sidebar";

export const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};
