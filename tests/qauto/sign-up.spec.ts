import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { SignUpValidationMessages } from '../../test-data/messages';
import { VALID_USER } from '../../test-data/users';
import { test } from '../../utils/fixtures/app';

test.describe('Sign up form', () => {
  test.beforeEach(async ({ app }) => {
    await app.homePage.open();
    await app.homePage.openSignUpForm();
  });

  test.describe('Functional tests', () => {
    test('Success sign up', async ({ app }) => {
      await app.signUpForm.signUp(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.internet.email(),
        'Qwerty123',
        'Qwerty123',
      );
      await expect(app.garagePage.pageTitle).toHaveText('Garage');
    });

    test('Sign up with exist email', async ({ app }) => {
      await app.signUpForm.signUp(
        faker.person.firstName(),
        faker.person.lastName(),
        VALID_USER.email,
        'Qwerty123',
        'Qwerty123',
      );
      await expect(app.signUpForm.errorMessage).toHaveText(
        SignUpValidationMessages.userAlreadyExists,
      );
    });

    test('Success sign up, log out and sign in', async ({ app }) => {
      let email = faker.internet.email();
      await app.signUpForm.signUp(
        faker.person.firstName(),
        faker.person.lastName(),
        email,
        'Qwerty123',
        'Qwerty123',
      );
      await expect(app.garagePage.pageTitle).toHaveText('Garage');
      await app.sidebar.logout();
      await expect(app.homePage.pageHeader).toHaveText('Do more!');
      await app.homePage.openSignInForm();
      await app.signInForm.signIn(email, 'Qwerty123');
      await expect(app.garagePage.pageTitle).toHaveText('Garage');
    });

    test('Check element of pop-up', async ({ app }) => {
      await expect(app.signUpForm.formTitle).toHaveText('Registration');
      await expect(app.signUpForm.closeButton).toBeVisible();
      await expect(app.signUpForm.registerButton).toBeDisabled();
    });
  });

  test.describe('Validation tests', () => {
    test.describe('Name field', () => {
      test('Empty Name field', async ({ app }) => {
        await app.signUpForm.triggerEmptyFieldValidation(app.signUpForm.nameField);
        await expect(app.signUpForm.validationErrorMessage).toHaveText('Name is required');
        await expect(app.signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });
      test('Name is less than 2 symbols', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(app.signUpForm.nameField, 'A');
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidLengthName,
        );
        await expect(app.signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Name is more than 20 symbols', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(
          app.signUpForm.nameField,
          'AnatoliyTrubinGoalKeeper',
        );
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidLengthName,
        );
        await expect(app.signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Name is non-latin symbol', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(app.signUpForm.nameField, 'Анна');
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidName,
        );
        await expect(app.signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Name with numbers', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(app.signUpForm.nameField, 'Anna234');
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidName,
        );
        await expect(app.signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Name with special symbols', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(
          app.signUpForm.nameField,
          'Anna!"№;%:?*',
        );
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidName,
        );
        await expect(app.signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Name with only spaces', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(app.signUpForm.nameField, '    ');
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidName,
        );
        await expect(app.signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Name consisting with two words', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(app.signUpForm.nameField, 'Lily-Grace');
        await expect(app.signUpForm.validationErrorMessage).toBeHidden();
      });

      test('Check trim function for Name field', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(app.signUpForm.nameField, 'David   ');
        await expect(app.signUpForm.nameField).toHaveValue('David');
        await expect(app.signUpForm.validationErrorMessage).toBeHidden();
      });
    });

    test.describe('Last name field', () => {
      test('Empty Last name field', async ({ app }) => {
        await app.signUpForm.triggerEmptyFieldValidation(app.signUpForm.lastNameField);
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.emptyLastName,
        );
        await expect(app.signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });
      test('Last name is less than 2 symbols', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(app.signUpForm.lastNameField, 'A');
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidLengthLastName,
        );
        await expect(app.signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Last name is more than 20 symbols', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(
          app.signUpForm.lastNameField,
          'AnatoliyTrubinGoalKeeper',
        );
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidLengthLastName,
        );
        await expect(app.signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Last name is non-latin symbol', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(app.signUpForm.lastNameField, 'Анна');
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidLastName,
        );
        await expect(app.signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Last name with numbers', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(app.signUpForm.lastNameField, 'Anna234');
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidLastName,
        );
        await expect(app.signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Last name with special symbols', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(
          app.signUpForm.lastNameField,
          'Anna!"№;%:?*',
        );
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidLastName,
        );
        await expect(app.signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Last name with only spaces', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(app.signUpForm.lastNameField, '    ');
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidLastName,
        );
        await expect(app.signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Last name consisting with two words', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(
          app.signUpForm.lastNameField,
          'Smith-Jones',
        );
        await expect(app.signUpForm.validationErrorMessage).toBeHidden();
      });

      test('Check trim function for Last name field', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(
          app.signUpForm.lastNameField,
          'Smith   ',
        );
        await expect(app.signUpForm.lastNameField).toHaveValue('Smith');
        await expect(app.signUpForm.validationErrorMessage).toBeHidden();
      });
    });

    test.describe('Email field', () => {
      test('Empty email', async ({ app }) => {
        await app.signUpForm.triggerEmptyFieldValidation(app.signUpForm.emailField);
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.emptyEmail,
        );
        await expect(app.signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });
      test('Empty without @', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(
          app.signUpForm.emailField,
          'testgmail.com',
        );
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidEmail,
        );
        await expect(app.signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Email without post service part', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(
          app.signUpForm.emailField,
          'test@gmail.',
        );
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidEmail,
        );
        await expect(app.signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Email without dot', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(
          app.signUpForm.emailField,
          'test@gmailcom',
        );
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidEmail,
        );
        await expect(app.signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Email without domain part', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(app.signUpForm.emailField, 'test@.com');
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidEmail,
        );
        await expect(app.signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Email without username part', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(app.signUpForm.emailField, '@gmail.com');
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidEmail,
        );
        await expect(app.signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Email with only spaces', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(app.signUpForm.emailField, '    ');
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidEmail,
        );
        await expect(app.signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });
    });

    test.describe('Password field', () => {
      test('Empty password', async ({ app }) => {
        await app.signUpForm.triggerEmptyFieldValidation(app.signUpForm.passwordField);
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.emptyPassword,
        );
        await expect(app.signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });
      test('Password is less than 8 symbols', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(app.signUpForm.passwordField, 'Qwerty1');
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidPassword,
        );
        await expect(app.signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Password is more than 15 symbols', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(
          app.signUpForm.passwordField,
          'Qwerty123Qwerty123',
        );
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidPassword,
        );
        await expect(app.signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Password without integer', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(
          app.signUpForm.passwordField,
          'Qwertyqwe',
        );
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidPassword,
        );
        await expect(app.signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Password without small letter', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(
          app.signUpForm.passwordField,
          'QWERTY123',
        );
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidPassword,
        );
        await expect(app.signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Password without capital letter', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(
          app.signUpForm.passwordField,
          'qwerty123',
        );
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidPassword,
        );
        await expect(app.signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Password with only spaces', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(app.signUpForm.passwordField, '    ');
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidPassword,
        );
        await expect(app.signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });
    });

    test.describe('Re-enter password field', () => {
      test.beforeEach(async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(
          app.signUpForm.passwordField,
          'Qwerty123',
        );
      });

      test('Empty re-enter password', async ({ app }) => {
        await app.signUpForm.triggerEmptyFieldValidation(app.signUpForm.repeatPasswordField);
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.emptyRepeatPassword,
        );
        await expect(app.signUpForm.repeatPasswordField).toHaveCSS(
          'border-color',
          'rgb(220, 53, 69)',
        );
      });
      test('Re-enter password do not match', async ({ app }) => {
        await app.signUpForm.triggerValidationErrorMessage(
          app.signUpForm.repeatPasswordField,
          'Qwerty1234',
        );
        await expect(app.signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.passwordMismatch,
        );
        await expect(app.signUpForm.repeatPasswordField).toHaveCSS(
          'border-color',
          'rgb(220, 53, 69)',
        );
      });
    });
  });
});
