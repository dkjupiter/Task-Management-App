import { describe, it, expect, vi } from 'vitest';
import { mockLogin } from './auth'; // อ้างอิงฟังก์ชัน mockLogin จากไฟล์ auth.js

describe('mockLogin', () => {
  it('should resolve with token when credentials are correct', async () => { 
    // Arrange
    const credentials = { username: 'admin', password: '123456' };

    // Act
    const result = await mockLogin(credentials);

    // Assert เช็ก token
    expect(result).toEqual({ token: 'fake-jwt-token' }); 
  });

  it('should reject with an error when credentials are incorrect', async () => {
    // Arrange
    const credentials = { username: 'wronguser', password: 'wrongpass' };

    // Act & Assert
    await expect(mockLogin(credentials)).rejects.toThrow('Invalid credentials');
  });

});
