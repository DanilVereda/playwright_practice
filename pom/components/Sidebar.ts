import { Locator } from '@playwright/test';
import BasePage from '../BasePage';

class Sidebar extends BasePage {
  public readonly garageButton: Locator = this.page.locator('.sidebar a[routerlink="garage"]');
  public readonly fuelExpensesButton: Locator = this.page.locator(
    '.sidebar a[routerlink="expenses"]',
  );
  public readonly instructionsButton: Locator = this.page.locator(
    '.sidebar a[routerlink="instructions"]',
  );
  public readonly profileButton: Locator = this.page.locator('.sidebar a[routerlink="profile"]');
  public readonly settingsButton: Locator = this.page.locator('.sidebar a[routerlink="settings"]');
  public readonly logoutButton: Locator = this.page.locator('.text-danger');

  async navigateToGaragePage() {
    await this.garageButton.click();
  }

  async navigateToFuelExpensesPage() {
    await this.fuelExpensesButton.click();
  }

  async navigateToInstructionsPage() {
    await this.instructionsButton.click();
  }

  async navigateToProfilePage() {
    await this.profileButton.click();
  }

  async navigateToSettingsPage() {
    await this.settingsButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}

export default Sidebar;
