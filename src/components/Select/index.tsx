import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useController } from "react-hook-form";
import { SelectProps } from "../../app/type";

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
