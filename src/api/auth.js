export const mockLogin = async ({ username, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // mock ไปก่อนนะ
        if (username === 'admin' && password === '123456') {
          resolve({ token: 'fake-jwt-token' });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };
  