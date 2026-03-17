import { expect, test } from '@playwright/test';
import LoginPage from '../src/LoginPage';
import data from '../data.json';
import RegistrationPage from '../src/RegistrationPage';

let loginPage: LoginPage;
let registrationPage: RegistrationPage;

test.beforeEach(async ({ page }) => {
  registrationPage = new RegistrationPage(page);
  await page.goto(data.baseUrl);
});

test('Verify user registration', async ({ page }) => {
    await registrationPage.registerUser();  
    await expect(page.getByText('Account Created Successfully')).toBeVisible();
});

test('Verify user registration with empty details', async ({ page }) => {
    await registrationPage.registerUserWitEmptyDetails();  
    await expect(page.getByText('*First Name is required')).toBeVisible();
    await expect(page.getByText('*Email is required')).toBeVisible();
    await expect(page.getByText('*Phone Number is required')).toBeVisible();
    await expect(page.getByText('*Password is required')).toBeVisible();   
    await expect(page.getByText('Confirm Password is required')).toBeVisible(); 
    await expect(page.getByText('*Please check above checkbox')).toBeVisible();
});

test.only('Verify user registration with already used email', async ({ page }) => {
    await registrationPage.registerUserWithSameEmail();  
    await expect(page.getByText('User already exists with this Email Id')).toBeVisible();
});