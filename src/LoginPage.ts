import { Page, expect } from '@playwright/test';
import BasePage from './BasePage';

export default class LoginPage extends BasePage {
    constructor(page: Page) {
    super(page);
  }

  readonly email = this.page.getByPlaceholder('E-Mail Address');
  readonly password = this.page.getByPlaceholder('Password');
  readonly loginButton = this.page.getByRole('button', { name: 'Login' });

  // Login method
  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
  }

}