import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import type { TextFieldProps } from "@mui/material/TextField";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { Dayjs } from "dayjs";
import type { ReactNode } from "react";

import AppDialogTitle from "./AppDialogTitle";
import AppCloseButton from "./AppCloseButton";
import AppTextField from "./AppTextField";
import AppSelect from "./AppSelect";
import AppDatePicker from "./AppDatePicker";
import AppButton from "./AppButton";
import BootstrapDialog from "./BootstrapDialog";


type AppTaskDialogProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  priority: string;
  dueDate: Dayjs | null;

  handleTitleChange: NonNullable<TextFieldProps["onChange"]>;
  handlePriorityChange: (
    event: SelectChangeEvent<string>
  ) => void;
  handleDueDateChange: (date: Dayjs | null) => void;
  handleSave: () => void;

  dialogTitle?: ReactNode;
};

export default function AppDialog({
  open,
  handleClose,
  title,
  priority,
  dueDate,
  handleTitleChange,
  handlePriorityChange,
  handleDueDateChange,
  handleSave,
  dialogTitle = "Add Task",
}: AppTaskDialogProps) {
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      maxWidth="sm"
    >
      <AppDialogTitle>{dialogTitle}</AppDialogTitle>

      <AppCloseButton onClick={handleClose} />

      <DialogContent dividers>
        <AppTextField
          label="Task Title"
          value={title}
          onChange={handleTitleChange}
        />

        <AppSelect
          label="Priority"
          value={priority}
          onChange={handlePriorityChange}
          options={["High", "Medium", "Low"]}
        />

        <AppDatePicker
          label="Due Date"
          value={dueDate}
          onChange={handleDueDateChange}
        />
      </DialogContent>

      <DialogActions>
        <AppButton onClick={handleClose} color="inherit">
          Cancel
        </AppButton>

        <AppButton onClick={handleSave}>
          Save Task
        </AppButton>
      </DialogActions>
    </BootstrapDialog>
  );
}