import BasePage from '../BasePage';

class AddCarForm extends BasePage {
  private readonly brandDropdown = this.page.getByLabel('Brand');
  private readonly modelDropdown = this.page.getByLabel('Model');
  private readonly mileageField = this.page.locator('#addCarMileage');
  private readonly addButton = this.page.getByRole('button', { name: 'Add' });

  public async addCar(brand: string, model: string, mileage: string) {
    await this.page.waitForTimeout(300);
    await this.brandDropdown.selectOption(brand);
    await this.modelDropdown.selectOption(model);
    await this.mileageField.fill(mileage);
    await this.addButton.click();
  }
}

export default AddCarForm;
