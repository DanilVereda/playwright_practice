import test, { expect } from '@playwright/test';

test.describe('Sign up form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('.btn-primary').click();
  });

  test.describe('Functional tests', () => {
    test('Success sign up', async ({ page }) => {
      await page.locator('#signupName').fill('Anatoliy');
      await page.locator('#signupLastName').fill('Ivanov');
      await page.locator('#signupEmail').fill(`aqamail+${Date.now()}@gmail.com`);
      await page.locator('#signupPassword').fill('Qwerty123');
      await page.locator('#signupRepeatPassword').fill('Qwerty123');
      await page.locator('app-signup-modal .btn-primary').click();
      await expect(page.locator('h1')).toHaveText('Garage');
    });

    test('Sign up with exist email', async ({ page }) => {
      await page.locator('#signupName').fill('Anatoliy');
      await page.locator('#signupLastName').fill('Ivanov');
      await page.locator('#signupEmail').fill('test1703@gmail.com');
      await page.locator('#signupPassword').fill('Qwerty123');
      await page.locator('#signupRepeatPassword').fill('Qwerty123');
      await page.locator('app-signup-modal .btn-primary').click();
      await expect(page.locator('.alert-danger')).toHaveText('User already exists');
    });

    test('Success sign up, log out and sign in', async ({ page }) => {
      let email = `aqamail+${Date.now()}@gmail.com`;
      await page.locator('#signupName').fill('Anatoliy');
      await page.locator('#signupLastName').fill('Ivanov');
      await page.locator('#signupEmail').fill(email);
      await page.locator('#signupPassword').fill('Qwerty123');
      await page.locator('#signupRepeatPassword').fill('Qwerty123');
      await page.locator('app-signup-modal .btn-primary').click();
      await expect(page.locator('h1')).toHaveText('Garage');
      await page.locator('.text-danger').click();
      await expect(page.locator('h1')).toHaveText('Do more!');
      await page.locator('.header_signin').click();
      await page.locator('#signinEmail').fill(email);
      await page.locator('#signinPassword').fill('Qwerty123');
      await page.locator('.modal-content .btn-primary').click();
      await expect(page.locator('h1')).toHaveText('Garage');
    });

    test('Check element of pop-up', async ({ page }) => {
      await expect(page.locator('.modal-title')).toHaveText('Registration');
      await expect(page.locator('.close')).toBeVisible();
      await expect(page.locator('.modal-content .btn-primary')).toBeDisabled();
    });
  });

  test.describe('Validation tests', () => {
    test.describe('Name field', () => {
      test('Empty Name field', async ({ page }) => {
        await page.locator('#signupName').focus();
        await page.locator('#signupName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Name is required');
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });
      test('Name is less than 2 symbols', async ({ page }) => {
        await page.locator('#signupName').fill('A');
        await page.locator('#signupName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText(
          'Name has to be from 2 to 20 characters long',
        );
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Name is more than 20 symbols', async ({ page }) => {
        await page.locator('#signupName').fill('AnatoliyTrubinGoalKeeper');
        await page.locator('#signupName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText(
          'Name has to be from 2 to 20 characters long',
        );
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Name is non-latin symbol', async ({ page }) => {
        await page.locator('#signupName').fill('Анна');
        await page.locator('#signupName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Name is invalid');
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Name with numbers', async ({ page }) => {
        await page.locator('#signupName').fill('Anna234');
        await page.locator('#signupName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Name is invalid');
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Name with special symbols', async ({ page }) => {
        await page.locator('#signupName').fill('Anna!"№;%:?*');
        await page.locator('#signupName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Name is invalid');
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Name with only spaces', async ({ page }) => {
        await page.locator('#signupName').fill('    ');
        await page.locator('#signupName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Name is invalid');
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Name consisting with two words', async ({ page }) => {
        await page.locator('#signupName').fill('Lily-Grace');
        await page.locator('#signupName').blur();
        await expect(page.locator('.invalid-feedback')).not.toBeVisible();
      });

      test('Check trim function for Name field', async ({ page }) => {
        await page.locator('#signupName').fill('David   ');
        await page.locator('#signupName').blur();
        await expect(page.locator('#signupName')).toHaveValue('David');
        await expect(page.locator('.invalid-feedback')).not.toBeVisible();
      });
    });

    test.describe('Last name field', () => {
      test('Empty Last name field', async ({ page }) => {
        await page.locator('#signupLastName').focus();
        await page.locator('#signupLastName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Last name is required');
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });
      test('Last name is less than 2 symbols', async ({ page }) => {
        await page.locator('#signupLastName').fill('A');
        await page.locator('#signupLastName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText(
          'Last name has to be from 2 to 20 characters long',
        );
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Last name is more than 20 symbols', async ({ page }) => {
        await page.locator('#signupLastName').fill('AnatoliyTrubinGoalKeeper');
        await page.locator('#signupLastName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText(
          'Last name has to be from 2 to 20 characters long',
        );
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Last name is non-latin symbol', async ({ page }) => {
        await page.locator('#signupLastName').fill('Анна');
        await page.locator('#signupLastName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Last name is invalid');
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Last name with numbers', async ({ page }) => {
        await page.locator('#signupLastName').fill('Anna234');
        await page.locator('#signupLastName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Last name is invalid');
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Last name with special symbols', async ({ page }) => {
        await page.locator('#signupLastName').fill('Anna!"№;%:?*');
        await page.locator('#signupLastName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Last name is invalid');
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Last name with only spaces', async ({ page }) => {
        await page.locator('#signupLastName').fill('    ');
        await page.locator('#signupLastName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Last name is invalid');
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Last name consisting with two words', async ({ page }) => {
        await page.locator('#signupLastName').fill('Smith-Jones');
        await page.locator('#signupLastName').blur();
        await expect(page.locator('.invalid-feedback')).not.toBeVisible();
      });

      test('Check trim function for Last name field', async ({ page }) => {
        await page.locator('#signupLastName').fill('Smith   ');
        await page.locator('#signupLastName').blur();
        await expect(page.locator('#signupLastName')).toHaveValue('Smith');
        await expect(page.locator('.invalid-feedback')).not.toBeVisible();
      });
    });

    test.describe('Email field', () => {
      test('Empty email', async ({ page }) => {
        await page.locator('#signupEmail').focus();
        await page.locator('#signupEmail').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Email required');
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });
      test('Empty without @', async ({ page }) => {
        await page.locator('#signupEmail').fill('testgmail.com');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Email is incorrect');
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Email without post service part', async ({ page }) => {
        await page.locator('#signupEmail').fill('test@gmail.');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Email is incorrect');
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Email without dot', async ({ page }) => {
        await page.locator('#signupEmail').fill('test@gmailcom');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Email is incorrect');
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Email without domain part', async ({ page }) => {
        await page.locator('#signupEmail').fill('test@.com');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Email is incorrect');
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Email without username part', async ({ page }) => {
        await page.locator('#signupEmail').fill('@gmail.com');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Email is incorrect');
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Email with only spaces', async ({ page }) => {
        await page.locator('#signupEmail').fill('    ');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Email is incorrect');
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });
    });

    test.describe('Password field', () => {
      test('Empty password', async ({ page }) => {
        await page.locator('#signupPassword').focus();
        await page.locator('#signupPassword').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Password required');
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });
      test('Password is less than 8 symbols', async ({ page }) => {
        await page.locator('#signupPassword').fill('Qwerty1');
        await page.locator('#signupPassword').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText(
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Password is more than 15 symbols', async ({ page }) => {
        await page.locator('#signupPassword').fill('Qwerty123Qwerty123');
        await page.locator('#signupPassword').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText(
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Password without integer', async ({ page }) => {
        await page.locator('#signupPassword').fill('Qwertyqwe');
        await page.locator('#signupPassword').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText(
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Password without small letter', async ({ page }) => {
        await page.locator('#signupPassword').fill('QWERTY123');
        await page.locator('#signupPassword').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText(
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Password without capital letter', async ({ page }) => {
        await page.locator('#signupPassword').fill('qwerty123');
        await page.locator('#signupPassword').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText(
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Password with only spaces', async ({ page }) => {
        await page.locator('#signupPassword').fill('    ');
        await page.locator('#signupPassword').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText(
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });
    });

    test.describe('Re-enter password field', () => {
      test.beforeEach(async ({ page }) => {
        await page.locator('#signupPassword').fill('Qwerty123');
        await page.locator('#signupPassword').blur();
      });

      test('Empty re-enter password', async ({ page }) => {
        await page.locator('#signupRepeatPassword').focus();
        await page.locator('#signupRepeatPassword').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Re-enter password required');
        await expect(page.locator('#signupRepeatPassword')).toHaveCSS(
          'border-color',
          'rgb(220, 53, 69)',
        );
      });
      test('Re-enter password do not match', async ({ page }) => {
        await page.locator('#signupRepeatPassword').fill('Qwerty1234');
        await page.locator('#signupRepeatPassword').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Passwords do not match');
        await expect(page.locator('#signupRepeatPassword')).toHaveCSS(
          'border-color',
          'rgb(220, 53, 69)',
        );
      });
    });
  });
});
