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
    <div className="register-container">
      <form className="form-register" onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          name="name"
          label="Ім'я"
          type="text"
          required="Обов'язкове поле"
          className="form-name"
        />
        <Input
          control={control}
          name="email"
          label="Email"
          type="email"
          required="Обов'язкове поле"
          className="form-email"
        />
        <Input
          control={control}
          name="password"
          label="Пароль"
          type="password"
          required="Обов'язкове поле"
          className="form-pswd"
        />

        {error && <p className="error-message">{error}</p>}

        <p className="text-center text-small">
          Уже є акаунт?{" "}
          <Link
            size="sm"
            className="cursor-pointer"
            onPress={() => setSelected("login")}
          >
            Ввійдіть
          </Link>
        </p>

        <div className="flex gap-2 justify-end">
          <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
            Зареєструватися
          </Button>
        </div>
      </form>
    </div>
  );
};
