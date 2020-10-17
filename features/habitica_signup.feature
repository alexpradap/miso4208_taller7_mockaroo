Feature: Sign up to habitica
    Complete habitica sign up form

    Scenario: Empty username
        Given I browse to the sign up form
        When I leave the username field empty
        And I fill in the email field
        And I fill in the password field
        And I fill in the confirm password field
        And I click on sign up button
        Then I should see missign username error

    Scenario: Empty email
        Given I browse to the sign up form
        When I fill in the username field
        And I leave the email field empty
        And I fill in the password field
        And I fill in the confirm password field
        And I click on sign up button
        Then I should see missign email address error

    Scenario: Empty password
        Given I browse to the sign up form
        When I fill in the username field
        And I fill in the email field
        And I leave the password field empty
        And I fill in the confirm password field
        Then the sign up button should be disabled

    Scenario: Unmatching password confirmation
        Given I browse to the sign up form
        When I fill in the username field
        And I fill in the email field
        And I fill in the password field
        And I enter another password in the confirm password field
        And I click on sign up button
        Then the sign up button should be disabled