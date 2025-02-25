import { useLazyCurrentQuery, useLoginMutation } from '../../app/services/userApi';
import { hasErrorField } from '../../app/utils/hasErrorField';
import { Button, Link } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { Input } from '../Input/index';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [triggerCurrentQuery] = useLazyCurrentQuery();
  const onSubmit = async (data: Login) => {
    try {
      await login(data).unwrap();
      await triggerCurrentQuery().unwrap();
      navigate('/maincontent');
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      }
    }
  };
  return (
    <div className="login-container">
      <form className="form-validation" onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          name="email"
          label="email"
          type="email"
          className="email-input"
          required="Поле є обовязковим"
        />
        {/* {errors.email && <p>{errors.email.message}</p>} */}

        <Input
          control={control}
          name="password"
          label="пароль"
          type="password"
          className="password-input"
          required="Поле є обовязковим"
        />
        {/* {errors.password && <p>{errors.password.message}</p>} */}

        <p className="text-center text-small">
          Немає акаунта?{' '}
          <Link
            size="sm"
            className="cursore-pointer"
            onPress={() => setSelected('sign-up')}
          >
            зарегайтесь
          </Link>
        </p>
        <div className="flex gap-2 jusify-end">
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
