import { Locator } from '@playwright/test';
import BasePage from '../BasePage';

class ForgotPasswordForm extends BasePage {
  public readonly formTitle: Locator = this.page.getByRole('heading', { name: 'Restore access' });
}

export default ForgotPasswordForm;
