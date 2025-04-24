import {
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
  } from "./task";
  
  global.fetch = vi.fn();
  
  describe("API /task.js", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });
  
    it("fetchTasks", async () => {
      fetch.mockResolvedValueOnce({ ok: true, json: () => [{ id: 1 }] });
      const result = await fetchTasks();
      expect(result).toEqual([{ id: 1 }]);
    });
  
    it("createTask", async () => {
      fetch.mockResolvedValueOnce({ json: () => ({ id: 1 }) });
      const result = await createTask({ title: "New Task" });
      expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ method: "POST" }));
      expect(result).toEqual({ id: 1 });
    });
  
    it("updateTask", async () => {
      fetch.mockResolvedValueOnce({ json: () => ({ id: 1, title: "Updated" }) });
      const result = await updateTask(1, { title: "Updated" });
      expect(result.title).toBe("Updated");
    });
  
    it("deleteTask", async () => {
      fetch.mockResolvedValueOnce({ ok: true });
      await deleteTask(1);
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/1"), expect.objectContaining({ method: "DELETE" }));
    });
  
    it("getTaskById", async () => {
      fetch.mockResolvedValueOnce({ ok: true, json: () => ({ id: 1 }) });
      const result = await getTaskById(1);
      expect(result.id).toBe(1);
    });
  });
  