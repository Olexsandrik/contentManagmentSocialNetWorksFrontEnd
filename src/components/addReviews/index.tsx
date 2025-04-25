import { useForm } from "react-hook-form";
import { TabPanel } from "../TabPanel";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewsSecttings, ReviewsSettings } from "../Auth/zodValidations";
import { Input } from "../Input";

import { useReviewsPost } from "../../hooks/useReviewsPost";
import { Select } from "../Select";

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
      typeOfReviews: "",
    },
  });

  const { submitReview } = useReviewsPost("server/reviews");

  const onSubmit = async (data: ReviewsSettings) => {
    if (errors.reviews || errors.topics) return;

    const reviewToSend = {
      typeOfReviews: data.typeOfReviews,
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
                  name="typeOfReviews"
                  control={control}
                  options={[
                    { value: "suggestion", label: "Пропозиція" },
                    { value: "bug", label: "Повідомлення про помилку" },
                    { value: "praise", label: "Подяка" },
                    { value: "other", label: "Інше" },
                  ]}
                  placeholder="Оберіть тип відгуку"
                />
              </FormControl>

              <Input
                control={control}
                name="topics"
                label="Тема"
                placeholder="Коротко опишіть ваш відгукʼ..."
                className="w-full"
              />
              <Input
                control={control}
                name="reviews"
                label="Повідомлення"
                placeholder="Детально опишіть ваш відгук..."
                textFields
                className="w-full"
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
