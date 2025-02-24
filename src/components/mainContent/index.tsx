import { selectIsAuthenticated } from "../../app/features/userSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
export const MainContent = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return <h1>Hi Oleg</h1>;
};
