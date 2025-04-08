import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { User } from "../../app/type";
import { BASE_URL } from "../../constants";
import { Sidebar } from "../Sidebar";
import { ClimbingBoxLoader } from "react-spinners";

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
