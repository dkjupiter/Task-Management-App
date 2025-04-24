import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById } from "../../api/task";

const TaskDetailPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTask = async () => {
      try {
        const data = await getTaskById(id);
        setTask(data);
      } catch (err) {
        setError("Task not found");
      }
    };
    loadTask();
  }, [id]);

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
        <button
          onClick={() => navigate("/")}
          className="block mt-4 text-blue-600 underline"
        >
          Back to Task List
        </button>
      </div>
    );
  }

  if (!task) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Task Detail</h1>
        <p><strong>Title:</strong> {task.title}</p>
        <p><strong>Description:</strong> {task.description}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`inline-block px-2 py-1 rounded text-sm ${
              task.status === "done"
                ? "bg-green-200 text-green-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {task.status}
          </span>
        </p>
        <button
            onClick={() => navigate("/tasks")}
            className="mt-4 text-blue-600 underline"
            >
            Back to Task List
        </button>
      </div>
    </div>
  );
};

export default TaskDetailPage;
