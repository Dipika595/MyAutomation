const { Before, After, AfterStep } = require("@cucumber/cucumber");
const { POManager } = require('../../pageobjects/POManager')
const playwright = require('@playwright/test');

Before({tags: "@foo"},async function () {
 const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext();
   this.page = await context.newPage();
  // const poManager = new POManager(page);
    this.poManager = new POManager(this.page);
})

After(async function () {
 console.log("Closing the browser");
})

AfterStep(async function ({result}){
    if(result.status === 'failed') {
        console.log("Test failed, taking screenshot");
        const screenshot = await this.page.screenshot();
        this.attach(screenshot, 'image/png');

        // await this.page.screenshot({path: `screenshotCucumber-${Date.now()}.png`});

    }
} )