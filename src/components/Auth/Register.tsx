import { Button, Link } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Input } from "../Input";
import { useAuth } from "../../servers/useAuth";
import { Register as AuthRegister } from "../../app/type";
import { RegisterShema, registerShema } from "./zodValidations";
import { useSidebar } from "../../servers/useSidebarGet";
import { zodResolver } from "@hookform/resolvers/zod";
type Props = {
  setSelected: (value: string) => void;
};

export const Register = ({ setSelected }: Props) => {
  const { currentUser } = useSidebar("server/current");
  const shema = registerShema(currentUser);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterShema>({
    mode: "onChange",
    resolver: zodResolver(shema),
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const { onSubmit, isLoading, errorMessage } = useAuth(
    "server/register",
    setSelected
  );

  return (
    <form
      className="space-y-6 w-[700px] h-[600px] p-32 pt-10 mx-auto  pounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        control={control}
        name="name"
        label="Ім'я"
        type="text"
        required="Обов'язкове поле"
        className="w-full p-3 rounded-md"
      />
      <Input
        control={control}
        name="email"
        label="Email"
        type="email"
        required="Обов'язкове поле"
        className="w-full p-3  rounded-md"
      />
      <Input
        control={control}
        name="password"
        label="Пароль"
        type="password"
        required="Обов'язкове поле"
        className="w-full p-3  rounded-md"
      />

      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

      <p className="text-center text-sm">
        Уже є акаунт?{" "}
        <Link
          size="sm"
          className="cursor-pointer text-blue-600 hover:underline"
          onPress={() => setSelected("login")}
        >
          Ввійдіть
        </Link>
      </p>

      <div className="flex gap-2 justify-end">
        <Button
          fullWidth
          color="primary"
          type="submit"
          isLoading={isLoading}
          className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Зареєструватися
        </Button>
      </div>
    </form>
  );
};
