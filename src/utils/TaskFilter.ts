
type TaskStatus = "Pending" | "In Progress" | "Completed";

type TaskPriority = "High" | "Medium" | "Low";

type Task = {
  id: number;
  title: string;
  description: string;
  assignee: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string | null;
};

type TaskFilters = {
  status: string;
  priority: string;
};

export const filterTasks = (
  tasks: Task[],
  filters: TaskFilters
): Task[] => {
  return tasks.filter((task) => {
    const matchesStatus =
      filters.status === "All" ||
      task.status === filters.status;

    const matchesPriority =
      filters.priority === "All" ||
      task.priority === filters.priority;

    return matchesStatus && matchesPriority;
  });
};