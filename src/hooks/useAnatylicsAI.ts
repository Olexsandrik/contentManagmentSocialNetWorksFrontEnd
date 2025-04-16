import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { useUserId } from "./useUserId";
import { messageData } from "../app/type";

export const useAnalyticsAI = (mainUrl: string) => {
  const [customPrompt, setCustomPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<messageData[]>([]);
  const userId = useUserId();
  const navigate = useNavigate();

  const handleSubmitAI = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    if (!customPrompt.trim() || !userId) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth");
        return;
      }

      setMessages((prev: any) => [
        ...prev,
        { role: "user", content: customPrompt },
      ]);

      setCustomPrompt("");

      const res = await fetch(`${BASE_URL}/${mainUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userId,
          customPrompt,
        }),
      });

      if (!res.ok) {
        throw new Error(`Помилка запиту: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);
      setMessages((prev: any) => [
        ...prev,
        { role: data.role, content: data.content },
      ]);
      console.log(data);
    } catch (error) {
      console.error("Помилка при надсиланні промпта:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmitAI,
    customPrompt,
    setCustomPrompt,
    loading,
    userId,
    messages,
    setMessages,
  };
};
