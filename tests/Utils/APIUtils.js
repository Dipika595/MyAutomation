// const {test,expect,request} =require("@playwright/test");
class APIUtils{

    constructor(apiContext,loginPayload){

        this.apiContext=apiContext;
        this.loginPayload=loginPayload;
        // this.orderPayload=orderPayload;
    }

    async getToken(){
        const loginResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
                { data: this.loginPayload })
        
                // expect(loginResponse.ok()).toBeTruthy()
                const loginResponseJson=await loginResponse.json()
                const token=loginResponseJson.token;
                console.log(token)
                return token
    }

    async createOrder(orderPayload){
        let response={};
        response.token=await this.getToken();
        // const token = await this.getToken(); // Resolve token
        // response.token = token;
        console.log("Token is",response.token)
        const orderResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
            data: orderPayload,
            headers:{
                'Authorization':  response.token,
                'Content-Type': 'application/json'
            }

        })
        const orderresponseJson=await orderResponse.json()
        console.log("Response of order api is   ::::: ",orderresponseJson)
        const orderId= orderresponseJson.orders[0];
        response.orderId=orderId;
        return response;
    }
}

module.exports={APIUtils};