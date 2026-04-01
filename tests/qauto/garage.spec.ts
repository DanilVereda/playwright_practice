import { faker } from '@faker-js/faker';
import { test } from '../../utils/fixtures/app';

test.describe('Garage page', () => {
  test.beforeEach(async ({ app }) => {
    await app.garagePage.open();
  });

  test.describe('Adding cars', () => {
    test.afterEach(async ({ app }) => {
      await app.garagePage.removeLastAddedCar();
    });

    test('Add Audi Q7', async ({ app }) => {
      let mileage = String(faker.number.int({ min: 1000, max: 50000 }));
      await app.garagePage.addCarButton.click();
      await app.addCarForm.addCar('Audi', 'Q7', mileage);
      await app.garagePage.verifyLastAddedCar('Audi Q7', mileage);
    });

    test('Add BMW X5', async ({ app }) => {
      let mileage = String(faker.number.int({ min: 1000, max: 50000 }));
      await app.garagePage.addCarButton.click();
      await app.addCarForm.addCar('BMW', 'X5', mileage);
      await app.garagePage.verifyLastAddedCar('BMW X5', mileage);
    });

    test('Add Ford Focus', async ({ app }) => {
      let mileage = String(faker.number.int({ min: 1000, max: 50000 }));
      await app.garagePage.addCarButton.click();
      await app.addCarForm.addCar('Ford', 'Focus', mileage);
      await app.garagePage.verifyLastAddedCar('Ford Focus', mileage);
    });

    test('Add Porsche Panamera', async ({ app }) => {
      let mileage = String(faker.number.int({ min: 1000, max: 50000 }));
      await app.garagePage.addCarButton.click();
      await app.addCarForm.addCar('Porsche', 'Panamera', mileage);
      await app.garagePage.verifyLastAddedCar('Porsche Panamera', mileage);
    });

    test('Add Fiat Panda', async ({ app }) => {
      let mileage = String(faker.number.int({ min: 1000, max: 50000 }));
      await app.garagePage.addCarButton.click();
      await app.addCarForm.addCar('Fiat', 'Panda', mileage);
      await app.garagePage.verifyLastAddedCar('Fiat Panda', mileage);
    });
  });
});
