@authentication @otp-delivery @critical
Feature: OTP Delivery Flow
  Tests how OTP codes are delivered via email for forgot password scenarios.
  Validates single code delivery for unique email addresses and multiple code
  delivery when multiple accounts share same email across tenants.

  Background:
    Given I have access to Tenant 1 and Tenant 2
    And email service is configured for both tenants
    And SMS service is configured for validation

  @single-code @unique-email
  Scenario: Single employee with unique email receives one code
    Given I have an employee "Employee1" in Tenant 1
    And the employee has a validated email address
    And the employee has no phone number
    And this is the only active account with this email
    When I navigate to the login page
    And I click "Forgot Password" link
    And I enter the employee username
    And I submit the form
    Then I should be redirected to a page prompting for verification code
    And I should receive exactly 1 email
    And the email should contain exactly 1 OTP code
    And no SMS codes should be generated
    When I check my email and copy the OTP code
    And I enter the OTP code on the verification screen
    And I submit
    Then the code is accepted successfully
    And I am taken to the password reset screen
    When I enter a new password
    And I confirm the new password
    And I save
    Then the password reset is successful
    And I am logged out
    And I am redirected to the login screen
    When I enter my username
    And I enter my new password
    And I submit login
    Then I successfully log into the application
    And I land on the application home dashboard

  @shared-email @multiple-codes
  Scenario: Shared email across tenants receives multiple codes
    Given I have an employee "Employee1" in Tenant 1 with email "shared@example.com"
    And Employee1 has no phone number
    And I create a second employee "Employee2" in Tenant 2
    And Employee2 has the same email "shared@example.com"
    And Employee2 has no phone number
    And both employees share the same validated email address
    When I navigate to the login page
    And I click "Forgot Password" link
    And I enter "Employee2" username
    And I submit the form
    Then I should be redirected to a page prompting for verification code
    And I should receive exactly 1 email at "shared@example.com"
    And the email should contain exactly 2 OTP codes
    And one code should be for "Employee1" from Tenant 1
    And one code should be for "Employee2" from Tenant 2
    And no SMS codes should be generated
    When I identify and copy the OTP code for "Employee2"
    And I enter the OTP code for "Employee2" on the verification screen
    And I submit
    Then the code is accepted successfully
    And I am taken to the password reset screen for "Employee2"
    When I enter a new password for "Employee2"
    And I confirm the new password
    And I save
    Then the password reset is successful for "Employee2"
    And I am logged out
    And I am redirected to the login screen

  @verification @independent-accounts
  Scenario: Both employees can login after password reset
    Given "Employee1" has reset their password to "Password2"
    And "Employee2" has reset their password to "Password3"
    When I log in with "Employee1" username and "Password2"
    Then I successfully log into the application as "Employee1"
    And I land on the application home dashboard
    When I sign out
    And I log in with "Employee2" username and "Password3"
    Then I successfully log into the application as "Employee2"
    And I land on the application home dashboard

  # Setup Notes:
  # - Tenant 1 and Tenant 2 must have email service configured
  # - Employee1 created in Tenant 1 with unique email, no phone
  # - Employee2 created in Tenant 2 with same email as Employee1, no phone
  # - All usernames, emails, and passwords should be documented
  # - SMS service must be configured to verify no SMS codes are sent

