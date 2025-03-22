import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../Loading";

const FacebookRedirectHandler = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<String>();
  const [loading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const RedirectRes = () => {
      setIsLoading(true);
      try {
        const query = new URLSearchParams(window.location.search);
        const token = query.get("token");

        if (token) {
          localStorage.setItem("token", token);
          navigate("/maincontent");
        }
      } catch (error: any) {
        console.error(error, "ERROR!!!");
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    RedirectRes();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Loading isLoading={loading} />
    </div>
  );
};

export default FacebookRedirectHandler;
