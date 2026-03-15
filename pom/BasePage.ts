import { Page } from '@playwright/test';

class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}

export default BasePage;
