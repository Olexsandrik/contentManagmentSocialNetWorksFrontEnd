import { hasErrorField } from "../../app/utils/hasErrorField";
import { Button, Link } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Input } from "../Input/index";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BASE_URL } from "../../constants";
import { Loading } from "../Loading";
import { FacebookAuth } from "../FacebookAuth";

type Props = {
  setSelected: (value: string) => void;
};

type Login = {
  email: string;
  password: string;
};

export const Login = ({ setSelected }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Login>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: Login) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${BASE_URL}/server/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Помилка входу");
      }

      localStorage.setItem("token", result.token);
      navigate("/maincontent");
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="space-y-6 w-[700px] h-[600px] p-32 mx-auto rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        control={control}
        name="email"
        label="Email"
        type="email"
        className="w-full p-3 rounded-md"
        required="Поле є обов’язковим"
      />

      <Input
        control={control}
        name="password"
        label="Пароль"
        type="password"
        className="w-full p-3 rounded-md"
        required="Поле є обов’язковим"
      />

      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

      <p className="text-center text-sm">
        Немає акаунта?{" "}
        <Link
          size="sm"
          className="cursor-pointer text-blue-600 hover:underline"
          onPress={() => setSelected("sign-up")}
        >
          Зареєструйтесь
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
          Ввійти
        </Button>
      </div>
      <FacebookAuth />
    </form>
  );
};
