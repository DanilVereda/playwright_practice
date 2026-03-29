import { APIRequestContext } from '@playwright/test';

class AuthController {
  async signIn(request: APIRequestContext, email: string, password: string) {
    const response = await request.post('/api/auth/signin', {
      data: {
        email,
        password,
      },
    });
    return response;
  }
}

export const authController = new AuthController();
