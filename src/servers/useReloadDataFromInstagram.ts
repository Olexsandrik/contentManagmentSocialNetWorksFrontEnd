import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { useState } from "react";

export const useReloadDataFromInstagram = (mainUrl: string) => {
  const navigate = useNavigate();
  const [isLoadingReload, setIsLoadingReload] = useState(false);
  const handleReload = async() => {
    setIsLoadingReload(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/auth");
        return;
      }
      const response = await fetch(`${BASE_URL}/${mainUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Помилка запиту: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingReload(false);
    }
  };
  return { handleReload, isLoadingReload };
};
