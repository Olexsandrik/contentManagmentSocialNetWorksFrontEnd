import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

// Тип даних, які приходять від сервера
type User = {
  id: number;
  name: string | null;
  email: string | null;
  avatarUrl: string | null;
};

type UpdateUserData = {
  name?: string | null;
  email?: string | null;
  avatarUrl?: File | null;
};

export function useUpdateUser(mainUrl: number | null | undefined) {
  const [update, setUpdate] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const updateUser = async (userData: UpdateUserData) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/auth");
        return;
      }

      const formData = new FormData();

      if (userData.name) formData.append("name", userData.name);
      if (userData.email) formData.append("email", userData.email);
      if (userData.avatarUrl instanceof File) {
        formData.append("avatar", userData.avatarUrl);
      }

      setIsLoading(true);

      const response = await fetch(`${BASE_URL}/server/users/${mainUrl}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Помилка запиту: ${response.status}`);
      }

      const data: User = await response.json();
      setUpdate(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { update, setUpdate, updateUser, isLoading, error };
}
