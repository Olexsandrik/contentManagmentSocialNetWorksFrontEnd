import { ReactNode, useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { usePatchPriority } from "./usePatchPriority";
import { usePostTask } from "./usePostTask";

export type Tasks = {
  id: string;
  date: Date;
  name: string;
  priority: string;
  createdAt: Date;
  desc: string;
};

export const useTasksAllGet = (mainUrl: string) => {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${BASE_URL}/${mainUrl}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        new Error("Error with fetch data");
      }

      const data: Tasks[] = await res.json();
      setTasks(data);
    })();
  }, []);

  return { tasks, setTasks };
};
