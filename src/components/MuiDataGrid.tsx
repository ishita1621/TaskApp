
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import getAllTasks from "../services/TaskApi.js";
import { loadData, saveTasks } from "../services/taskStorage.js";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FormControlLabel from "@mui/material/FormControlLabel";
import AppButton from "./common/AppButton.js";
import Checkbox from "@mui/material/Checkbox";
import AppDialogTitle from "./common/AppDialogTitle.js";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import AppTextField from "./common/AppTextField.js";
import Dialog from "@mui/material/Dialog";

type Task = {
  id: number;
  title: string;
  completed: boolean;
}

type MuiDataGridProps = {
  refreshTrigger: number;
};

export default function MuiDataGrid({
  refreshTrigger,
}:MuiDataGridProps) {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [load, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedCompleted, setEditedCompleted] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(true);
      try {
        const savedTasks = loadData();
        if (Array.isArray(savedTasks)) {
          setTasks(savedTasks);
        } else {
          const data = await getAllTasks();
          setTasks(data);
          saveTasks(data);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [refreshTrigger]);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setEditedTitle(task.title);
    setEditedCompleted(task.completed);
    setEditOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selectedTask || !editedTitle.trim()) {
      return;
    }
    const updatedTasks = tasks.map((task) =>
      task.id === selectedTask.id ? {
        ...task,
        title: editedTitle.trim(),
        completed: editedCompleted,
      }
        : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setEditOpen(false);
    setSelectedTask(null);
  }

   const handleDeleteClick = (task: Task) => {
    setTaskToDelete(task);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!taskToDelete) {
      return;
    }

    const updatedTasks = tasks.filter(
      (task) => task.id !== taskToDelete.id
    );

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setDeleteOpen(false);
    setTaskToDelete(null);
  };

   const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Task Title", flex: 1, minWidth: 200 },
    {
      field: "completed",
      headerName: "Completed",
      width: 130,
      type: "boolean",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit task">
            <IconButton
              color="primary"
              aria-label={`Edit ${params.row.title}`}
              onClick={() => handleEdit(params.row as Task)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete task">
            <IconButton
              color="error"
              aria-label={`Delete ${params.row.title}`}
              onClick={() => handleDeleteClick(params.row as Task)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];


 return (
    <Box sx={{ width: "100%" }}>
      {error && (
        <Box sx={{ mb: 2, color: "error.main" }}>
          Could not load tasks. Please try again.
        </Box>
      )}

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={tasks}
          columns={columns}
          loading={load}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
        />
      </Box>

      {/* Edit task dialog */}
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <AppDialogTitle>Edit Task</AppDialogTitle>

        <DialogContent>
          <AppTextField
            autoFocus
            fullWidth
            margin="normal"
            label="Task Title"
            value={editedTitle}
            onChange={(event) => setEditedTitle(event.target.value)}
            error={!editedTitle.trim()}
            helperText={
              !editedTitle.trim() ? "Task title is required" : ""
            }
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={editedCompleted}
                onChange={(event) =>
                  setEditedCompleted(event.target.checked)
                }
              />
            }
            label="Completed"
          />
        </DialogContent>

        <DialogActions>
          <AppButton onClick={() => setEditOpen(false)}>
            Cancel
          </AppButton>

          <AppButton
            variant="contained"
            onClick={handleSaveEdit}
            disabled={!editedTitle.trim()}
          >
            Save Changes
          </AppButton>
        </DialogActions>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      >
        <AppDialogTitle>Delete Task?</AppDialogTitle>

        <DialogContent>
          Are you sure you want to delete "{taskToDelete?.title}"?
        </DialogContent>

        <DialogActions>
          <AppButton onClick={() => setDeleteOpen(false)}>
            Cancel
          </AppButton>

          <AppButton
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
          >
            Delete
          </AppButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}