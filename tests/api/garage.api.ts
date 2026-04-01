import test, { expect } from '@playwright/test';
import { getSidForUser } from '../../utils/api/storage-state';
import { garageController } from '../../controllers/GarageController';

test.describe('Garage API tests - GET operations', () => {
  test('Get all brands', async ({ request }) => {
    const response = await garageController.getAllBrands(request);
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.data).toHaveLength(5);
  });

  test('Get all models', async ({ request }) => {
    const response = await garageController.getAllModels(request);
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.data).toHaveLength(23);
  });

  test('Get user cars', async ({ request }) => {
    const response = await garageController.getUserCars(request, getSidForUser('user'));
    expect(response.status()).toBe(200);
  });
});

test.describe(' Garage API tests - Manage operations', () => {
  let carId: number;
  test('Add a car', async ({ request }) => {
    const response = await garageController.addCar(request, getSidForUser('user'), 3, 12, 260550);
    const responseBody = await response.json();
    carId = responseBody.data.id;
    expect(response.status()).toBe(201);
    expect(responseBody.data.carBrandId).toBe(3);
    expect(responseBody.data.carModelId).toBe(12);
    expect(responseBody.data.mileage).toBe(260550);
    expect(responseBody.data.brand).toBe('Ford');
    expect(responseBody.data.model).toBe('Focus');
  });
  test('Edit a car', async ({ request }) => {
    const response = await garageController.editCar(
      request,
      getSidForUser('user'),
      3,
      13,
      280550,
      carId,
    );
    const responseBody = await response.json();
    carId = responseBody.data.id;
    expect(response.status()).toBe(200);
    expect(responseBody.data.carBrandId).toBe(3);
    expect(responseBody.data.carModelId).toBe(13);
    expect(responseBody.data.mileage).toBe(280550);
    expect(responseBody.data.brand).toBe('Ford');
    expect(responseBody.data.model).toBe('Fusion');
  });
  test('Delete a car', async ({ request }) => {
    const response = await garageController.removeCar(request, getSidForUser('user'), carId);
    expect(response.status()).toBe(200);
  });
});

test.describe('Garage API - Error handling', () => {
  test('Add car with invalid brand ID', async ({ request }) => {
    const response = await garageController.addCar(request, getSidForUser('user'), 999, 12, 260550);
    expect(response.status()).toBe(404);
  });

  test('Add car with invalid model ID', async ({ request }) => {
    const response = await garageController.addCar(request, getSidForUser('user'), 3, 999, 260550);
    expect(response.status()).toBe(404);
  });

  test('Add car with negative mileage', async ({ request }) => {
    const response = await garageController.addCar(request, getSidForUser('user'), 3, 12, -100);
    expect(response.status()).toBe(400);
  });

  test('Get user cars without auth', async ({ request }) => {
    const response = await request.get('/api/cars');
    expect(response.status()).toBe(401);
  });

  test('Delete non-existent car', async ({ request }) => {
    const response = await garageController.removeCar(request, getSidForUser('user'), 99999);
    expect(response.status()).toBe(404);
  });

  test('Edit non-existent car', async ({ request }) => {
    const response = await garageController.editCar(
      request,
      getSidForUser('user'),
      3,
      12,
      280550,
      99999,
    );
    expect(response.status()).toBe(404);
  });
});
