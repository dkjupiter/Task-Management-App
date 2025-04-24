import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import TaskPage from "./Components/TaskManage/TaskManage";
import TaskDetailPage from "./Components/TaskManage/TaskDetail";
import RequireAuth from "./Components/Auth/RequireAuth";

const App = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route
      path="/tasks"
      element={
        <RequireAuth>
          <TaskPage />
        </RequireAuth>
      }
    />
    <Route
      path="/tasks/:id"
      element={
        <RequireAuth>
          <TaskDetailPage />
        </RequireAuth>
      }
    />
  </Routes>
);

export default App;
