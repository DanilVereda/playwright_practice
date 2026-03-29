import { expect } from '@playwright/test';
import BasePage from '../BasePage';

class GaragePage extends BasePage {
  public readonly pageTitle = this.page.locator('h1', { hasText: 'Garage' });
  public readonly addCarButton = this.page.locator('button', { hasText: 'Add car' });
  public readonly lastAddedCar = this.page.locator('.car-item').first();
  public readonly removeCarButton = this.page.locator('.btn-outline-danger');
  public readonly confirmRemoveButton = this.page.locator('.btn-danger');
  public readonly successRemoveAlert = this.page.locator('.alert-success p', {
    hasText: 'Car removed',
  });

  async open() {
    await this.page.goto('/panel/garage');
  }

  async verifyLastAddedCar(carName: string, mileage: string) {
    await expect(this.page.locator('.car_name')).toHaveText(carName);
    await expect(this.page.locator('[name="miles"]')).toHaveValue(mileage);
  }

  async removeLastAddedCar() {
    await this.lastAddedCar.locator('.icon-edit').click();
    await this.removeCarButton.click();
    await this.confirmRemoveButton.click();
    await expect(this.successRemoveAlert).toBeVisible();
  }
}

export default GaragePage;
