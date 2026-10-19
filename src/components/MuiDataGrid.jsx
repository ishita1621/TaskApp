
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import getAllTasks from "../services/TaskApi.js";

export default function TaskDataGrid() {
  const [tasks, setTasks] = useState([]);
  const [load, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(true);
      try {
        const data = await getAllTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Task Title", width: 300 },
    { field: "completed", headerName: "Completed", width: 150 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={tasks}
        columns={columns}
        load={tasks.length === 0}
      />
    </div>
  );
}