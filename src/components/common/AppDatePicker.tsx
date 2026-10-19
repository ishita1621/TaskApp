import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { Dayjs } from "dayjs";

type DatePickerProps = {
label: string;
value: Dayjs | null;
onChange: (date: Dayjs | null) => void;
};

export default function AppDatePicker({
  label,
  value,
  onChange,
}: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        slotProps={{   //MUI property that lets you customize the smaller components inside a larger component
          textField: {
            fullWidth: true,
            size: "small",
          },
        }}
      />
    </LocalizationProvider>
  );
}
