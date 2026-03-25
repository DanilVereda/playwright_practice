import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import HomePage from '../../pom/pages/HomePage';
import SignInForm from '../../pom/forms/SignInForm';
import GaragePage from '../../pom/pages/GaragePage';
import AddCarForm from '../../pom/forms/AddCarForm';
import { VALID_USER } from '../../test-data/users';
import { test } from '../../utils/fixtures/userGaragePage';

test.describe('Garage page', () => {
  // test.use({ storageState: './test-data/states/validUserStorageState.json' });

  let garagePage: GaragePage;
  let addCarForm: AddCarForm;
  // let homePage: HomePage;
  // let signInForm: SignInForm;

  test.beforeEach(async ({ page }) => {
    garagePage = new GaragePage(page);
    addCarForm = new AddCarForm(page);
    // homePage = new HomePage(page);
    // signInForm = new SignInForm(page);

    // await homePage.open();
    // await homePage.signInButton.click();
    // await signInForm.signIn(VALID_USER.email, VALID_USER.password);
    // await expect(garagePage.pageTitle).toBeVisible();
    await garagePage.open();
  });

  test.describe('Adding cars', () => {
    test.afterEach(async () => {
      await garagePage.removeLastAddedCar();
    });

    test('Add Audi Q7', async ({ userGaragePage }) => {
      let mileage = String(faker.number.int({ min: 1000, max: 50000 }));
      await userGaragePage.addCarButton.click();
      await addCarForm.addCar('Audi', 'Q7', mileage);
      await userGaragePage.verifyLastAddedCar('Audi Q7', mileage);
    });

    test('Add BMW X5', async ({ userGaragePage }) => {
      let mileage = String(faker.number.int({ min: 1000, max: 50000 }));
      await userGaragePage.addCarButton.click();
      await addCarForm.addCar('BMW', 'X5', mileage);
      await userGaragePage.verifyLastAddedCar('BMW X5', mileage);
    });

    test('Add Ford Focus', async ({ userGaragePage }) => {
      let mileage = String(faker.number.int({ min: 1000, max: 50000 }));
      await userGaragePage.addCarButton.click();
      await addCarForm.addCar('Ford', 'Focus', mileage);
      await userGaragePage.verifyLastAddedCar('Ford Focus', mileage);
    });

    test('Add Porsche Panamera', async ({ userGaragePage }) => {
      let mileage = String(faker.number.int({ min: 1000, max: 50000 }));
      await userGaragePage.addCarButton.click();
      await addCarForm.addCar('Porsche', 'Panamera', mileage);
      await userGaragePage.verifyLastAddedCar('Porsche Panamera', mileage);
    });

    test('Add Fiat Panda', async ({ userGaragePage }) => {
      let mileage = String(faker.number.int({ min: 1000, max: 50000 }));
      await userGaragePage.addCarButton.click();
      await addCarForm.addCar('Fiat', 'Panda', mileage);
      await userGaragePage.verifyLastAddedCar('Fiat Panda', mileage);
    });
  });
});
