import { Locator } from '@playwright/test';
import BasePage from '../BasePage';

class SignInForm extends BasePage {
  public readonly formTitle: Locator = this.page.locator('.modal-title');
  public readonly emailField: Locator = this.page.locator('#signinEmail');
  public readonly passwordField: Locator = this.page.locator('#signinPassword');
  public readonly loginButton: Locator = this.page.locator('app-signin-modal .btn-primary');
  public readonly errorMessage: Locator = this.page.locator('.alert-danger');
  public readonly validationError: Locator = this.page.locator('div.invalid-feedback p');
  public readonly wrongDataError: Locator = this.page.locator('p.alert-danger');
  public readonly forgotPasswordLink: Locator = this.page.getByRole('button', {
    name: 'Forgot Password',
  });
  public readonly registrationLink: Locator = this.page.getByRole('button', {
    name: 'Registration',
  });
  public readonly closeButton: Locator = this.page.locator('button.close');

  async signIn(email: string, password: string) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async closeForm() {
    await this.closeButton.click();
  }
}

export default SignInForm;
