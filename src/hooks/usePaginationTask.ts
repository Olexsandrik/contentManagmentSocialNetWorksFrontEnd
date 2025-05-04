import { useEffect, useState } from "react";
import { SocialMediaComment, SocialMediaPost } from "../app/type";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { Meta } from "./useReviewsGetPagination";

export function usePaginationTask(
  mainUrl: string,
  page: number,
  limit: number = 10
) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/auth");
          return;
        }
        const response = await fetch(
          `${BASE_URL}/${mainUrl}?page=${page}&limit=${limit}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Помилка запиту: ${response.status}`);
        }
        const data = await response.json();

        setTasks(data.data);

        console.log("Cool pagination", data);

        setMeta(data.meta);
        console.log(data.meta);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [mainUrl, page, limit]);
  return { tasks, setTasks, meta, error, isLoading };
}
