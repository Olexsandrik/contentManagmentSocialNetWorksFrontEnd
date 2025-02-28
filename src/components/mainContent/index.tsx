import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { User } from "../../app/type";
import { BASE_URL } from "../../constants";
export const Layout = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/auth");
          return;
        }
        const response = await fetch(`${BASE_URL}/server/current`, {
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
      } catch (err: any) {
        setError(err.message);
      }
    })();
  }, [navigate]);

  if (!currentUser) {
    return <p>Завантаження...</p>;
  }

  return (
    <div>
      <h1>Привіт, {currentUser.name}</h1>
      <p>Email: {currentUser.email}</p>
    </div>
  );
};
