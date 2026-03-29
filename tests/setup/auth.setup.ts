import test, { expect } from '@playwright/test';
import HomePage from '../../pom/pages/HomePage';
import SignInForm from '../../pom/forms/SignInForm';
import GaragePage from '../../pom/pages/GaragePage';
import { VALID_USER } from '../../test-data/users';

test.describe('Sign in and save storage state', () => {
  let homePage: HomePage;
  let signInForm: SignInForm;
  let garagePage: GaragePage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signInForm = new SignInForm(page);
    garagePage = new GaragePage(page);

    await homePage.open();
    await homePage.signInButton.click();
  });

  test('Valid user sign in and save storage state', async ({ page }) => {
    await signInForm.signIn(VALID_USER.email, VALID_USER.password);
    await expect(garagePage.pageTitle).toBeVisible();
    await page.context().storageState({ path: './test-data/states/validUserStorageState.json' });
  });
});
