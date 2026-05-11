Feature: Ecommerce Validations


    @ErrorValidations
    @foo
    Scenario: Placing the order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then verify error message is displayed

        Examples:
            | username | password | 
            | avantikaaa@gmail.com | Shinchan@1234  | 
            | hello@123 | iamhello@12|


