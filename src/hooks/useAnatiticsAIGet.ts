import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { messageData } from "../app/type";


export const useAnalyticsAIGet = (mainUrl: string) => {
  const [dataFromAI, setDataFromAI] = useState<messageData[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
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
        const formattedMessages = data.flatMap((item: any) => {
          return [
            { role: "user", content: item.customPrompt },
            { role: "assistant", content: item.result },
          ];
        });

        setDataFromAI(formattedMessages);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [mainUrl, navigate]);

  return { dataFromAI };
};
