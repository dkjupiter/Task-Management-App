const API = "http://localhost:3001/tasks";

export const fetchTasks = async () => {
  const res = await fetch(API);
  return res.json();
};

export const createTask = async (task) => {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const updateTask = async (id, updatedTask) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTask),
  });
  return res.json();
};
export const getTaskById = async (id) => {
    const res = await fetch(`${API}/${id}`);
    if (!res.ok) throw new Error("Task not found");
    return res.json();
  };
  
export const deleteTask = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
};
