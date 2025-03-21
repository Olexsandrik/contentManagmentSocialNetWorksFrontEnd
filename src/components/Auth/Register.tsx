import { Button, Link } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Input } from "../Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Register = {
  email: string;
  name: string;
  password: string;
};

type Props = {
  setSelected: (value: string) => void;
};

export const Register = ({ setSelected }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Register>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: Register) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/server/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Помилка реєстрації");
      }

      localStorage.setItem("token", result.token);

      setSelected("login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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

      {error && <p className="text-red-500 text-sm">{error}</p>}

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
