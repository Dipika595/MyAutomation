const {test,expect,request} =require("@playwright/test");
// const exp=require("constants");
const {APIUtils}=require("./Utils/APIUtils")
let token;

const loginPayload = { userEmail: "avantika@gmail.com", userPassword: "Shinchan@1234" }
const orderPayload= {orders:[{country:"India",productOrderedId:"6581cade9fd99c85e8ee7ff5"}]}
// let orderId;
let response
let apiContext

test.beforeAll( async() => {

     apiContext = await request.newContext();
    const apiUtils=new APIUtils(apiContext,loginPayload);
    response=await apiUtils.createOrder(orderPayload);
    // const loginResponse=await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    //     { data: loginPayload })

    //     expect(loginResponse.ok()).toBeTruthy()
    //     const loginResponseJson=await loginResponse.json()
    //      token=loginResponseJson.token;
    //     console.log(token)

        // const orderResponse=await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
        //     data:orderPayload,
        //     headers:{
        //         'Authorization': token,
        //         'Content-Type': 'application/json'
        //     }

        // })
        // const orderresponseJson=await orderResponse.json()
        // console.log(orderresponseJson)
        // orderId=orderresponseJson.orders[0];
})

test("Place the order", async ({page}) => {

    // const apiUtils=new APIUtils(apiContext,loginPayload);
    // const orderId   =await apiUtils.createOrder(orderPayload);

    page.addInitScript(value=>{
        window.localStorage.setItem("token",value)
    }, response.token);
    const email="avantika@gmail.com";
    // const email="";
    const productName='IPHONE 13 PRO';
    await page.goto("https://rahulshettyacademy.com/client")
    // const products=page.locator(".card-body")
    // await page.goto("https://rahulshettyacademy.com/client")
    // // await page.locator("#userEmail").fill(email)
    // await page.getByPlaceholder("email@example.com").fill(email)
    // // await page.locator("#userPassword").fill("Shinchan@1234")
    // await page.getByPlaceholder("enter your passsword").fill("Shinchan@1234")
    // // await page.locator("[value='Login']").click()
    // await page.getByRole("button",{name:"Login"}).click()
    // await page.waitForLoadState("networkidle")
//     const titles=await page.locator(".card-body b").allTextContents()
//     console.log("All titles are",titles)

//     const count=await products.count()
//     for(let i=0;i<count;++i){
//         if(await products.nth(i).locator("b").textContent()===productName){
//             await products.nth(i).locator("text=Add To Cart").click();
//             break;
//         }
//     }

//     await page.locator("[routerlink*='cart']").click()

//     await page.locator("div li").first().waitFor()

//    const bool= await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible()
//    expect(bool).toBeTruthy();
//    await page.locator("text=Checkout").click()

//    await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:100})
//    const dropDown=page.locator(".ta-results")
//    await dropDown.waitFor()
//   const optionsCount=await dropDown.locator("button").count()
//    for(let i=0;i<optionsCount;++i){
//         const text=await dropDown.locator("button").nth(i).textContent()
//         console.log("dropdown text",text)
//         if(text ===" India"){
//             await dropDown.locator("button",{delay:100}).nth(i).click()
           
//             break;
//         }
//    }
// //    await page.pause()

//    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
//    await page.locator(".action__submit").click()
//    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

//    const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
//    console.log(orderId)

   await page.locator(" button[routerlink*='myorders']").click()
   await page.locator("tbody").waitFor()
   const rows=await page.locator("tbody tr")
   for(let i=0;i<await rows.count();++i){
        const rowOrderId=await rows.nth(i).locator("th").textContent()
        if(response.orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click()
            break

        }
   }

   const orderDetails=await page.locator(".col-text").textContent()
   expect(response.orderId.includes(orderDetails)).toBeTruthy()


})