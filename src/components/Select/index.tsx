import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useController, Control } from "react-hook-form";

type SelectProps = {
  name: string;
  control: Control<any>;

  options: { value: string; label: string }[];
  placeholder: string;
};

export const Select = ({
  name,
  control,

  options,
  placeholder,
}: SelectProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl fullWidth error={!!error}>
      <InputLabel id={`${name}-label`}>{placeholder}</InputLabel>
      <MuiSelect id={name} {...field}>
        <MenuItem disabled>{placeholder}</MenuItem>

        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};
