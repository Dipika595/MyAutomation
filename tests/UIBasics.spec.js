const {test,expect} =require("@playwright/test");
const exp=require("constants");

test.skip("Browser context playwright test", async ({browser}) => {
    
    const context=await browser.newContext();
    const page = await context.newPage();
    const userName=page.locator("#username")
    const signIn=page.locator("#signInBtn")
    const cartTitle=page.locator(".card-title a ")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await userName.fill("rahulshetty")
    await page.locator("[type='password']").fill("learning")
    await signIn.click()
    console.log(await page.locator("[style*='block']").textContent())
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    await userName.fill("")
    await userName.fill("rahulshettyacademy")
    await signIn.click()

    //console.log(await cartTitle.first().textContent())
    //console.log(await cartTitle.nth(0).textContent())
    //await page.waitForLoadState("netowrkidle") //flacky

    await cartTitle.first().waitFor();
    const allTitles=await cartTitle.allTextContents()
    console.log(allTitles)

})

test.skip("UI dropdown", async ({page}) => {
    
   const document =page.locator("[href*='documents-request']")
   const signIn=page.locator("#signInBtn")
   const userName=page.locator("#username")

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
   await userName.fill("rahulshettyacademy")
   await userName.fill("rahulshetty")

   await page.locator("[type='password']").fill("learning")
   const dropdown=page.locator("select.form-control")
   await dropdown.selectOption("Consultant")

//    page.pause()
await page.locator(".radiotextsty").nth(1).click()
await page.locator("#okayBtn").click()
await expect(page.locator(".radiotextsty").nth(1)).toBeChecked()
await page.locator("#terms").click()
await expect(page.locator("#terms").nth(1)).toBeChecked()
await page.locator("#terms").uncheck()

expect(await page.locator("#terms").isChecked()).toBeFalsy()
await expect(document).toHaveAttribute("class","blinkingText")
// await signIn.click()
})

test.skip("Child Window", async ({browser}) => {
    
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const document=page.locator("[href*='documents-request']")

    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        document.click()

    ])

    const text=await newPage.locator(".red").textContent()
    const arrayText=text.split("@")[1].split(" ")[0];
    console.log(arrayText)
    const userName=page.locator("#username")
    await userName.fill(arrayText);
 })