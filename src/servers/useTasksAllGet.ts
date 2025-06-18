import { ReactNode, useEffect, useState } from "react";
import { BASE_URL } from "../constants";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const res = await fetch(`${BASE_URL}/${mainUrl}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(
            `Failed to fetch tasks: ${res.status} ${res.statusText}`
          );
        }

        const data: Tasks[] = await res.json();
        console.log("Data tasks", data);
        setTasks(data);
        setLoading(false);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch tasks";
        setError(errorMessage);
        console.error("Error fetching tasks:", err);
      } finally {
      }
    })();
  }, [mainUrl]);

  return { tasks, setTasks, loading, error };
};
