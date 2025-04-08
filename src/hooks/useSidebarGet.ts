import { useEffect, useState } from "react";
import { User as mainUser } from "../app/type";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

type UserSettings = {
  avatarUrl?: string | File | null;
  avatarFile?: File | null | undefined;
  name: string | null;
  email: string | null;
};
export function useSidebar(mainUrl: string) {
  const [currentUser, setCurrentUser] = useState<UserSettings | null>(null);
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

        setCurrentUser(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [navigate, mainUrl]);
  return { currentUser, setCurrentUser };
}
