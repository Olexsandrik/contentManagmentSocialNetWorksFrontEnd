import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";
import { useController } from "react-hook-form";
import { SelectProps } from "../../app/type";

export const Select = ({
  name,
  control,
  options,
  placeholder,
  onChange,
  className,
}: SelectProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FormControl fullWidth error={!!error} size="small" className={className}>
      <InputLabel>{placeholder}</InputLabel>
      <MuiSelect
        id={name}
        {...field}
        onChange={(e) => {
          field.onChange(e);
          onChange?.(e);
        }}
        label={placeholder}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};
