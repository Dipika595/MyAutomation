

const { test, expect } = require("@playwright/test");

test('Security test request intercept', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("#userEmail").fill("avantika@gmail.com")
    await page.locator("#userPassword").fill("Shinchan@1234")
    await page.getByRole("button", { name: "Login" }).click()
    await page.locator(".card-body b").first().waitFor()
    await page.locator("button[routerlink*='myorders']").click()




    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=56768798789089808mbv7668' })
    )

    await page.locator("button:has-text('View')").first().click()
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order")

})