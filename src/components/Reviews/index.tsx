import { Avatar, Box, Card, Chip, Container, Typography } from "@mui/material";
import { useReviewsGetPagination } from "../../hooks/useReviewsGetPagination";
import { Pagination, Stack } from "@mui/material";
import { BASE_URL } from "../../constants";
import { useState } from "react";
import { formatRelativeDate } from "../../utils/formatRelativeDate";

export const Reviews = () => {
  const [page, setPage] = useState(1);

  const { data, meta, isLoading, error } = useReviewsGetPagination(
    "server/reviews-paginations",
    page,
    5
  );

  if (isLoading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error}</div>;
  if (!data) return <div>Дані не знайдено</div>;
  return (
    <Box className="w-full bg-white min-h-screen">
      <Box className="bg-purple-800 py-8 px-4">
        <Container maxWidth="lg">
          <Typography variant="h4" className="text-white font-bold">
            Відгуки клієнтів
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" className="pt-12 pb-2">
        <Typography variant="h5" className="text-gray-800 font-bold mb-6">
          Що кажуть наші клієнти
        </Typography>

        <Box className="space-y-6">
          {data?.map((review) => (
            <Card
              key={review.id}
              className="p-4 border border-gray-200 rounded-md shadow-sm"
              variant="outlined"
            >
              <Box className="flex items-start gap-4 mb-3">
                <Avatar
                  src={
                    review.user?.avatarUrl
                      ? `${BASE_URL}${review.user.avatarUrl}`
                      : undefined
                  }
                  alt={review.user?.name ?? "Користувач"}
                  className="w-12 h-12 bg-gray-300"
                />
                <Box>
                  <Typography variant="subtitle1" className="font-semibold">
                    {review.user?.name}
                  </Typography>
                  <Typography variant="caption" className="text-gray-500">
                    {formatRelativeDate(review.createdAt)}
                  </Typography>
                </Box>
              </Box>

              <Chip
                label={review.typeOfReviews}
                size="small"
                className="mb-2 bg-blue-500"
              />

              <Typography variant="subtitle1" className="font-medium mb-1">
                {review.topic}
              </Typography>
              <Typography variant="body2" className="text-gray-700">
                {review.messages}
              </Typography>
            </Card>
          ))}
        </Box>

        {meta && meta.totalPages > 1 && data && (
          <Stack spacing={2} alignItems="center" mt={4}>
            <Pagination
              count={meta.totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </Stack>
        )}
      </Container>
    </Box>
  );
};
