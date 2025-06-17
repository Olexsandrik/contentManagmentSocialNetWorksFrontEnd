import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import { TabPanel } from "../TabPanel";
import { Input } from "../Input";
import { useForm } from "react-hook-form";
import { changeProfile, ChangeProfile } from "../Auth/zodValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUser } from "../../servers/useUpdateUser";
import { useUserId } from "../../servers/useUserId";
import { ChangeEvent, useCallback, useState } from "react";
import { debounce } from "lodash";
import { UserSettings } from "../../app/type";
import { useSidebar } from "../../servers/useSidebarGet";

export const ProfileSettings = ({ tabValue, toast, index }: any) => {
  const userId = useUserId();

  const { currentUser } = useSidebar("server/current");
  const { updateUser, isLoading, error } = useUpdateUser(userId);

  const [settings, setSettings] = useState<UserSettings>({
    avatarUrl: currentUser?.avatarUrl ?? "",
    name: currentUser?.name ?? "",
    email: currentUser?.email ?? "",
  });

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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeProfile>({
    mode: "onChange",
    resolver: zodResolver(changeProfile),
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const onSubmit = async () => {
    if (errors.name || errors.email) return;

    await handleUpdate();
  };
  return (
    <TabPanel value={tabValue} index={0}>
      <Card>
        <CardHeader title="Налаштування профілю" />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                <Input
                  control={control}
                  name="email"
                  label="Email"
                  type="email"
                  className="w-full p-3 rounded-md"
                  required="Поле є обов’язковим"
                  onChange={handlerEmail}
                />{" "}
                <Input
                  control={control}
                  name="name"
                  label="Введіть ім'я"
                  type="passNameword"
                  className="w-full p-3 rounded-md"
                  onChange={handlerName}
                />
              </div>

              <Input
                control={control}
                name="about youself"
                label="Введіть ім'я"
                type="passNameword"
                className="w-full p-3 rounded-md"
                textFields={true}
              />

              <Button type="submit" variant="contained">
                Зберегти зміни
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </TabPanel>
  );
};
