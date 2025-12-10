# AI Agent Guide: Gherkin Test Suite Format

## Overview

This guide provides detailed instructions for AI agents working with the Test Suite Viewer application. The application uses standard Gherkin (`.feature` files) format for defining test scenarios in a human-readable, automation-ready way.

## Table of Contents

1. [Gherkin Syntax Reference](#gherkin-syntax-reference)
2. [Creating New Test Suites](#creating-new-test-suites)
3. [Extending Existing Test Suites](#extending-existing-test-suites)
4. [File Organization](#file-organization)
5. [Manifest Configuration](#manifest-configuration)
6. [Common Patterns and Examples](#common-patterns-and-examples)
7. [Best Practices](#best-practices)
8. [Automation Path](#automation-path)

---

## Gherkin Syntax Reference

### Core Structure

```gherkin
@tag1 @tag2 @tag3
Feature: Feature Name
  Brief description of the feature being tested
  Can span multiple lines

  Background:
    Given precondition that applies to all scenarios
    And another precondition

  Rule: Business Rule Name
    Description of the business rule being tested
    This groups related scenarios together

    Background:
      Given rule-specific precondition
      And another rule precondition

    @scenario-tag
    Scenario: Scenario Name
      Given initial context
      When action is performed
      Then expected outcome

  @another-tag
  Scenario Outline: Parameterized Scenario
    Given I have "<parameter>"
    When I do something with "<parameter>"
    Then I expect "<result>"

    Examples:
      | parameter | result  |
      | value1    | result1 |
      | value2    | result2 |
```

### Keywords

#### Feature
- **Purpose**: Describes the feature being tested
- **Format**: `Feature: Feature Name`
- **Description**: Multiple lines of text after the feature name
- **Tags**: Optional tags before Feature keyword

```gherkin
@authentication @critical
Feature: User Login
  This feature allows users to log into the application
  using their username and password credentials.
```

#### Background
- **Purpose**: Steps that run before each scenario
- **When to use**: Common setup that applies to all scenarios in the feature (or rule)
- **Runs**: Before each scenario
- **Scope**: Can be at Feature level (applies to all) or Rule level (applies to scenarios in that rule)

```gherkin
# Feature-level background (applies to all scenarios and rules)
Background:
  Given the application is running
  And the database is accessible

Rule: User Management
  # Rule-level background (only applies to scenarios in this rule)
  Background:
    Given I have an active user account
    And the user has permissions
```

#### Rule
- **Purpose**: Group related scenarios under a business rule
- **Format**: `Rule: Rule Name`
- **Benefits**: Organizes scenarios, allows rule-specific backgrounds
- **When to use**: When you have multiple related scenarios testing the same business rule

```gherkin
Feature: Password Management

  Background:
    Given the system is configured

  Rule: Employee Password Flows
    User-initiated password changes

    Background:
      Given I have an employee account

    Scenario: Change password
      # ... steps ...

    Scenario: Forgot password
      # ... steps ...

  Rule: Admin Password Management
    Admin-controlled password operations

    Background:
      Given I have an admin account

    Scenario: Admin resets user password
      # ... steps ...
```

#### Scenario
- **Purpose**: A single test case
- **Format**: `Scenario: Scenario Name`
- **Steps**: Given, When, Then, And, But

```gherkin
Scenario: Successful login
  Given I am on the login page
  When I enter valid credentials
  Then I should be redirected to the dashboard
```

#### Scenario Outline
- **Purpose**: Data-driven testing
- **Format**: `Scenario Outline:` with `Examples:` table
- **Use**: Test same flow with different data

```gherkin
Scenario Outline: Login with different users
  Given I am user "<username>"
  When I login with password "<password>"
  Then I should see "<message>"

  Examples:
    | username | password | message |
    | john     | pass123  | Welcome |
    | jane     | pass456  | Welcome |
```

#### Step Keywords

**Given** - Preconditions (blue in UI)
```gherkin
Given I am on the login page
Given I have a user account
Given the feature is enabled
```

**When** - Actions (green in UI)
```gherkin
When I enter my username
When I click the "Submit" button
When I navigate to the dashboard
```

**Then** - Expected outcomes (orange in UI)
```gherkin
Then I should see a success message
Then the user is logged in
Then the page displays correctly
```

**And/But** - Additional steps (gray in UI)
```gherkin
And I enter my password
And I check the "Remember me" box
But I should not see admin options
```

### Tags

Tags categorize and filter scenarios:

```gherkin
@authentication   # Feature category
@critical         # Priority level
@smoke-test       # Test type
@web-only         # Platform
@regression       # Test suite
```

**Common tag patterns:**
- `@{feature}` - Feature category (authentication, payments, etc.)
- `@{priority}` - critical, high, medium, low
- `@{type}` - smoke-test, regression, integration
- `@{platform}` - web, mobile, api
- `@{status}` - draft, active, deprecated

### Comments

```gherkin
# This is a comment
# Setup notes: Requires email service configured
# Known issue: Edge case with special characters
```

---

## Creating New Test Suites

### Step 1: Choose a Category

Organize test suites into category folders:

```
test-suite-ui/public/test-suites/
├── authn/              # Authentication & Authorization
├── payments/           # Payment processing
├── reporting/          # Reports & Analytics
├── integrations/       # Third-party integrations
└── ...
```

**Decision guide:**
- Authentication, login, password → `authn/`
- Payment, billing, checkout → `payments/`
- Reports, dashboards, exports → `reporting/`
- API integrations, webhooks → `integrations/`

### Step 2: Create the Feature File

**Naming convention:**
- Use kebab-case: `login-flow.feature`, `checkout-process.feature`
- Be descriptive but concise
- Match the main feature being tested

**File location:**
```
test-suite-ui/public/test-suites/{category}/{feature-name}.feature
```

### Step 3: Write the Gherkin

**Basic template:**

```gherkin
@category @priority
Feature: Feature Name
  Description of what this feature does
  and why it's important to test

  Background:
    Given common precondition 1
    And common precondition 2

  @tag1
  Scenario: First scenario name
    Given initial context
    And more context if needed
    When user performs action
    And another action
    Then expected outcome
    And additional verification

  @tag2
  Scenario: Second scenario name
    Given different context
    When different action
    Then different outcome

  # Setup notes:
  # - List any required setup
  # - Document prerequisites
  # - Note any dependencies
```

### Step 4: Update Manifest

Edit `test-suite-ui/public/test-suites/manifest.json`:

```json
{
  "testSuites": [
    {
      "id": "login-flow",
      "file": "authn/login-flow.feature",
      "category": "Authentication"
    }
  ]
}
```

**Fields:**
- `id`: Unique identifier (matches filename without .feature)
- `file`: Path relative to `test-suites/` folder
- `category`: Display name for grouping in UI

### Step 5: Test Locally

```bash
cd test-suite-ui
npm run dev
```

Open `http://localhost:5173` and verify your test suite appears and renders correctly.

---

## Extending Existing Test Suites

### Adding New Scenarios

Add scenarios to the existing feature file:

```gherkin
Feature: Existing Feature
  # ... existing scenarios ...

  @new-scenario
  Scenario: New scenario to add
    Given new context
    When new action
    Then new outcome
```

### Adding Scenario Outlines

For data-driven testing:

```gherkin
@data-driven
Scenario Outline: Test with multiple inputs
  Given I have input "<input>"
  When I process it
  Then I get "<output>"

  Examples:
    | input | output |
    | test1 | result1 |
    | test2 | result2 |
```

### Updating Background

Modify shared setup steps:

```gherkin
Background:
  Given existing precondition
  And new precondition that applies to all scenarios
```

### Adding Setup Comments

Document complex setups:

```gherkin
Feature: Complex Feature
  # ... feature description ...

  # Setup Requirements:
  # - Tenant must have feature flag enabled
  # - Email service must be configured
  # - At least 2 test user accounts needed
  # - Database must contain test data

  Background:
    # ... steps ...
```

---

## File Organization

### Directory Structure

```
test-suite-ui/public/test-suites/
├── manifest.json                     # Master list
├── authn/                            # Authentication
│   ├── password-management.feature
│   ├── login-flow.feature
│   └── otp-delivery-flow.feature
├── payments/                         # Payments
│   ├── checkout-process.feature
│   └── refund-flow.feature
└── reporting/                        # Reporting
    └── export-reports.feature
```

### Naming Conventions

**Folders (Categories):**
- Lowercase, short names: `authn`, `payments`, `reporting`
- Be consistent across the project
- Use singular or plural consistently

**Files:**
- Use kebab-case: `password-management.feature`
- Be descriptive: `checkout-process.feature` not `checkout.feature`
- Extension must be `.feature`

**IDs in manifest:**
- Must match filename (without `.feature` extension)
- Use kebab-case: `password-management`

---

## Manifest Configuration

### Location

```
test-suite-ui/public/test-suites/manifest.json
```

### Structure

```json
{
  "testSuites": [
    {
      "id": "unique-suite-id",
      "file": "category/filename.feature",
      "category": "Display Category Name"
    }
  ]
}
```

### Adding Entries

```json
{
  "testSuites": [
    {
      "id": "password-management",
      "file": "authn/password-management.feature",
      "category": "Authentication"
    },
    {
      "id": "otp-delivery-flow",
      "file": "authn/otp-delivery-flow.feature",
      "category": "Authentication"
    },
    {
      "id": "checkout-process",
      "file": "payments/checkout-process.feature",
      "category": "Payments"
    }
  ]
}
```

**Important:**
- Keep entries sorted by category
- Ensure `file` path matches actual file location
- `id` should match filename (without extension)
- `category` groups suites in the UI

---

## Common Patterns and Examples

### Pattern 1: Simple Feature Test

```gherkin
@feature-name
Feature: Basic Feature
  Tests basic functionality of the feature

  Scenario: Happy path
    Given I am on the feature page
    When I perform the main action
    Then the feature works correctly
    And no errors are displayed

  Scenario: Error handling
    Given I am on the feature page
    When I perform an invalid action
    Then I see an appropriate error message
    And the system remains stable
```

### Pattern 1b: Feature with Rules

```gherkin
@feature-name @complex
Feature: Complex Feature with Multiple User Types
  Tests a feature with different behaviors for different user types

  Background:
    Given the system is configured
    And the database is accessible

  Rule: Standard User Flows
    Tests for standard user permissions and capabilities

    Background:
      Given I have a standard user account
      And I am logged in as a standard user

    Scenario: Standard user can access allowed features
      When I navigate to the dashboard
      Then I see standard user features
      And I do not see admin features

    Scenario: Standard user blocked from admin features
      When I try to access admin settings
      Then I see an access denied message

  Rule: Admin User Flows
    Tests for admin-specific functionality

    Background:
      Given I have an admin user account
      And I am logged in as an admin

    Scenario: Admin can access all features
      When I navigate to the dashboard
      Then I see admin features
      And I see standard user features

    Scenario: Admin can manage users
      When I go to user management
      Then I can create new users
      And I can modify existing users
```

### Pattern 2: Multi-Step Workflow

```gherkin
@workflow @multi-step
Feature: Complete Workflow
  Tests an end-to-end user workflow

  Background:
    Given I have a valid user account
    And I am logged into the application

  Scenario: Complete workflow from start to finish
    Given I am on the starting page
    When I navigate to step 1
    And I complete step 1 successfully
    Then I proceed to step 2
    When I complete step 2
    Then I proceed to step 3
    When I complete step 3
    Then the workflow is complete
    And I see a success confirmation
```

### Pattern 3: Data-Driven Testing

```gherkin
@data-driven @validation
Feature: Input Validation
  Tests various input scenarios

  Scenario Outline: Validate different inputs
    Given I am on the input form
    When I enter "<input>" in the field
    And I submit the form
    Then I should see "<message>"
    And the status should be "<status>"

    Examples:
      | input       | message        | status  |
      | valid@email | Success        | success |
      | invalid     | Invalid format | error   |
      | empty       | Required field | error   |
```

### Pattern 4: Multi-Platform Testing

```gherkin
@multi-platform @authentication
Feature: Cross-Platform Login
  Verify login works on all platforms

  Background:
    Given I have a valid user account
    And the account is active

  @web
  Scenario: Login on web browser
    Given I am on the web login page
    When I enter my credentials
    And I click the login button
    Then I am logged into the web application
    And I see the web dashboard

  @mobile
  Scenario: Login on mobile app
    Given I am on the mobile login screen
    When I enter my credentials
    And I tap the login button
    Then I am logged into the mobile application
    And I see the mobile home screen
```

### Pattern 5: Setup and Teardown

```gherkin
@setup-teardown @integration
Feature: Feature with Complex Setup
  Tests that require specific setup

  # Setup Notes:
  # 1. Create test tenant with ID [TenantId]
  # 2. Create 2 test users: [User1] and [User2]
  # 3. Configure feature flags: [FeatureFlag1]=enabled
  # 4. Populate test data in database

  Background:
    Given tenant "[TenantId]" exists
    And user "[User1]" is an admin
    And user "[User2]" is a standard user
    And feature "[FeatureFlag1]" is enabled

  Scenario: Test with complex setup
    Given I log in as "[User1]"
    When I perform admin action
    Then the action succeeds
```

### Pattern 6: Error Scenarios

```gherkin
@error-handling @negative-tests
Feature: Error Handling
  Verify system handles errors gracefully

  Scenario: Missing required field
    Given I am on the form page
    When I leave the required field empty
    And I submit the form
    Then I see error "This field is required"
    And the field is highlighted in red
    And the form is not submitted

  Scenario: Invalid data format
    Given I am on the form page
    When I enter invalid formatted data
    And I submit the form
    Then I see error "Invalid format"
    And the form shows formatting hint

  Scenario: Network error
    Given I am on the page
    When the network connection is lost
    And I try to perform an action
    Then I see error "Connection failed"
    And the action can be retried
```

---

## Best Practices

### Writing Gherkin

1. **Use business language** - Write for domain experts, not developers
   - Good: `When I submit my order`
   - Bad: `When I click the #submit-button element`

2. **Be declarative, not imperative** - Describe what, not how
   - Good: `When I log in as an admin`
   - Bad: `When I enter "admin" and click login and wait for redirect`

3. **One scenario, one behavior** - Keep scenarios focused
   - Each scenario should test one specific thing
   - If using "And" many times, consider breaking into multiple scenarios

4. **Use Background wisely** - Only for truly common setup
   - Background runs before EVERY scenario
   - Don't overload it with unnecessary steps

5. **Make steps reusable** - Write steps that can be used across scenarios
   - Good: `Given I am logged in`
   - Bad: `Given I navigate to /login and enter username and password`

6. **Use Scenario Outline for data variations** - Don't repeat scenarios
   - Use tables for testing same flow with different data
   - Keeps tests DRY (Don't Repeat Yourself)

### Tags

1. **Use meaningful tags** - Tags should convey information
   - `@critical`, `@smoke-test`, `@regression`
   - `@web`, `@mobile`, `@api`
   - `@authentication`, `@payments`, `@reporting`

2. **Layer tags** - Use multiple tags for filtering
   ```gherkin
   @authentication @critical @smoke-test @web
   Feature: User Login
   ```

3. **Tag at appropriate level** - Feature vs Scenario
   - Feature tags apply to all scenarios
   - Scenario tags apply to specific scenarios

### Organization

1. **Group related scenarios** - Keep related tests in one feature
2. **Logical order** - Order scenarios from simple to complex
3. **Clear feature descriptions** - Explain what and why
4. **Document setup** - Use comments for complex requirements

### Maintenance

1. **Keep features up to date** - Update when functionality changes
2. **Remove obsolete scenarios** - Delete tests for removed features
3. **Refactor duplicated steps** - Look for reusable patterns
4. **Use version control** - Commit feature files to git

---

## Automation Path

### Why Gherkin?

Gherkin format makes your tests automation-ready:

1. **Human-readable** - Anyone can understand
2. **Machine-executable** - Can be automated with Cypress + Cucumber
3. **Living documentation** - Tests document the system
4. **BDD workflow** - Supports Behavior-Driven Development

### Future Automation with Cypress

When ready to automate:

**1. Install Cypress + Cucumber**
```bash
npm install cypress @badeball/cypress-cucumber-preprocessor
```

**2. Configure Cypress**
```javascript
// cypress.config.js
module.exports = {
  e2e: {
    specPattern: "**/*.feature",
    supportFile: false,
  },
};
```

**3. Write Step Definitions**
```javascript
// cypress/support/step_definitions/login.js
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the login page", () => {
  cy.visit("/login");
});

When("I enter username {string}", (username) => {
  cy.get("#username").type(username);
});

Then("I should be redirected to the dashboard", () => {
  cy.url().should("include", "/dashboard");
});
```

**4. Run Tests**
```bash
npx cypress run
```

Your Gherkin files become executable tests!

---

## Quick Reference

### File Checklist

- [ ] File in correct category folder
- [ ] Named with kebab-case and `.feature` extension
- [ ] Tags for categorization
- [ ] Feature name and description
- [ ] Background if needed
- [ ] Clear scenarios with Given-When-Then
- [ ] Setup notes as comments
- [ ] Entry in `manifest.json`

### Gherkin Syntax

```gherkin
# Tags (optional, can have multiple)
@tag1 @tag2

# Feature (required)
Feature: Feature Name
  Multi-line description of the feature
  can span multiple lines

  # Background (optional, runs before each scenario)
  Background:
    Given common precondition
    And another precondition

  # Scenario (required, have multiple)
  @scenario-tag
  Scenario: Scenario name
    Given initial context
    And more context
    When action performed
    And another action
    Then expected outcome
    And verification
    But not this

  # Scenario Outline (optional, for data-driven)
  Scenario Outline: Template scenario
    Given I have "<parameter>"
    When I use "<parameter>"
    Then I expect "<result>"

    Examples:
      | parameter | result |
      | value1    | result1 |
      | value2    | result2 |

  # Comments for setup notes
  # - Setup item 1
  # - Setup item 2
```

---

## Examples

See these complete examples:
- [`test-suite-ui/public/test-suites/authn/password-management.feature`](../test-suite-ui/public/test-suites/authn/password-management.feature)
- [`test-suite-ui/public/test-suites/authn/otp-delivery-flow.feature`](../test-suite-ui/public/test-suites/authn/otp-delivery-flow.feature)

---

## Summary

When creating test suites with Gherkin:

1. **Use standard Gherkin syntax** - Feature, Background, Scenario, Given-When-Then
2. **Write in business language** - Focus on behavior, not implementation
3. **Organize with tags** - Use tags for categorization and filtering
4. **Keep it simple** - One scenario, one behavior
5. **Document setup** - Use comments for prerequisites
6. **Update manifest.json** - Add entry for new test suite
7. **Test locally** - Verify before committing

This format provides:
- ✅ Human-readable documentation
- ✅ Structured test cases
- ✅ Clear acceptance criteria
- ✅ Future automation path
- ✅ Living documentation

For questions or examples, refer to the existing feature files in the repository.
