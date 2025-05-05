import { useState } from "react";
import { BASE_URL } from "../constants";

export const useDeleteTask = (mainUrl: string) => {
  const [loading, setLoading] = useState<Boolean>();

  const [error, setError] = useState<any>();

  const handlerDeleteTask = async (id: string) => {
    setLoading(false);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/${mainUrl}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete task");
      }
    } catch (error: any) {
      setError(error);
      console.error(error);
    }
  };

  return { handlerDeleteTask, loading, error };
};
