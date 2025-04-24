import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import TaskPage from "./TaskManage";
import '@testing-library/jest-dom';
import * as api from "../../api/task";

// Mock API
vi.mock("../../../api/tasks", () => ({
  fetchTasks: vi.fn().mockResolvedValue([]),
  createTask: vi.fn().mockImplementation((task) => Promise.resolve({ ...task, id: 1 })),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
}));

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("TaskPage", () => {
  it("renders the form correctly", () => {
    renderWithRouter(<TaskPage />);
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
  });

  it("shows validation errors if form is submitted empty", async () => {
    renderWithRouter(<TaskPage />);
    fireEvent.click(screen.getByText(/Add Task/i));

    await waitFor(() => {
      // กด blur เพื่อให้ Formik เรียก validate ก่อน
        fireEvent.blur(screen.getByLabelText(/Title/i));
        fireEvent.blur(screen.getByLabelText(/Description/i));

        fireEvent.click(screen.getByText(/Add Task/i));

    });
  });

  it("submits the form when valid", async () => {
    renderWithRouter(<TaskPage />);

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Test Task" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Testing description" },
    });

    fireEvent.click(screen.getByText(/Add Task/i));

    await screen.findByText("Test Task");
  });

  it("loads task data into form when clicking Edit", async () => {
    const sampleTask = {
      id: 1,
      title: "Sample Task",
      description: "Edit me",
      status: "pending",
    };
  
    // mock ให้มี task ใน list
    vi.spyOn(api, "fetchTasks").mockResolvedValueOnce([sampleTask]);
  
    renderWithRouter(<TaskPage />);
  
    // รอ task แสดงบนจอ
    await screen.findByText("Sample Task");
  
    // คลิกปุ่ม Edit
    const editButtons = screen.getAllByRole('button', { name: /Edit/i });
    fireEvent.click(editButtons[0]);
  
    // ตรวจว่าค่าถูกโหลดเข้า form
    expect(screen.getByDisplayValue("Sample Task")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Edit me")).toBeInTheDocument();
  });
  
  it("deletes task when clicking Delete", async () => {
    const sampleTask = {
      id: 2,
      title: "Delete Me",
      description: "You won't see me again",
      status: "pending",
    };
  
    vi.spyOn(api, "fetchTasks").mockResolvedValueOnce([sampleTask]);
  
    renderWithRouter(<TaskPage />);
  
    // รอ task ปรากฏ
    await screen.findByText("Delete Me");
  
    // คลิกปุ่ม Delete
    const editButtons = screen.getAllByRole('button', { name: /Delete/i });
    fireEvent.click(editButtons[0]);
  
    // รอจน task หายไปจากหน้าจอ
    await waitFor(() => {
      expect(screen.queryByText("Delete Me")).not.toBeInTheDocument();
    });
  });
  
});
