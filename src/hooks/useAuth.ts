import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login, Register } from "../app/type";
import { BASE_URL } from "../constants";

function isRegister(data: Login | Register): data is Register {
  return "name" in data;
}

export function useAuth(
  mainUrl: string,
  setSelected?: (value: string) => void
) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: Login | Register) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/${mainUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Помилка входу");
      }

      localStorage.setItem("token", result.token);

      if (isRegister(data)) {
        setSelected?.("login");
        return;
      }

      navigate("/maincontent");
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { onSubmit, isLoading, errorMessage };
}
