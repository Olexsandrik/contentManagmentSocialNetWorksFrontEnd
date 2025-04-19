import { Input as NextInput } from "@nextui-org/react";
import React, { ChangeEvent } from "react";
import { Control, useController } from "react-hook-form";
import { InputProps } from "../../app/type";
import { Textarea } from "@nextui-org/react";

export const Input = ({
  name,
  label,
  placeholder,
  type,
  control,
  required = "",
  textFields,
  className,
  value,
  onChange,
}: InputProps) => {
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
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    field.onChange(e);
    onChange?.(e);
  };
  return textFields ? (
    <Textarea
      className={className}
      id={name}
      label={label}
      placeholder={placeholder}
      value={value ? value : field.value}
      name={field.name}
      isInvalid={invalid}
      onChange={handleChange}
      onBlur={field.onBlur}
      errorMessage={`${errors[name]?.message ?? ""}`}
      minRows={6}
      classNames={{
        errorMessage: "text-red-500 text-sm",
      }}
    />
  ) : (
    <NextInput
      className={className}
      id={name}
      label={label}
      type={type}
      placeholder={placeholder}
      value={value ? value : field.value}
      name={field.name}
      isInvalid={invalid}
      onChange={handleChange}
      onBlur={field.onBlur}
      errorMessage={`${errors[name]?.message ?? ""}`}
      classNames={{
        errorMessage: "text-red-500 text-sm",
      }}
    />
  );
};
