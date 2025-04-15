import type React from "react";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  TextField,
  Button,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import {
  Person as UserIcon,
  Language as GlobeIcon,
  Message as MessageSquareIcon,
} from "@mui/icons-material";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { useUserId } from "../../hooks/useUserId";
import { useToast } from "../../hooks/useToast";
import { TabPanel } from "../TabPanel";
import { useSidebar } from "../../hooks/useSidebarGet";
import { debounce } from "lodash";
import { useReviewsPost } from "../../hooks/useReviewsPost";

type UserSettings = {
  avatarUrl?: string | File | null;
  avatarFile?: File | null | undefined;
  name: string | null;
  email: string | null;
};

import { formatDistanceToNow } from "date-fns";

export function Settings() {
  const { toast, Snackbar } = useToast();
  const userId = useUserId();
  const { updateUser, isLoading, error } = useUpdateUser(userId);
  const { currentUser } = useSidebar("server/current");
  const [tabValue, setTabValue] = useState(0);

  const [settings, setSettings] = useState<UserSettings>({
    avatarUrl: currentUser?.avatarUrl ?? "",
    name: currentUser?.name ?? "",
    email: currentUser?.email ?? "",
  });

  const [reviewData, setReviewData] = useState({
    typeOfReviews: "",
    topic: "",
    messages: "",
    createdAt: new Date(), // додамо дату створення відгуку
  });

  const { submitReview, reviews, setReviews } =
    useReviewsPost("server/reviews");

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlerImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSettings((prev) => ({
          ...prev,
          avatarFile: file,
          avatarUrl: imageUrl,
        }));
      }
    },
    []
  );

  const handleUpdate = async () => {
    await updateUser({
      name: settings.name,
      email: settings.email,
      avatarUrl: settings.avatarFile,
    });
    toast({
      title: "Профіль оновлено",
      description: "Ваші зміни були успішно збережені.",
    });
    setTimeout(() => window.location.reload(), 1000);
  };

  const handlerName = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      setSettings((prev) => ({ ...prev, name: e.target.value }));
    }, 500),
    []
  );

  const handlerEmail = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      setSettings((prev) => ({ ...prev, email: e.target.value }));
    }, 500),
    []
  );

  const handleReviewChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setReviewData((prev) => ({ ...prev, [id]: value }));
  };

  const handleTypeChange = (e: SelectChangeEvent) => {
    setReviewData((prev) => ({ ...prev, typeOfReviews: e.target.value }));
  };

  const reviewRef = useRef(reviewData);

  useEffect(() => {
    reviewRef.current = reviewData;
  }, [reviewData]);

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitReview(reviewRef.current);

    toast({
      title: "Дякуємо за ваш відгук!",
      description:
        "Ми цінуємо вашу думку і використаємо її для покращення нашого сервісу.",
    });
    setReviewData({
      typeOfReviews: "",
      topic: "",
      messages: "",
      createdAt: new Date(),
    });
  };

  // Функція для форматування часу
  const timeAgo = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <div className="container mx-auto py-10">
      <Typography variant="h4" component="h1" className="font-bold mb-6">
        Налаштування
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab icon={<UserIcon />} label="Профіль" />
          <Tab icon={<GlobeIcon />} label="Мова" />
          <Tab icon={<MessageSquareIcon />} label="Відгук" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Card>
          <CardHeader title="Налаштування профілю" />
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4">
                  <Avatar
                    src={
                      typeof settings.avatarUrl === "string"
                        ? settings.avatarUrl
                        : undefined
                    }
                    alt="Фото профілю"
                    sx={{ width: 96, height: 96 }}
                  />
                  <div className="flex flex-col space-y-2">
                    <Typography variant="body2">Фото профілю</Typography>
                    <Button variant="outlined" component="label">
                      Завантажити фото
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handlerImageChange}
                      />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <TextField
                    id="name"
                    label="Ім'я"
                    variant="outlined"
                    onChange={handlerName}
                    fullWidth
                  />
                  <TextField
                    id="email"
                    label="Email"
                    type="email"
                    onChange={handlerEmail}
                    variant="outlined"
                    fullWidth
                  />
                </div>

                <TextField
                  id="bio"
                  label="Про себе"
                  placeholder="Розкажіть коротко про себе..."
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />

                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleUpdate}
                >
                  Зберегти зміни
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Card>
          <CardHeader title="Налаштування мови" />
          <CardContent>
            <FormControl fullWidth>
              <InputLabel id="language-label">Мова інтерфейсу</InputLabel>
              <Select
                labelId="language-label"
                id="language"
                defaultValue="ua"
                label="Мова інтерфейсу"
                onChange={() => {
                  toast({
                    title: "Мову змінено",
                    description: "Мову інтерфейсу змінено.",
                  });
                }}
              >
                <MenuItem value="ua">Українська</MenuItem>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="pol">Польська</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary">
              Застосувати зміни
            </Button>
          </CardActions>
        </Card>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Card>
          <CardHeader title="Залишити відгук" />
          <CardContent>
            <form onSubmit={handleReviewSubmit}>
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

                <TextField
                  id="topic"
                  label="Тема"
                  placeholder="Коротко опишіть тему відгуку"
                  variant="outlined"
                  value={reviewData.topic}
                  onChange={handleReviewChange}
                  fullWidth
                />

                <TextField
                  id="messages"
                  label="Повідомлення"
                  placeholder="Детально опишіть ваш відгук..."
                  multiline
                  rows={6}
                  variant="outlined"
                  value={reviewData.messages}
                  onChange={handleReviewChange}
                  fullWidth
                />

                <Button type="submit" variant="contained" color="primary">
                  Надіслати відгук
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabPanel>

      <Typography variant="body2" color="textSecondary" align="center">
        {`Відгук був залишений ${timeAgo(reviewData.createdAt)}`}
      </Typography>

      {Snackbar}
    </div>
  );
}
