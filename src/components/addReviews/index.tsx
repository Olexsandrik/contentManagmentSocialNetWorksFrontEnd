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
import { reviewsSettings, ReviewsSettings } from "../Auth/zodValidations";
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
    resolver: zodResolver(reviewsSettings),
    reValidateMode: "onBlur",
    defaultValues: {
      topic: "",
      messages: "",
      typeOfReviews: "",
    },
  });

  const { submitReview } = useReviewsPost("server/reviews");

  const onSubmit = async (data: ReviewsSettings) => {
    const reviewToSend = {
      typeOfReviews: data.typeOfReviews,
      topic: data.topic,
      messages: data.messages,
      createdAt: new Date(),
    };

    await submitReview(reviewToSend);
    reset();

    // toast({
    //   title: "Дякуємо за ваш відгук!",
    //   description:
    //     "Ми цінуємо вашу думку і використаємо її для покращення нашого сервісу.",
    // });
  };

  return (
    <TabPanel value={tabValue} index={2}>
      <Card>
        <CardHeader title="Залишити відгук" />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormControl fullWidth>
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
                name="topic"
                label="Тема"
                placeholder="Коротко опишіть ваш відгук..."
                className="w-full"
              />
              <Input
                control={control}
                name="messages"
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
