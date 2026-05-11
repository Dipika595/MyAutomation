Feature: Ecommerce Validations


    @Regression 
    @foo
    Scenario: Placing the order
        Given a login to Ecommerce application with "avantika@gmail.com" and "Shinchan@1234"
        When Add "ZARA COAT 3" to cart
        Then verify "ZARA COAT 3" is displayed in the Cart
        When Enter valid details  and Place the order
        Then verify the order is present in the order history

@ErrorValidations
    @foo
    Scenario: Placing the order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then verify error message is displayed

        Examples:
            | username | password | 
            | avantikaaa@gmail.com | Shinchan@1234  | 
            | hello@123 | iamhello@12|
