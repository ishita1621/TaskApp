import { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { loadData } from "../services/taskStorage.js";
import MuiDataGrid from "../components/MuiDataGrid"

type Task = {
  id: number | string;
  title: string;
  status?: string;
  completed?: boolean;
};

const cardDetails = [
  { title: "Total Tasks", color: "#2563eb" },
  { title: "Pending Tasks", color: "#d97706" },
  { title: "In Progress Tasks", color: "#7c3aed" },
  { title: "Completed Tasks", color: "#059669" },
];

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = loadData();
    setTasks(savedTasks);
  }, []);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) =>
      task.status?.toLowerCase() === "completed" ||
      task.completed === true
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status?.toLowerCase() === "in-progress"
  ).length;

  const pendingTasks = tasks.filter((task) => {
    const status = task.status?.toLowerCase();

    return (
      status === "pending" ||
      (!status && task.completed !== true)
    );
  }).length;

  const taskStats = [
    { ...cardDetails[0], count: totalTasks },
    { ...cardDetails[1], count: pendingTasks },
    { ...cardDetails[2], count: inProgressTasks },
    { ...cardDetails[3], count: completedTasks },
  ];

  return (
    <>
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f6fb",
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Task Summary
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: 2,
        }}
      >
        {taskStats.map((stat) => (
          <Paper
            key={stat.title}
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid #e5e7eb",
              borderTop: `4px solid ${stat.color}`,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {stat.title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ mt: 1 }}
            >
              {stat.count}
            </Typography>
          </Paper>
        ))}
      </Box>
      
      <MuiDataGrid/>
    </Box>
     </>
  );
}