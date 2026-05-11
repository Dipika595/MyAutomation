const base = require("@playwright/test");

exports.customtest = base.test.extend({

    testDataForOrder:
    {
        email: "avantika@gmail.com",
        password: "Shinchan@1234",
        productName: "IPHONE 13 PRO"
    }
})