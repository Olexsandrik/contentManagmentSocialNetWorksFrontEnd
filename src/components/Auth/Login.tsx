import { hasErrorField } from "../../app/utils/hasErrorField";
import { Button, Link } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Input } from "../Input/index";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BASE_URL } from "../../constants";

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
    <div className="login-container">
      <form className="form-validation" onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          name="email"
          label="Email"
          type="email"
          className="email-input"
          required="Поле є обов’язковим"
        />

        <Input
          control={control}
          name="password"
          label="Пароль"
          type="password"
          className="password-input"
          required="Поле є обов’язковим"
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className="text-center text-small">
          Немає акаунта?{" "}
          <Link
            size="sm"
            className="cursor-pointer"
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
            className="login-btn"
          >
            Ввійти
          </Button>
        </div>
      </form>
    </div>
  );
};
