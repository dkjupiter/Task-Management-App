import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import '@testing-library/jest-dom';

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Navigate: ({ to }) => <div>Redirected to {to}</div>,
  };
});

describe("RequireAuth", () => {
  it("redirects when no token", () => {
    localStorage.removeItem("token");
    render(<MemoryRouter><RequireAuth><div>Protected</div></RequireAuth></MemoryRouter>);
    expect(screen.getByText(/redirected to/i)).toBeInTheDocument();
  });

  it("renders content with token", () => {
    localStorage.setItem("token", "123");
    render(<MemoryRouter><RequireAuth><div>Protected</div></RequireAuth></MemoryRouter>);
    expect(screen.getByText(/protected/i)).toBeInTheDocument();
  });
});
