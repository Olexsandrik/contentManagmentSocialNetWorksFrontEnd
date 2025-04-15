import { useEffect, useState } from "react";
import { SocialMediaComment, SocialMediaPost } from "../app/type";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

export function usePostGet(mainUrl: string) {
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);

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
        const response = await fetch(`${BASE_URL}/${mainUrl}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Помилка запиту: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [navigate, mainUrl]);
  return { posts, setPosts, isLoading, error };
}
