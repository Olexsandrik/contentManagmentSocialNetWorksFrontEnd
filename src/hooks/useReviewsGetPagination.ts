import { useEffect, useState } from "react";
import { Review } from "../app/type";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export function useReviewsGetPagination(
  mainUrl: string,
  page: number,
  limit: number = 10
) {
  const [data, setData] = useState<Review[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `${BASE_URL}/${mainUrl}?page=${page}&limit=${limit}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }

        const result = await response.json();

        setData(result.data);
        setMeta(result.meta);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [mainUrl, page, limit]);

  return { data, meta, isLoading, error };
}
