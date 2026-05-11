const {test,expect,request} =require("@playwright/test");
// const exp=require("constants");
const {APIUtils}=require("./Utils/APIUtils")
let token;
const fakePayload={data:[],message:"No Orders"};

const loginPayload = { userEmail: "avantika@gmail.com", userPassword: "Shinchan@1234" }
const orderPayload= {orders:[{country:"India",productOrderedId:"67a8df56c0d3e6622a297ccd"}]}
// let orderId;
let response
let apiContext

test.beforeAll( async() => {

     apiContext = await request.newContext();
    const apiUtils=new APIUtils(apiContext,loginPayload);
    response=await apiUtils.createOrder(orderPayload);
    
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

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route=>{
           const response= await page.request.fetch(route.request());
           let body=JSON.stringify(fakePayload);
            route.fulfill(
                {
                    response,
                    body,
                }
            )
        }
    )

    await page.pause();
   await page.locator(" button[routerlink*='myorders']").click()
//    await page.locator("tbody").waitFor()
//    const rows=await page.locator("tbody tr")
//    for(let i=0;i<await rows.count();++i){
//         const rowOrderId=await rows.nth(i).locator("th").textContent()
//         if(response.orderId.includes(rowOrderId))
//         {
//             await rows.nth(i).locator("button").first().click()
//             break

//         }
//    }

//    const orderDetails=await page.locator(".col-text").textContent()
//    expect(response.orderId.includes(orderDetails)).toBeTruthy()


})