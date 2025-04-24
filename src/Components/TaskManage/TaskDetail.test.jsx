import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import TaskDetailPage from "./TaskDetail";
import "@testing-library/jest-dom";

// mock แบบ hoisting-friendly
vi.mock("../../api/task", async () => {
  return {
    getTaskById: vi.fn(),
  };
});

import * as api from "../../api/task"; // <-- import mock API หลัง vi.mock()

const renderWithRoute = (taskId) =>
  render(
    <MemoryRouter initialEntries={[`/tasks/${taskId}`]}>
      <Routes>
        <Route path="/tasks/:id" element={<TaskDetailPage />} />
      </Routes>
    </MemoryRouter>
  );

describe("TaskDetailPage", () => {
  it("renders task detail correctly", async () => {
    api.getTaskById.mockResolvedValueOnce({
      id: 1,
      title: "Test Detail",
      description: "Detail view test",
      status: "done",
    });

    renderWithRoute(1);

    expect(await screen.findByText("Test Detail")).toBeInTheDocument();
    expect(screen.getByText("Detail view test")).toBeInTheDocument();
    expect(screen.getByText(/DONE/i)).toBeInTheDocument();
  });

  it("shows error if task not found", async () => {
    api.getTaskById.mockRejectedValueOnce(new Error("Not found"));

    renderWithRoute(999);

    expect(await screen.findByText(/Task not found/i)).toBeInTheDocument();
  });
});
