import { Locator } from '@playwright/test';
import BasePage from '../BasePage';

class GaragePage extends BasePage {
  public readonly pageTitle: Locator = this.page.locator('h1');
  public readonly addCarButton: Locator = this.page.locator('.btn-primary');
  public readonly carList: Locator = this.page.locator('.car-list');
}

export default GaragePage;
