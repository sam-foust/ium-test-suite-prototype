# AI Agent Guide: Test Suite YAML Format and Usage

## Overview

This guide provides detailed instructions for AI agents working with the Test Suite Viewer application. It covers the YAML schema, how to create new test suites, how to extend existing ones, and the relationship between YAML structure and HTML rendering.

## Table of Contents

1. [YAML Schema Reference](#yaml-schema-reference)
2. [Creating New Test Suites](#creating-new-test-suites)
3. [Extending Existing Test Suites](#extending-existing-test-suites)
4. [File Organization](#file-organization)
5. [Manifest Configuration](#manifest-configuration)
6. [YAML to HTML Mapping](#yaml-to-html-mapping)
7. [Common Patterns and Examples](#common-patterns-and-examples)
8. [Best Practices](#best-practices)

---

## YAML Schema Reference

### Complete Schema Structure

```yaml
metadata:
  title: string                    # Display title of the test suite
  feature: string                  # Feature name being tested
  createdBy: string                # Author name
  dateCreated: string              # ISO date format: YYYY-MM-DD
  lastUpdated: string              # ISO date format: YYYY-MM-DD
  status: string                   # One of: Draft, Review, Approved, Executed

featureInformation:
  feature: string                  # Full feature description
  details: string[]                # Array of specific details/edge cases

preSetup:
  purpose: string                  # Purpose of pre-setup section
  tenantSetup: string[]            # Array of tenant setup requirements
  userAccounts:                    # Array of user account definitions
    - prerequisite: string         # Prerequisite identifier (e.g., "PRE-01")
      quantity: number              # Number of accounts to create
      notes: string                # Additional notes
  checklistItems: string[]         # Array of setup completion checklist items

executionMatrix:
  important: string                # Important note about execution
  matrix:                          # Array of execution matrix rows
    - userType: string             # User type description
      platform: string             # Platform (e.g., "Web Browser", "Mobile")
      variableSet: string           # Variables used for this execution
      executionStatus: string       # Status (e.g., "Incomplete", "Complete")
  instructions: string[]           # Array of testing instructions
  executionFlow: string[]           # Array of execution flow steps

prerequisites:                     # Array of prerequisite definitions
  - id: string                     # Prerequisite ID (e.g., "PRE-01")
    dataObject: string             # Description of the data object
    steps: string[]                # Array of steps to create this prerequisite

testVariables:                     # Array of variable categories
  - category: string               # Category name (e.g., "PRE-01 Variables")
    variables:                     # Array of variables in this category
      - name: string               # Variable name (e.g., "[Username1]")
        actualValue: string        # Actual value (empty initially)
        notes: string              # Notes about the variable

testScenarios:                     # Array of test scenarios
  - id: string                     # Scenario ID (e.g., "TC-01")
    title: string                  # Scenario title
    description: string            # Scenario description
    testCases:                     # Array of test cases
      - testId: string             # Test case ID (e.g., "TC-01.1")
        title: string              # Test case title
        prerequisiteReference: string  # Reference to prerequisite
        actionSteps: string[]      # Array of action steps
        expectedResult: string[]   # Array of expected results
        notes: string              # Optional notes
```

### Field Descriptions

#### metadata
- **title**: Main heading displayed in the UI. Should be descriptive and clear.
- **feature**: Short feature name used in cards and summaries.
- **createdBy**: Author name for attribution.
- **dateCreated**: ISO date (YYYY-MM-DD) when suite was created.
- **lastUpdated**: ISO date (YYYY-MM-DD) of last modification.
- **status**: Current status - affects badge color in UI:
  - `Draft` - Gray badge
  - `Review` - Yellow badge
  - `Approved` - Green badge
  - `Executed` - Blue badge

#### featureInformation
- **feature**: Full description of what's being tested.
- **details**: Bullet points describing specific test coverage areas.

#### preSetup
- **purpose**: Explanation of why pre-setup is needed.
- **tenantSetup**: List of tenant-level configurations required.
- **userAccounts**: Defines test users needed:
  - `prerequisite`: Links to a prerequisite ID (e.g., "PRE-01")
  - `quantity`: How many of this type to create
  - `notes`: Additional context
- **checklistItems**: Step-by-step checklist for setup completion.

#### executionMatrix
- **important**: Highlighted note displayed prominently.
- **matrix**: Table rows showing different execution combinations:
  - Each row represents a test execution path
  - `executionStatus` can be "Incomplete", "Complete", etc.
- **instructions**: Numbered list of how to execute tests.
- **executionFlow**: Ordered list of execution passes.

#### prerequisites
- **id**: Unique identifier (format: PRE-XX)
- **dataObject**: What this prerequisite represents.
- **steps**: Ordered list of steps to create this prerequisite.

#### testVariables
- **category**: Groups related variables together.
- **variables**: List of variables:
  - `name`: Variable placeholder (e.g., "[Username1]")
  - `actualValue`: Filled in during testing (empty in template)
  - `notes`: Explanation of variable usage

#### testScenarios
- **id**: Unique scenario ID (format: TC-XX)
- **title**: Scenario name
- **description**: What this scenario tests
- **testCases**: Individual test cases:
  - `testId`: Unique test case ID (format: TC-XX.Y)
  - `title`: Test case name
  - `prerequisiteReference`: Which prerequisite this uses
  - `actionSteps`: Ordered list of steps to execute
  - `expectedResult`: List of expected outcomes
  - `notes`: Optional additional information

---

## Creating New Test Suites

### Step-by-Step Process

#### 1. Choose a Category Folder

Test suites are organized by category in subfolders:

```
test-suite-ui/public/test-suites/
├── authn/              # Authentication & Authorization
├── payments/           # Payment processing
├── reporting/          # Reports & Analytics
├── integrations/       # Third-party integrations
└── ...
```

**Decision Tree:**
- Authentication, login, password → `authn/`
- Payment, billing, checkout → `payments/`
- Reports, dashboards, exports → `reporting/`
- API integrations, webhooks → `integrations/`
- Other → Create new folder or use root

#### 2. Create the YAML File

**Naming Convention:**
- Use kebab-case: `login-flow.yaml`, `checkout-process.yaml`
- Be descriptive but concise
- Match the main feature being tested

**File Location:**
```
test-suite-ui/public/test-suites/{category}/{suite-name}.yaml
```

#### 3. Write the YAML Structure

**Start with this template:**

```yaml
metadata:
  title: "Your Test Suite Title"
  feature: "Feature Name"
  createdBy: "Your Name"
  dateCreated: "2025-12-09"
  lastUpdated: "2025-12-09"
  status: "Draft"

featureInformation:
  feature: "Full description of what this test suite covers"
  details:
    - "Specific detail or edge case 1"
    - "Specific detail or edge case 2"
    - "Platform coverage: Web, Mobile, API"

preSetup:
  purpose: "Why setup is needed before testing"
  tenantSetup:
    - "Tenant configuration requirement 1"
    - "Tenant configuration requirement 2"
  userAccounts:
    - prerequisite: "PRE-01"
      quantity: 1
      notes: "Description of what this user is for"
  checklistItems:
    - "Setup item 1"
    - "Setup item 2"

executionMatrix:
  important: "Any important notes about execution"
  matrix:
    - userType: "User Type Name"
      platform: "Platform Name"
      variableSet: "Variables used"
      executionStatus: "Incomplete"
  instructions:
    - "Instruction step 1"
    - "Instruction step 2"
  executionFlow:
    - "Flow step 1"
    - "Flow step 2"

prerequisites:
  - id: "PRE-01"
    dataObject: "Description of prerequisite"
    steps:
      - "Step 1 to create"
      - "Step 2 to create"

testVariables:
  - category: "Category Name Variables"
    variables:
      - name: "[VariableName]"
        actualValue: ""
        notes: "What this variable represents"

testScenarios:
  - id: "TC-01"
    title: "Test Scenario Title"
    description: "What this scenario tests"
    testCases:
      - testId: "TC-01.1"
        title: "Test Case Title"
        prerequisiteReference: "Uses PRE-01"
        actionSteps:
          - "Action step 1"
          - "Action step 2"
        expectedResult:
          - "Expected result 1"
          - "Expected result 2"
        notes: ""
```

#### 4. Update the Manifest

Edit `test-suite-ui/public/test-suites/manifest.json`:

```json
{
  "testSuites": [
    {
      "id": "password-management",
      "file": "authn/password-management.yaml",
      "category": "Authentication"
    },
    {
      "id": "your-new-suite",
      "file": "category/your-new-suite.yaml",
      "category": "Category Name"
    }
  ]
}
```

**Fields:**
- `id`: Unique identifier (kebab-case, matches filename without extension)
- `file`: Path relative to `test-suites/` folder
- `category`: Display name for grouping in UI

#### 5. Validate the YAML

**Check for:**
- Valid YAML syntax (proper indentation, no tabs)
- All required fields present
- IDs are unique within the file
- Prerequisite references match actual prerequisite IDs
- Date format is YYYY-MM-DD

**Common Errors:**
- Tabs instead of spaces (YAML requires spaces)
- Missing colons after keys
- Incorrect array syntax
- Unclosed quotes

---

## Extending Existing Test Suites

### Adding New Test Scenarios

To add a new scenario to an existing suite:

1. **Add to testScenarios array:**

```yaml
testScenarios:
  - id: "TC-01"
    # ... existing scenario
  - id: "TC-02"              # New scenario
    title: "New Scenario Title"
    description: "What this new scenario tests"
    testCases:
      - testId: "TC-02.1"
        title: "First test case"
        # ... rest of test case
```

2. **Update lastUpdated in metadata:**

```yaml
metadata:
  lastUpdated: "2025-12-10"  # Update to today's date
```

### Adding New Test Cases to Existing Scenario

```yaml
testScenarios:
  - id: "TC-01"
    testCases:
      - testId: "TC-01.1"
        # ... existing test case
      - testId: "TC-01.2"     # New test case
        title: "New Test Case"
        prerequisiteReference: "Continues from TC-01.1"
        # ... rest of test case
```

### Adding New Prerequisites

```yaml
prerequisites:
  - id: "PRE-01"
    # ... existing prerequisite
  - id: "PRE-02"              # New prerequisite
    dataObject: "New prerequisite description"
    steps:
      - "Step 1"
      - "Step 2"
```

### Adding New Variables

```yaml
testVariables:
  - category: "Existing Category"
    variables:
      - name: "[ExistingVar]"
        # ... existing variable
      - name: "[NewVar]"      # New variable
        actualValue: ""
        notes: "What this variable is for"
```

### Adding New User Accounts

```yaml
preSetup:
  userAccounts:
    - prerequisite: "PRE-01"
      # ... existing account
    - prerequisite: "PRE-02"   # New account type
      quantity: 2
      notes: "Description of new account type"
```

---

## File Organization

### Directory Structure

```
test-suite-ui/public/test-suites/
├── manifest.json                    # Master list of all suites
├── authn/                           # Authentication category
│   ├── password-management.yaml
│   ├── login-flow.yaml
│   └── mfa-setup.yaml
├── payments/                        # Payments category
│   ├── checkout-process.yaml
│   └── refund-flow.yaml
└── reporting/                       # Reporting category
    └── export-reports.yaml
```

### Naming Conventions

**Folders (Categories):**
- Use lowercase, short names: `authn`, `payments`, `reporting`
- Be consistent across the project
- Use plural for categories with multiple suites

**Files:**
- Use kebab-case: `password-management.yaml`
- Be descriptive: `checkout-process.yaml` not `checkout.yaml`
- Match the main feature being tested

**IDs:**
- Test Suite ID: Matches filename (without extension)
- Prerequisite IDs: `PRE-01`, `PRE-02`, etc.
- Scenario IDs: `TC-01`, `TC-02`, etc.
- Test Case IDs: `TC-01.1`, `TC-01.2`, etc.

---

## Manifest Configuration

### Manifest File Location

```
test-suite-ui/public/test-suites/manifest.json
```

### Manifest Structure

```json
{
  "testSuites": [
    {
      "id": "unique-suite-id",
      "file": "category/filename.yaml",
      "category": "Display Category Name"
    }
  ]
}
```

### Adding Entries

**Required Fields:**
- `id`: Must be unique across all suites
- `file`: Relative path from `test-suites/` folder
- `category`: Display name (can be same for multiple suites)

**Example:**

```json
{
  "testSuites": [
    {
      "id": "password-management",
      "file": "authn/password-management.yaml",
      "category": "Authentication"
    },
    {
      "id": "login-flow",
      "file": "authn/login-flow.yaml",
      "category": "Authentication"
    },
    {
      "id": "checkout-process",
      "file": "payments/checkout-process.yaml",
      "category": "Payments"
    }
  ]
}
```

**Important:**
- Keep entries sorted by category for easier maintenance
- Ensure `file` path matches actual file location
- `id` should match filename (without extension)

---

## YAML to HTML Mapping

Understanding how YAML fields render in the UI helps when creating test suites.

### Metadata Section

```yaml
metadata:
  title: "Password Management"
```

**Renders as:**
- Main page heading (h1)
- Card title in list view
- Page title in browser tab

### Feature Information

```yaml
featureInformation:
  feature: "Full description"
  details: ["Detail 1", "Detail 2"]
```

**Renders as:**
- Feature description paragraph
- Bulleted list of details

### Pre-Setup Section

```yaml
preSetup:
  purpose: "Setup purpose"
  tenantSetup: ["Item 1"]
  userAccounts: [...]
  checklistItems: ["Item 1"]
```

**Renders as:**
- Purpose paragraph
- Tenant setup bulleted list
- User accounts table (Prerequisite | Quantity | Notes)
- Checklist with checkboxes

### Execution Matrix

```yaml
executionMatrix:
  matrix:
    - userType: "Employee"
      platform: "Web"
      variableSet: "[Var1], [Var2]"
      executionStatus: "Incomplete"
```

**Renders as:**
- Important note (highlighted box)
- Matrix table (User Type | Platform | Variable Set | Status)
- Instructions numbered list
- Execution flow numbered list

### Prerequisites

```yaml
prerequisites:
  - id: "PRE-01"
    dataObject: "Description"
    steps: ["Step 1", "Step 2"]
```

**Renders as:**
- Table (ID | Data Object | Steps)
- Steps shown as numbered list within table cell

### Test Variables

```yaml
testVariables:
  - category: "Category Name"
    variables:
      - name: "[VarName]"
        actualValue: ""
        notes: "Notes"
```

**Renders as:**
- Category heading (h3)
- Table per category (Variable | Actual Value | Notes)
- Variable names shown in code font

### Test Scenarios

```yaml
testScenarios:
  - id: "TC-01"
    title: "Scenario Title"
    description: "Description"
    testCases:
      - testId: "TC-01.1"
        title: "Test Case Title"
        actionSteps: ["Step 1"]
        expectedResult: ["Result 1"]
```

**Renders as:**
- Scenario heading: "TC-01: Scenario Title"
- Description paragraph
- Large table with columns:
  - Test ID (bold, colored)
  - Title
  - Prerequisite Reference
  - Action Steps (numbered list)
  - Expected Result (bulleted list)
  - Notes

---

## Common Patterns and Examples

### Pattern 1: Simple Feature Test

```yaml
metadata:
  title: "Feature Name Test Suite"
  feature: "Feature Name"
  status: "Draft"

featureInformation:
  feature: "Tests the Feature Name functionality"
  details:
    - "Basic happy path"
    - "Error handling"

preSetup:
  purpose: "Minimal setup required"
  tenantSetup: []
  userAccounts: []
  checklistItems: []

executionMatrix:
  important: ""
  matrix: []
  instructions: []
  executionFlow: []

prerequisites: []
testVariables: []

testScenarios:
  - id: "TC-01"
    title: "Basic Functionality"
    description: "Tests basic feature functionality"
    testCases:
      - testId: "TC-01.1"
        title: "Happy Path"
        prerequisiteReference: "None"
        actionSteps:
          - "Navigate to feature"
          - "Perform action"
        expectedResult:
          - "Feature works correctly"
        notes: ""
```

### Pattern 2: Multi-User, Multi-Platform Test

```yaml
metadata:
  title: "Multi-Platform Feature Test"
  feature: "Feature Name"
  status: "Draft"

preSetup:
  userAccounts:
    - prerequisite: "PRE-01"
      quantity: 1
      notes: "Web user"
    - prerequisite: "PRE-02"
      quantity: 1
      notes: "Mobile user"

executionMatrix:
  matrix:
    - userType: "Web User"
      platform: "Web Browser"
      variableSet: "[WebVar1], [WebVar2]"
      executionStatus: "Incomplete"
    - userType: "Mobile User"
      platform: "Mobile App"
      variableSet: "[MobileVar1]"
      executionStatus: "Incomplete"

prerequisites:
  - id: "PRE-01"
    dataObject: "Web User Account"
    steps:
      - "Create web user"
  - id: "PRE-02"
    dataObject: "Mobile User Account"
    steps:
      - "Create mobile user"

testVariables:
  - category: "Web User Variables"
    variables:
      - name: "[WebVar1]"
        actualValue: ""
        notes: "Web variable"
  - category: "Mobile User Variables"
    variables:
      - name: "[MobileVar1]"
        actualValue: ""
        notes: "Mobile variable"
```

### Pattern 3: Sequential Test Cases

```yaml
testScenarios:
  - id: "TC-01"
    title: "Sequential Flow"
    description: "Tests a multi-step flow"
    testCases:
      - testId: "TC-01.1"
        title: "Step 1: Initial Setup"
        prerequisiteReference: "Uses PRE-01"
        actionSteps:
          - "Perform initial action"
        expectedResult:
          - "Initial state achieved"
        notes: ""
      - testId: "TC-01.2"
        title: "Step 2: Main Action"
        prerequisiteReference: "Continues from TC-01.1"
        actionSteps:
          - "Perform main action"
        expectedResult:
          - "Main action succeeds"
        notes: ""
      - testId: "TC-01.3"
        title: "Step 3: Verification"
        prerequisiteReference: "Continues from TC-01.2"
        actionSteps:
          - "Verify results"
        expectedResult:
          - "Results are correct"
        notes: ""
```

### Pattern 4: Error Handling Tests

```yaml
testScenarios:
  - id: "TC-01"
    title: "Error Handling"
    description: "Tests various error conditions"
    testCases:
      - testId: "TC-01.1"
        title: "Invalid Input"
        prerequisiteReference: "Uses PRE-01"
        actionSteps:
          - "Enter invalid data"
          - "Submit form"
        expectedResult:
          - "Error message displayed"
          - "Form not submitted"
        notes: ""
      - testId: "TC-01.2"
        title: "Missing Required Field"
        prerequisiteReference: "Uses PRE-01"
        actionSteps:
          - "Leave required field empty"
          - "Submit form"
        expectedResult:
          - "Validation error shown"
          - "Field highlighted"
        notes: ""
```

---

## Best Practices

### YAML Writing

1. **Use spaces, not tabs** - YAML requires spaces for indentation
2. **Consistent indentation** - Use 2 spaces per level
3. **Quote strings with special characters** - Use quotes if string contains `:`, `[`, `]`, etc.
4. **Keep arrays consistent** - All items should follow same structure
5. **Use descriptive IDs** - Make IDs meaningful (TC-01 for first scenario)

### Content Writing

1. **Clear action steps** - Write steps as commands: "Click button" not "Button is clicked"
2. **Specific expected results** - Be precise: "Error message 'Invalid input' appears" not "Error shown"
3. **Logical flow** - Test cases should flow logically from one to next
4. **Complete prerequisites** - Include all setup steps needed
5. **Update dates** - Always update `lastUpdated` when modifying

### Organization

1. **Group related scenarios** - Keep related test scenarios together
2. **Consistent naming** - Use same naming patterns across suites
3. **Logical test case ordering** - Order test cases in execution sequence
4. **Complete metadata** - Fill in all metadata fields
5. **Meaningful categories** - Use categories that make sense for your domain

### Maintenance

1. **Update lastUpdated** - Always update when making changes
2. **Version control** - Commit YAML files to git
3. **Review before marking Approved** - Don't mark as Approved until reviewed
4. **Keep manifest in sync** - Update manifest.json when adding suites
5. **Document complex setups** - Add detailed notes for complex prerequisites

---

## Quick Reference

### Required Fields Checklist

**metadata:**
- [ ] title
- [ ] feature
- [ ] createdBy
- [ ] dateCreated
- [ ] lastUpdated
- [ ] status

**featureInformation:**
- [ ] feature
- [ ] details (array)

**preSetup:**
- [ ] purpose
- [ ] tenantSetup (array)
- [ ] userAccounts (array)
- [ ] checklistItems (array)

**executionMatrix:**
- [ ] important
- [ ] matrix (array)
- [ ] instructions (array)
- [ ] executionFlow (array)

**testScenarios:**
- [ ] id
- [ ] title
- [ ] description
- [ ] testCases (array)
  - [ ] testId
  - [ ] title
  - [ ] prerequisiteReference
  - [ ] actionSteps (array)
  - [ ] expectedResult (array)
  - [ ] notes

### Common YAML Syntax

```yaml
# String
key: "value"

# Number
quantity: 2

# Boolean (use strings)
status: "Draft"

# Array
items:
  - "Item 1"
  - "Item 2"

# Nested object
user:
  name: "John"
  role: "Admin"

# Multi-line string (use |)
description: |
  This is a multi-line
  description that preserves
  line breaks.
```

### ID Naming Patterns

- **Prerequisites**: `PRE-01`, `PRE-02`, `PRE-03`
- **Scenarios**: `TC-01`, `TC-02`, `TC-03`
- **Test Cases**: `TC-01.1`, `TC-01.2`, `TC-02.1`
- **Test Suite ID**: Matches filename (kebab-case)

---

## Troubleshooting

### Common Errors

**"YAML parse error"**
- Check indentation (must use spaces, not tabs)
- Verify all colons have values
- Check for unclosed quotes

**"Test suite not appearing"**
- Verify manifest.json entry exists
- Check file path matches manifest entry
- Ensure file is in correct category folder

**"Prerequisite not found"**
- Verify prerequisite ID exists in prerequisites array
- Check spelling matches exactly
- Ensure prerequisite is defined before being referenced

**"Variable not found"**
- Check variable name spelling
- Verify variable is in correct category
- Ensure brackets are included: `[VariableName]`

### Validation Tips

1. **Use a YAML validator** - Online tools can catch syntax errors
2. **Test locally** - Use `npm run dev` to test before committing
3. **Check console** - Browser console shows fetch errors
4. **Verify paths** - Ensure file paths in manifest match actual files

---

## Example: Complete Test Suite

See `test-suite-ui/public/test-suites/authn/password-management.yaml` for a complete, real-world example that demonstrates all features and patterns.

---

## Summary

When creating or extending test suites:

1. **Choose appropriate category folder**
2. **Use the template structure**
3. **Follow naming conventions**
4. **Update manifest.json**
5. **Validate YAML syntax**
6. **Test locally before committing**
7. **Update lastUpdated date**

This guide provides everything needed to work with the Test Suite Viewer YAML format. For questions or clarifications, refer to the example file or the YAML schema documentation.

