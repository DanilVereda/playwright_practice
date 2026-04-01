import { Locator } from '@playwright/test';
import BasePage from '../BasePage';

class ProfilePage extends BasePage {
  public readonly pageTitle: Locator = this.page.locator('h1:has-text("Profile")');
  public readonly editProfileButton: Locator = this.page.locator(
    '.panel-page_heading .btn-primary',
  );
  public readonly profileNameText: Locator = this.page.locator('.profile_name');
}

export default ProfilePage;
