import { useForm } from "react-hook-form";
import { TabPanel } from "../TabPanel";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewsSecttings, ReviewsSettings } from "../Auth/zodValidations";
import { Input } from "../Input";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReviewsPost } from "../../hooks/useReviewsPost";

export const AddReviews = ({ tabValue, toast }: any) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewsSettings>({
    mode: "onChange",
    resolver: zodResolver(reviewsSecttings),
    reValidateMode: "onBlur",
    defaultValues: {
      topics: "",
      reviews: "",
    },
  });
  const [reviewData, setReviewData] = useState({
    typeOfReviews: "",
    topic: "",
    reviews: "",
    createdAt: new Date(),
  });
  const { submitReview } = useReviewsPost("server/reviews");
  const handleReviewChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;
      setReviewData((prev) => ({ ...prev, [id]: value }));
    },
    []
  );

  const reviewRef = useRef(reviewData);

  useEffect(() => {
    reviewRef.current = reviewData;
  }, [reviewData]);

  const onSubmit = async (data: ReviewsSettings) => {
    if (errors.reviews || errors.topics) return;
    const reviewToSend = {
      typeOfReviews: reviewData.typeOfReviews,
      topic: data.topics,
      reviews: data.reviews,
      createdAt: new Date(),
    };

    await submitReview(reviewToSend);

    toast({
      title: "Дякуємо за ваш відгук!",
      description:
        "Ми цінуємо вашу думку і використаємо її для покращення нашого сервісу.",
    });

    reset();
  };

  const handleTypeChange = useCallback((e: SelectChangeEvent) => {
    setReviewData((prev) => ({ ...prev, typeOfReviews: e.target.value }));
  }, []);
  return (
    <TabPanel value={tabValue} index={2}>
      <Card>
        <CardHeader title="Залишити відгук" />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormControl fullWidth>
                <InputLabel id="feedback-type-label">Тип відгуку</InputLabel>
                <Select
                  labelId="feedback-type-label"
                  id="typeOfReviews"
                  value={reviewData.typeOfReviews}
                  label="Тип відгуку"
                  onChange={handleTypeChange}
                >
                  <MenuItem value="suggestion">Пропозиція</MenuItem>
                  <MenuItem value="bug">Повідомлення про помилку</MenuItem>
                  <MenuItem value="praise">Подяка</MenuItem>
                  <MenuItem value="other">Інше</MenuItem>
                </Select>
              </FormControl>

              <Input
                control={control}
                name="topics"
                label="Тема"
                placeholder="Коротко опишіть ваш відгукʼ..."
                className="w-full"
                onChange={handleReviewChange}
              />
              <Input
                control={control}
                name="reviews"
                label="Повідомлення"
                placeholder="Детально опишіть ваш відгук..."
                textFields
                className="w-full"
                onChange={handleReviewChange}
              />

              <Button type="submit" variant="contained" color="primary">
                Надіслати відгук
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </TabPanel>
  );
};
