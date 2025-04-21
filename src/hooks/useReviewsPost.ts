import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { AddReview } from "../app/type";

export const useReviewsPost = (mainUrl: string | null) => {
  const [reviews, setReviews] = useState<AddReview | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submitReview = async (userData: AddReview) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/auth");
        return;
      }

      setIsLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/${mainUrl}`, {
        method: "POST",
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
      setReviews(data);
      return data;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { submitReview, reviews, isLoading, error, setReviews };
};
