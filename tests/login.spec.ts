import { expect, test } from '@playwright/test';
import LoginPage from '../src/LoginPage';
import data from '../data.json';


let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await page.goto(data.baseUrl);
});

test.only('Verify user login successfully', async ({ page }) => {
  await loginPage.login(data.validEmail, data.validPassword);
  await expect(page).toHaveTitle(data.myAccountPageTitle);
});

test('Verify user login with invalid credentials', async ({ page }) => {
  await loginPage.login(data.invalidEmail, data.invalidPassword);
  await expect(page.getByText('Warning: No match for E-Mail Address and/or Password.')).toBeVisible();
});