import { Page, expect } from '@playwright/test';
import BasePage from './BasePage';
import { fakerEN_IN } from '@faker-js/faker';
import data from '../data.json';

export default class RegistrationPage extends BasePage {
    constructor(page: Page) {
    super(page);
  }

  readonly firstName = fakerEN_IN.person.firstName();
  readonly lastName = fakerEN_IN.person.lastName();
  readonly email = fakerEN_IN.internet.email();
  readonly mobileNo = fakerEN_IN.number.int({ min: 6000000000, max: 9999999999 }).toString();
  readonly password = fakerEN_IN.internet.password({length: 10, memorable: false, pattern: /[A-Za-z0-9]/,});

  // Register user with valid details
  async registerUser() {
  await this.page.fill("#firstName",this.firstName);
  await this.page.fill("#lastName",this.lastName);
  await this.page.fill("[placeholder='email@example.com']",this.email);
  await this.page.fill("#userMobile",this.mobileNo);
  await this.page.locator("//select[@class='custom-select ng-untouched ng-pristine ng-valid']").selectOption("Engineer");
  await this.page.locator("[value='Male']").click();
  await this.page.fill('#userPassword', this.password);
  await this.page.fill('#confirmPassword', this.password);
  await this.page.locator("[type='checkbox']").click();
  await this.page.locator("input#login").click();
}

// Register user with empty details
  async registerUserWitEmptyDetails() {
  await this.page.fill("#firstName",'');
  await this.page.fill("[placeholder='email@example.com']", '');
  await this.page.fill("#userMobile",'');
  await this.page.fill('#userPassword', '');
  await this.page.fill('#confirmPassword', '');
  await this.page.locator("input#login").click();
}

// Registration using same email-id
async registerUserWithSameEmail() {
  await this.page.fill("#firstName",this.firstName);
  await this.page.fill("#lastName",this.lastName);
  await this.page.fill("[placeholder='email@example.com']",data.registrationEmail);
  await this.page.fill("#userMobile",this.mobileNo);
  await this.page.locator("//select[@class='custom-select ng-untouched ng-pristine ng-valid']").selectOption("Engineer");
  await this.page.locator("[value='Male']").click();
  await this.page.fill('#userPassword', this.password);
  await this.page.fill('#confirmPassword', this.password);
  await this.page.locator("[type='checkbox']").click();
  await this.page.locator("input#login").click();
}
}