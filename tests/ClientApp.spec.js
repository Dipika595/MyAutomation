const {test,expect,request} =require("@playwright/test");
const exp=require("constants");
let token;
const loginPayload = { userEmail: "avantika@gmail.com", userPassword: "Shinchan@1234" }
const orderPayload={}

test.beforeAll( async() => {

    const apiContext = await request.newContext();
    const loginResponse=await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        { data: loginPayload })

        expect(loginResponse.ok()).toBeTruthy()
        const loginResponseJson=await loginResponse.json()
         token=loginResponseJson.token;
        console.log(token)

       
})

test.skip("Client login", async ({page}) => {

    page.addInitScript(value=>{
        window.localStorage.setItem("token",value)
    }, token);
    const email="avantika@gmail.com";
    // const email="";
    const productName='IPHONE 13 PRO';
    await page.goto("https://rahulshettyacademy.com/client")
    const products=page.locator(".card-body")
    // await page.goto("https://rahulshettyacademy.com/client")
    // // await page.locator("#userEmail").fill(email)
    // await page.getByPlaceholder("email@example.com").fill(email)
    // // await page.locator("#userPassword").fill("Shinchan@1234")
    // await page.getByPlaceholder("enter your passsword").fill("Shinchan@1234")
    // // await page.locator("[value='Login']").click()
    // await page.getByRole("button",{name:"Login"}).click()
    // await page.waitForLoadState("networkidle")
    const titles=await page.locator(".card-body b").allTextContents()
    console.log("All titles are",titles)

    const count=await products.count()
    for(let i=0;i<count;++i){
        if(await products.nth(i).locator("b").textContent()===productName){
            await products.nth(i).locator("text=Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click()

    await page.locator("div li").first().waitFor()

   const bool= await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible()
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click()

   await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:100})
   const dropDown=page.locator(".ta-results")
   await dropDown.waitFor()
  const optionsCount=await dropDown.locator("button").count()
   for(let i=0;i<optionsCount;++i){
        const text=await dropDown.locator("button").nth(i).textContent()
        console.log("dropdown text",text)
        if(text ===" India"){
            await dropDown.locator("button",{delay:100}).nth(i).click()
           
            break;
        }
   }
//    await page.pause()

   await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click()
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

   const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId)

   await page.locator(" button[routerlink*='myorders']").click()
   await page.locator("tbody").waitFor()
   const rows=await page.locator("tbody tr")
   for(let i=0;i<await rows.count();++i){
        const rowOrderId=await rows.nth(i).locator("th").textContent()
        if(orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click()
            break

        }
   }

   const orderDetails=await page.locator(".col-text").textContent()
   expect(orderId.includes(orderDetails)).toBeTruthy()


})