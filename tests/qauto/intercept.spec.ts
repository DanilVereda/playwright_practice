import { expect } from '@playwright/test';
import { test } from '../../utils/fixtures/app';

test.describe('Intercept request', () => {
  test.beforeEach(async ({ app }) => {
    await app.garagePage.open();
  });

  test('Replace profile name', async ({ page, app }) => {
    const mockResponse = {
      status: 'ok',
      data: {
        userId: 335824,
        photoFilename: 'default-user.png',
        name: 'Polar',
        lastName: 'Bear',
      },
    };

    // Перехватываем GET запрос и подменяем ответ ДО навигации
    await page.route('**/api/users/profile', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponse),
      });
    });

    await expect(app.garagePage.pageTitle).toContainText('Garage');
    await app.sidebar.navigateToProfilePage();
    await expect(app.profilePage.pageTitle).toContainText('Profile');
    await expect(app.profilePage.profileNameText).toContainText('Polar Bear');
  });
});
