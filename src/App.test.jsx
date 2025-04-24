import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import '@testing-library/jest-dom';

// ✅ แก้ mock ให้ถูกต้อง
vi.mock('./Components/Login/Login', () => ({
  default: () => <div>Mock Login Page</div>,
}));
vi.mock('./Components/TaskManage/TaskManage', () => ({
  default: () => <div>Mock Task Page</div>,
}));
vi.mock('./Components/TaskManage/TaskDetail', () => ({
  default: () => <div>Mock Task Detail Page</div>,
}));
vi.mock('./Components/Auth/RequireAuth', () => ({
  default: ({ children }) => <>{children}</>,
}));

describe('App routing', () => {
  it('renders Login page at /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Mock Login Page')).toBeInTheDocument();
  });
});
