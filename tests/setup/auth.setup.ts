import test, { expect } from '@playwright/test';
import { VALID_USER } from '../../test-data/users';
import { authController } from '../../controllers/AuthController';

test.describe('Sign in and save storage state', () => {
  test('Valid user sign in and save storage state', async ({ request }) => {
    const signInResponse = await authController.signIn(
      request,
      VALID_USER.email,
      VALID_USER.password,
    );
    expect(signInResponse.status()).toBe(200);
    await request.storageState({ path: './test-data/states/user.json' });
  });
});
