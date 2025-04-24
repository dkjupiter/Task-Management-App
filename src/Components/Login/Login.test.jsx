import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // ต้อง import BrowserRouter
import Login from "./Login";
import { mockLogin } from "../../api/auth";

// Mock localStorage
beforeAll(() => {
  global.localStorage = {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
});

// Mock mockLogin
vi.mock("../../api/auth", () => ({
  mockLogin: vi.fn(),
}));

describe("Login", () => {
  it("logs in and stores token", async () => {
    // Mock API response
    mockLogin.mockResolvedValue({ token: "mock-token" });

    // ห่อ Login component ด้วย BrowserRouter
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Fill the form
    fireEvent.change(getByLabelText(/username/i), { target: { value: "testuser" } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: "password123" } });

    // Submit the form
    fireEvent.click(getByText(/enter/i));

    // Wait for localStorage.setItem to be called with the correct arguments
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith("token", "mock-token");
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });
});
