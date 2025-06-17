import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

type PatchTaskPayload = {
  priority: string;
};
export const usePatchPriority = (mainUrl: string | null) => {
  const [data, setData] = useState<PatchTaskPayload>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onChangePriority = async (userData: PatchTaskPayload) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/auth");
        return;
      }

      setIsLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/${mainUrl}`, {
        method: "PATCH",
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
      setData(data);
      return data;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, onChangePriority, isLoading, error };
};
