import { Locator } from '@playwright/test';
import BasePage from '../BasePage';

class SignUpForm extends BasePage {
  public readonly formTitle: Locator = this.page.locator('.modal-title');
  public readonly nameField: Locator = this.page.locator('#signupName');
  public readonly lastNameField: Locator = this.page.locator('#signupLastName');
  public readonly emailField: Locator = this.page.locator('#signupEmail');
  public readonly passwordField: Locator = this.page.locator('#signupPassword');
  public readonly repeatPasswordField: Locator = this.page.locator('#signupRepeatPassword');
  public readonly registerButton: Locator = this.page.locator('app-signup-modal .btn-primary');
  public readonly errorMessage: Locator = this.page.locator('.alert-danger');
  public readonly validationErrorMessage: Locator = this.page.locator('div.invalid-feedback p');
  public readonly closeButton: Locator = this.page.locator('button.close');

  async signUp(
    name: string,
    lastName: string,
    email: string,
    password: string,
    repeatPassword: string,
  ) {
    await this.nameField.fill(name);
    await this.lastNameField.fill(lastName);
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.repeatPasswordField.fill(repeatPassword);
    await this.registerButton.click();
  }

  async triggerEmptyFieldValidation(field: Locator) {
    await field.focus();
    await field.blur();
  }
  async triggerValidationErrorMessage(field: Locator, value: string) {
    await field.fill(value);
    await field.blur();
  }

  async closeForm() {
    await this.closeButton.click();
  }
}

export default SignUpForm;
