import { Input as NextInput } from "@nextui-org/react";
import React from "react";
import { Control, useController } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  control: Control<any>;
  required?: string;
  endContent?: React.JSX.Element;
  className?: string;
};
export const Input = ({
  name,
  label,
  placeholder,
  type,
  control,
  required = "",

  className,
}: Props) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {
      required,
    },
  });
  return (
    <NextInput
      className={className}
      id={name}
      label={label}
      type={type}
      placeholder={placeholder}
      value={field.value}
      name={field.name}
      isInvalid={invalid}
      onChange={field.onChange}
      onBlur={field.onBlur}
      errorMessage={`${errors[name]?.message ?? ""}`}
      classNames={{
        errorMessage: "text-red-500 text-sm",
      }}
    />
  );
};
