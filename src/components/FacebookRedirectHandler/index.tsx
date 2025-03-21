import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FacebookRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/maincontent");
    }
  }, []);

  return <p>Авторизація успішна, перенаправлення...</p>;
};

export default FacebookRedirectHandler;
