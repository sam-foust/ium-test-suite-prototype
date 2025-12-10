@authentication @password-management @critical
Feature: Password Management
  Comprehensive testing of password lifecycle including expired password flow,
  authenticated password change, forgot password, admin temporary password,
  and tenant management impersonation features.

  Background:
    Given I have a tenant with MFA disabled
    And MFA service is configured
    And email service is configured

  Rule: Employee Password Flows
    Standard password management flows for employee users including
    expired password handling, voluntary password changes, and
    forgot password recovery with email verification.

    Background:
      Given I have an active employee account
      And the employee has a validated email address

    @expired-password @validation
    Scenario: User forced to change expired password with validation
      Given my password is expired
      When I navigate to the login page
      And I enter my username
      And I enter my expired password
      And I submit login
      Then I am prompted that my password is expired
      And I see a password change form
      When I enter an incorrect current password
      And I enter a new password
      And I save
      Then I see an error "Unable to change password because password is incorrect"
      And my password is NOT changed
      When I enter the correct current password
      And I enter my current password again as the new password
      And I save
      Then I see an error "This password has been used recently and you need to pick a different password"
      And my password is NOT changed
      When I enter the correct current password
      And I enter a new valid password
      And I confirm the new password
      And I save
      Then my password change is successful
      And I am logged out
      And I am redirected to the login screen
      When I enter my username
      And I enter my new password
      And I submit login
      Then I successfully log into the application
      And I land on the application home dashboard

    @authenticated-change @voluntary
    Scenario: Authenticated user voluntarily changes password
      Given I am logged into the application as the employee
      When I click the user icon in the upper right corner
      And I select "Change Password" from the menu
      Then I am redirected to the change password screen
      And I see current password and new password fields
      When I enter my current password
      And I enter a new valid password
      And I confirm the new password
      And I save
      Then my password change is successful
      And I am logged out
      And I am redirected to the login screen
      When I enter my username
      And I enter my new password
      And I submit login
      Then I successfully log into the application
      And I land on the application home dashboard

    @forgot-password @email-verification @password-history
    Scenario: User resets password via forgot password with password history validation
      Given I am on the login page
      When I click "Forgot Password" link
      And I enter my username
      And I submit
      Then I receive a confirmation message
      When I check my email inbox
      And I copy the verification code from the email
      And I enter the verification code on the screen
      And I submit
      Then I am taken to the password reset screen
      When I enter my current password as the new password
      And I save
      Then I see an error "Password was recently used"
      And my password is NOT changed
      When I enter a new valid password that was not recently used
      And I confirm the new password
      And I save
      Then my password reset is successful
      And I am redirected to the login screen
      When I enter my username
      And I enter my new password
      And I submit login
      Then I successfully log into the application
      And I land on the application home dashboard

  Rule: Admin Password Management
    Administrative capabilities for managing user passwords including
    setting temporary passwords that force users to reset on next login.

    Background:
      Given I have an admin employee account
      And I have a target employee account to manage

    @admin-temporary-password @forced-reset @web
    Scenario: Admin sets temporary password for employee
      Given I am logged in as the admin
      When I navigate to the Employees section
      And I go to the detail page for the target employee
      And I select "Temporary Password" from the actions menu
      And I enter a new temporary password
      And I save
      Then the temporary password is set successfully
      And I see a confirmation message
      When I sign out as admin
      And I navigate to the login page
      And I enter the target employee's username
      And I enter the temporary password
      And I submit login
      Then I am prompted to change my password
      And I am NOT asked for my current password
      And I see only new password and confirmation fields
      When I enter a new valid password
      And I confirm the new password
      And I save
      Then my password change is successful
      And I am logged out
      And I am redirected to the login screen
      When I enter the target employee's username
      And I enter the new password
      And I submit login
      Then I successfully log into the application
      And I land on the application home dashboard

  Rule: Technician Mobile Password Management
    Password management flows specific to technician users on mobile platforms
    including temporary impersonation passwords for mobile access.

    Background:
      Given I have an active technician account
      And the technician account is configured for mobile access

    @admin-temporary-password @forced-reset @mobile
    Scenario: Admin sets temporary password for technician on mobile
      Given I am logged in as an admin on web
      When I navigate to the Technicians section
      And I go to the detail page for the technician
      And I select "Temporary Password" from the actions menu
      And I enter a new temporary password
      And I save
      Then the temporary password is set successfully
      And I see a confirmation message
      When I sign out as admin
      And I navigate to the login page on mobile device or Android Studio
      And I enter the technician's username
      And I enter the temporary password
      And I submit login
      Then I am prompted to change my password
      And I am NOT asked for my current password
      And I see only new password and confirmation fields
      When I enter a new valid password
      And I confirm the new password
      And I save
      Then my password change is successful
      And I am logged out
      And I am redirected to the mobile login screen
      When I enter the technician's username
      And I enter the new password
      And I submit login
      Then I successfully log into the mobile application
      And I land on the mobile home screen

    @tenant-impersonation @mobile @technician-only
    Scenario: Tenant management impersonation password for mobile technician
      Given I am logged into my ServiceTitan account
      When I navigate to Tenant Management
      And I find the tenant I am testing
      And I locate the technician account
      And I click "Impersonate on Mobile"
      Then I see a temporary impersonation password displayed
      When I copy the impersonation password
      And I navigate to the login page on mobile device or Android Studio
      And I enter the technician username
      And I enter the impersonation password
      And I submit login
      Then I am logged in successfully as the impersonated technician
      And I am NOT asked to change or reset my password
      And I land on the mobile home screen

  # Setup Notes:
  # - Tenant must have MFA disabled
  # - MFA service must be configured (to verify it's not interfering)
  # - Email service must be configured for password reset codes
  # - Create 2 employee accounts with admin role (one to test, one to be admin)
  # - Create 1 technician account for mobile testing
  # - Document all usernames, emails, and passwords during test execution
  # - Platform coverage: Web browser (Employee/Admin) and Mobile/Android Studio (Technician)
