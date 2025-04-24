import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    timeout: 8000,
    environment: "jsdom",
    globals: true,
    coverage: {
      provider: "v8", // ✅ ใช้ c8 แทน v8
      reporter: ["text", "html"], // ดูใน terminal + เปิด html ได้
    },
  },  
});
