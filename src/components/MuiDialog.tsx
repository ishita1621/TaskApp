import * as React from "react";
import AppDialog from "./common/AppDialog";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { TextFieldProps } from "@mui/material/TextField";
import type { Dayjs } from "dayjs";

type CustomizedDialogsProps = {
  openTaskDialog: boolean;
  handleClose: () => void;
  handleSubmit: (task: {
    id: number;
    title: string;
    priority: string;
    dueDate: string | null;
    completed: boolean;
  }) => void;
};

export default function CustomizedDialogs({
  openTaskDialog,
  handleClose,
  handleSubmit
}:CustomizedDialogsProps) {

  const [priority, setPriority] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [dueDate, setDueDate] = React.useState<Dayjs | null>(null);

  const handlePriorityChange = (event:SelectChangeEvent<string>) => {
    console.log("task priority :", event.target.value);
    setPriority(event.target.value);
  };

  const handleTitleChange: NonNullable<TextFieldProps["onChange"]> = (event) => {
    setTitle(event.target.value);
    console.log("task title :", event.target.value);
  }

  const handleDueDateChange = (e: Dayjs | null) => {
    setDueDate(e);
    console.log("task due date :", e);
  }

  const handleSave = () => {
    const task = {
      id: Date.now(),
      title: title.trim(),
      priority: priority,
      dueDate: dueDate ? dueDate.format("YYYY-MM-DD") : null,
      completed: false,
    }
    console.log("Task created:", task);
    handleSubmit(task);
    setTitle("");
    setPriority("");
    setDueDate(null);
  }
  return (

<AppDialog
  open={openTaskDialog}
  handleClose={handleClose}
  title={title}
  priority={priority}
  dueDate={dueDate}
  handleTitleChange={handleTitleChange}
  handlePriorityChange={handlePriorityChange}
  handleDueDateChange={handleDueDateChange}
  handleSave={handleSave}
/>
  );
}
