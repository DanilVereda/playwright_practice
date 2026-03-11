import { Locator } from '@playwright/test';
import BasePage from '../BasePage';

class HomePage extends BasePage {
  public readonly signInButton: Locator = this.page.locator('.header_signin');
  public readonly signUpButton: Locator = this.page.locator('.btn-primary');
  public readonly pageHeader: Locator = this.page.locator('h1');

  async open() {
    await this.page.goto('/');
  }

  async openSignInForm() {
    await this.signInButton.click();
  }

  async openSignUpForm() {
    await this.signUpButton.click();
  }
}

export default HomePage;
