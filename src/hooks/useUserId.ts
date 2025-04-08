import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export function useUserId() {
  const [userId, setUserId] = useState<number | null>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: { userId: number } = jwtDecode(token);
        if (decoded?.userId) {
          setUserId(decoded.userId);
        } else {
          console.error("Токен не містить userId");
          setUserId(null);
        }
      } catch (error) {
        console.error("Помилка декодування токена:", error);
        setUserId(null);
      }
    }
  }, []);

  return userId;
}
