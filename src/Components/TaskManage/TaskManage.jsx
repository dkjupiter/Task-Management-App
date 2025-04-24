import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask as deleteTaskAPI,
} from "../../api/task";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };
    loadTasks();
  }, []);

  const formik = useFormik({
    initialValues: editingTask || {
      title: "",
      description: "",
      status: "pending",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      status: Yup.string()
        .oneOf(["pending", "done"], "Invalid status")
        .required("Status is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (editingTask) {
        const updated = await updateTask(editingTask.id, values);
        setTasks((prev) =>
          prev.map((t) => (t.id === updated.id ? updated : t))
        );
        setEditingTask(null);
      } else {
        const created = await createTask(values);
        setTasks([...tasks, created]);
      }
      resetForm();
    },
  });

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const deleteTask = async (id) => {
    await deleteTaskAPI(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
    if (editingTask?.id === id) {
      setEditingTask(null);
      formik.resetForm();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Task Management</h2>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>

        {/*  Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4 mb-6">
          <div>
            <label htmlFor="title" className="block font-medium">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className={`w-full px-4 py-2 rounded border ${
                formik.touched.title && formik.errors.title
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-sm">{formik.errors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block font-medium">Description</label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className={`w-full px-4 py-2 rounded border ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm">{formik.errors.description}</p>
            )}
          </div>

          <div>
            <label htmlFor="status" className="block font-medium">Status</label>
            <select
              id="status"
              name="status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
              className="w-full px-4 py-2 rounded border border-gray-300"
            >
              <option value="pending">Pending</option>
              <option value="done">Done</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500"
          >
            {editingTask ? "Save Task" : "Add Task"}
          </button>
        </form>

        {/* Task List */}
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-gray-100 p-4 rounded-lg shadow flex flex-col gap-1"
            >
              <div className="font-bold text-lg">{task.title}</div>
              <div className="text-sm text-gray-700">{task.description}</div>
              <div
                className={`text-xs font-semibold w-fit px-2 py-1 rounded ${
                  task.status === "done"
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {task.status.toUpperCase()}
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/tasks/${task.id}`)}
                  className="text-green-600 text-sm hover:underline"
                >
                  View
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskPage;
