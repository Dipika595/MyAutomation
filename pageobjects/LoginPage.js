const {expect} = require('@playwright/test');
class LoginPage{

    constructor(page){

        this.page=page;
        this.signInButton = page.locator("[value='Login']")
        this.userName=page.locator("#userEmail")
        this.password=page.locator("#userPassword")
        this.waitForLoadState=page.waitForLoadState("networkidle")
    }
async goTo(){
    await this.page.goto("https://rahulshettyacademy.com/client")
}
    async validLogin(username,password){
        await this.userName.fill(username)
        // await page.getByPlaceholder("email@example.com").fill(email)
        await this.password.fill(password)
        // await page.getByPlaceholder("enter your passsword").fill("Shinchan@1234")
        await this.signInButton.click()
        await this.waitForLoadState
    }
}
module.exports={LoginPage};