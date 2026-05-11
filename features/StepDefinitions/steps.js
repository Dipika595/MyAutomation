const { When, Then, Given } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager')
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');


Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
  // Write code here that turns the phrase above into concrete actions

  // const browser = await playwright.chromium.launch({ headless: false });
  // const context = await browser.newContext();
  // const page = await context.newPage();
  // // const poManager = new POManager(page);
  //   this.poManager = new POManager(page);
  // const username="avantika@gmail.com";
  // const password="Shinchan@1234"
  // const productName = 'ZARA COAT 3';
  const products = this.page.locator(".card-body")
  const loginPage = this.poManager.getLoginPage();
  await loginPage.goTo()
  await loginPage.validLogin(username, password)
});



When('Add {string} to cart', async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  this.dashboardPage = this.poManager.getDashboardPage()
  await this.dashboardPage.searchProductAddCart(productName)
  await this.dashboardPage.navigateToCart()
});



Then('verify {string} is displayed in the Cart', async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  const cartPage = this.poManager.getCartPage()
  await cartPage.VerifyProductIsDisplayed(productName)
  await cartPage.Checkout()
});


When('Enter valid details  and Place the order', async function () {
  // Write code here that turns the phrase above into concrete actions
  const ordersReviewPage = this.poManager.getOrdersReviewPage()
  await ordersReviewPage.searchCountryAndSelect("ind", "India")
  this.orderId = await ordersReviewPage.SubmitAndGetOrderId()
  console.log("orderId", this.orderId)
});



Then('verify the order is present in the order history', async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.dashboardPage.navigateToOrders()
  const ordersHistoryPage = this.poManager.getOrdersHistoryPage()
  await ordersHistoryPage.searchOrderAndSelect(this.orderId)
  expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy()
});


Given('a login to Ecommerce2 application with {string} and {string}', async function (user, password) {
  // Write code here that turns the phrase above into concrete actions
  const username = this.page.locator("#username");
  const signIn = this.page.locator("#signInBtn");
  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await username.fill(user);
  await this.page.locator("[type='password']").type(password);
  await signIn.click();
});



Then('verify error message is displayed', async function () {
  // Write code here that turns the phrase above into concrete actions
  console.log(await this.page.locator("[style*='block']").textContent());
  expect(await this.page.locator("[style*='block']").textContent()).toContain("Incorrect");
});