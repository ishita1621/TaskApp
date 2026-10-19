import Select, { type SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

type AppSelectProps = {
label: string;
value: string;
onChange: (event: SelectChangeEvent<string>) => void;
options: readonly string[];
};

export default function AppSelect({
  label,
  value,
  onChange,
  options = [],
}:AppSelectProps) {
  return (
    <FormControl fullWidth margin="normal" size="small">
      <InputLabel>{label}</InputLabel>

      <Select
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}