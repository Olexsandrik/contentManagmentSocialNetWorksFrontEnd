import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { AddReview } from "../app/type";

type PriorityTask = {
  priority: "HIGH_PRIORITY" | "IN_PROGRESS" | "COMPLETED";
};
type Task = {
  name: string;
  priority: PriorityTask;
  desc?: string;
  date: Date;
  createdAt: Date;
};
export const usePostTask = (mainUrl: string | null) => {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submitReview = async (userData: AddReview) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/auth");
        return;
      }

      setIsLoading(true);
      setError(null);

      console.log(userData);

      const response = await fetch(`${BASE_URL}/${mainUrl}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Request failed: ${response.status}`
        );
      }

      const data = await response.json();
      setTask(data);
      return data;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { submitReview, task, isLoading, error, setTask };
};
