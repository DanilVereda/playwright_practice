import test, { expect } from '@playwright/test';
import SignInForm from '../../pom/forms/SignInForm';
import SignUpForm from '../../pom/forms/SignUpForm';
import HomePage from '../../pom/pages/HomePage';
import GaragePage from '../../pom/pages/GaragePage';
import { faker } from '@faker-js/faker';
import { SignUpValidationMessages } from '../../test-data/messages';
import { VALID_USER } from '../../test-data/users';
import Sidebar from '../../pom/components/SideBar';

test.describe('Sign up form', () => {
  let homePage: HomePage;
  let signUpForm: SignUpForm;
  let signInForm: SignInForm;
  let garagePage: GaragePage;
  let sidebar: Sidebar;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signUpForm = new SignUpForm(page);
    signInForm = new SignInForm(page);
    garagePage = new GaragePage(page);
    sidebar = new Sidebar(page);
    await homePage.open();
    await homePage.openSignUpForm();
  });

  test.describe('Functional tests', () => {
    test('Success sign up', async () => {
      await signUpForm.signUp(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.internet.email(),
        'Qwerty123',
        'Qwerty123',
      );
      await expect(garagePage.pageTitle).toHaveText('Garage');
    });

    test('Sign up with exist email', async () => {
      await signUpForm.signUp(
        faker.person.firstName(),
        faker.person.lastName(),
        VALID_USER.email,
        'Qwerty123',
        'Qwerty123',
      );
      await expect(signUpForm.errorMessage).toHaveText(SignUpValidationMessages.userAlreadyExists);
    });

    test('Success sign up, log out and sign in', async () => {
      let email = faker.internet.email();
      await signUpForm.signUp(
        faker.person.firstName(),
        faker.person.lastName(),
        email,
        'Qwerty123',
        'Qwerty123',
      );
      await expect(garagePage.pageTitle).toHaveText('Garage');
      await sidebar.logout();
      await expect(homePage.pageHeader).toHaveText('Do more!');
      await homePage.openSignInForm();
      await signInForm.signIn(email, 'Qwerty123');
      await expect(garagePage.pageTitle).toHaveText('Garage');
    });

    test('Check element of pop-up', async () => {
      await expect(signUpForm.formTitle).toHaveText('Registration');
      await expect(signUpForm.closeButton).toBeVisible();
      await expect(signUpForm.registerButton).toBeDisabled();
    });
  });

  test.describe('Validation tests', () => {
    test.describe('Name field', () => {
      test('Empty Name field', async () => {
        await signUpForm.triggerEmptyFieldValidation(signUpForm.nameField);
        await expect(signUpForm.validationErrorMessage).toHaveText('Name is required');
        await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });
      test('Name is less than 2 symbols', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.nameField, 'A');
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidLengthName,
        );
        await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Name is more than 20 symbols', async () => {
        await signUpForm.triggerValidationErrorMessage(
          signUpForm.nameField,
          'AnatoliyTrubinGoalKeeper',
        );
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidLengthName,
        );
        await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Name is non-latin symbol', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.nameField, 'Анна');
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidName,
        );
        await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Name with numbers', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.nameField, 'Anna234');
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidName,
        );
        await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Name with special symbols', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.nameField, 'Anna!"№;%:?*');
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidName,
        );
        await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Name with only spaces', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.nameField, '    ');
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidName,
        );
        await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Name consisting with two words', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.nameField, 'Lily-Grace');
        await expect(signUpForm.validationErrorMessage).toBeHidden();
      });

      test('Check trim function for Name field', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.nameField, 'David   ');
        await expect(signUpForm.nameField).toHaveValue('David');
        await expect(signUpForm.validationErrorMessage).toBeHidden();
      });
    });

    test.describe('Last name field', () => {
      test('Empty Last name field', async () => {
        await signUpForm.triggerEmptyFieldValidation(signUpForm.lastNameField);
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.emptyLastName,
        );
        await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });
      test('Last name is less than 2 symbols', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.lastNameField, 'A');
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidLengthLastName,
        );
        await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Last name is more than 20 symbols', async () => {
        await signUpForm.triggerValidationErrorMessage(
          signUpForm.lastNameField,
          'AnatoliyTrubinGoalKeeper',
        );
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidLengthLastName,
        );
        await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Last name is non-latin symbol', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.lastNameField, 'Анна');
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidLastName,
        );
        await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Last name with numbers', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.lastNameField, 'Anna234');
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidLastName,
        );
        await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Last name with special symbols', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.lastNameField, 'Anna!"№;%:?*');
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidLastName,
        );
        await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Last name with only spaces', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.lastNameField, '    ');
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidLastName,
        );
        await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Last name consisting with two words', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.lastNameField, 'Smith-Jones');
        await expect(signUpForm.validationErrorMessage).toBeHidden();
      });

      test('Check trim function for Last name field', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.lastNameField, 'Smith   ');
        await expect(signUpForm.lastNameField).toHaveValue('Smith');
        await expect(signUpForm.validationErrorMessage).toBeHidden();
      });
    });

    test.describe('Email field', () => {
      test('Empty email', async () => {
        await signUpForm.triggerEmptyFieldValidation(signUpForm.emailField);
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.emptyEmail,
        );
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });
      test('Empty without @', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.emailField, 'testgmail.com');
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidEmail,
        );
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Email without post service part', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.emailField, 'test@gmail.');
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidEmail,
        );
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Email without dot', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.emailField, 'test@gmailcom');
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidEmail,
        );
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Email without domain part', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.emailField, 'test@.com');
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidEmail,
        );
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Email without username part', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.emailField, '@gmail.com');
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidEmail,
        );
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Email with only spaces', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.emailField, '    ');
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidEmail,
        );
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });
    });

    test.describe('Password field', () => {
      test('Empty password', async () => {
        await signUpForm.triggerEmptyFieldValidation(signUpForm.passwordField);
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.emptyPassword,
        );
        await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });
      test('Password is less than 8 symbols', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.passwordField, 'Qwerty1');
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidPassword,
        );
        await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Password is more than 15 symbols', async () => {
        await signUpForm.triggerValidationErrorMessage(
          signUpForm.passwordField,
          'Qwerty123Qwerty123',
        );
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidPassword,
        );
        await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Password without integer', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.passwordField, 'Qwertyqwe');
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidPassword,
        );
        await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Password without small letter', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.passwordField, 'QWERTY123');
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidPassword,
        );
        await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Password without capital letter', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.passwordField, 'qwerty123');
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidPassword,
        );
        await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });

      test('Password with only spaces', async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.passwordField, '    ');
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.invalidPassword,
        );
        await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });
    });

    test.describe('Re-enter password field', () => {
      test.beforeEach(async () => {
        await signUpForm.triggerValidationErrorMessage(signUpForm.passwordField, 'Qwerty123');
      });

      test('Empty re-enter password', async () => {
        await signUpForm.triggerEmptyFieldValidation(signUpForm.repeatPasswordField);
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.emptyRepeatPassword,
        );
        await expect(signUpForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });
      test('Re-enter password do not match', async () => {
        await signUpForm.triggerValidationErrorMessage(
          signUpForm.repeatPasswordField,
          'Qwerty1234',
        );
        await expect(signUpForm.validationErrorMessage).toHaveText(
          SignUpValidationMessages.passwordMismatch,
        );
        await expect(signUpForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      });
    });
  });
});
