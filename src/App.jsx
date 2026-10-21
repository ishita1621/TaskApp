import { useEffect } from "react";
import { createDemoUser, authenticateUser } from "./services/AuthStorage.js";
import AppRoutes from "./routes/AppRoutes";
import Taskspage from "./pages/Taskpage.js";

function App() {
  useEffect(() => {
    createDemoUser();
  }, []);

  return <AppRoutes />
  // return <Taskspage/>
}

export default App
