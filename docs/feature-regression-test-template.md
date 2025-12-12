# [Feature Name] Regression Test Suite


---

## Feature Information

**Feature to Document:** [Brief description of the feature being tested]

**Specific Details/Edge Cases to include:** 
- **TC-01 - [Test Case Name]:** [Brief description of what this test covers]
- **TC-02 - [Test Case Name]:** [Brief description of what this test covers]
- **TC-03 - [Test Case Name]:** [Brief description of what this test covers]
- **Platform Coverage:** [e.g., Web browser, Mobile, Desktop, API, etc.]
- **Key Validation Points:** [e.g., Data integrity, error handling, user permissions, etc.]

---

## Test Execution Matrix

**Tests for [User Type 1] and [User Type 2]:**
- TC-01: [Test Case Name]
- TC-02: [Test Case Name]
- TC-03: [Test Case Name]

**Note:** [Add any notes about test execution, e.g., "When doing manual testing, executing TC-01 through TC-03 with either user type is sufficient"]

**[User Type]-Only Tests:**
- TC-XX: [Test Case Name] ([User Type] only)

---

## Part 1: Prerequisites Library (Setup Data)

Define the specific user states or data setups required. Complex setups are written once here and referenced in Part 2.

**Important Business Logic:** [Add any critical business logic notes that explain why certain prerequisites are set up in a specific way]

| ID | Data Object | Steps to Create |
|---|---|---|
| PRE-00 | [Setup Name] | 1. [Step 1]<br>2. [Step 2]<br>3. [Step 3] |
| PRE-01 | [User/Data Type 1] | 1. Complete PRE-00<br>2. [Step 1]<br>3. [Step 2]<br>4. [Step 3]<br>**Note:** [Any important notes about this prerequisite] |
| PRE-02 | [User/Data Type 2] | 1. Complete PRE-00<br>2. [Step 1]<br>3. [Step 2]<br>4. [Step 3]<br>**Note:** [Any important notes about this prerequisite] |

---

## Test Variables Tracker

Use this section to document actual values used during test execution.

### PRE-01 Variables ([User Type 1]):
| Variable | Actual Value | Notes |
|---|---|---|
| [Variable1] | | [Description] |
| [Variable2] | | [Description] |
| [Variable3] | | [Description] |

### PRE-02 Variables ([User Type 2]):
| Variable | Actual Value | Notes |
|---|---|---|
| [Variable1] | | [Description] |
| [Variable2] | | [Description] |
| [Variable3] | | [Description] |

**Note:** [Add notes about shared variables or variable relationships]


---

## Part 2: Test Scenarios

Actual manual test cases that reference prerequisites from Part 1.

### TC-01: [Test Case Name]

[Brief description of what this test case validates]

**Note:** [Optional: Add any scope limitations or special notes about this test case]

| Test ID | Prerequisite Reference | Action Steps | Expected Result | Pass/Fail | Notes |
|---|---|---|---|---|---|
| TC-01.1 | Uses PRE-01 or PRE-02 | 1. [Step 1]<br>2. [Step 2]<br>3. [Step 3] | - [Expected outcome 1]<br>- [Expected outcome 2]<br>- [Expected outcome 3] | [ ] Pass<br>[ ] Fail | |
| TC-01.2 | Continues from TC-01.1 | 1. [Step 1]<br>2. [Step 2]<br>3. [Step 3] | - [Expected outcome 1]<br>- [Expected outcome 2]<br>- [Expected outcome 3] | [ ] Pass<br>[ ] Fail | |
| TC-01.3 | Continues from TC-01.2 | 1. [Step 1]<br>2. [Step 2]<br>3. [Step 3] | - [Expected outcome 1]<br>- [Expected outcome 2]<br>- [Expected outcome 3] | [ ] Pass<br>[ ] Fail | |

### TC-02: [Test Case Name]

[Brief description of what this test case validates]

| Test ID | Prerequisite Reference | Action Steps | Expected Result | Pass/Fail | Notes |
|---|---|---|---|---|---|
| TC-02.1 | Uses PRE-01 or PRE-02 | 1. [Step 1]<br>2. [Step 2]<br>3. [Step 3] | - [Expected outcome 1]<br>- [Expected outcome 2]<br>- [Expected outcome 3] | [ ] Pass<br>[ ] Fail | |
| TC-02.2 | Continues from TC-02.1 | 1. [Step 1]<br>2. [Step 2]<br>3. [Step 3] | - [Expected outcome 1]<br>- [Expected outcome 2]<br>- [Expected outcome 3] | [ ] Pass<br>[ ] Fail | |

### TC-03: [Test Case Name]

[Brief description of what this test case validates]

| Test ID | Prerequisite Reference | Action Steps | Expected Result | Pass/Fail | Notes |
|---|---|---|---|---|---|
| TC-03.1 | Uses PRE-01 or PRE-02 | 1. [Step 1]<br>2. [Step 2]<br>3. [Step 3] | - [Expected outcome 1]<br>- [Expected outcome 2]<br>- [Expected outcome 3] | [ ] Pass<br>[ ] Fail | |
| TC-03.2 | Continues from TC-03.1 | 1. [Step 1]<br>2. [Step 2]<br>3. [Step 3] | - [Expected outcome 1]<br>- [Expected outcome 2]<br>- [Expected outcome 3] | [ ] Pass<br>[ ] Fail | |

---

## Testing Suite Status

- **Created By:** [Your Name]
- **Date Created:** [Date]
- **Last Updated:** [Date]
- **Test Cycle:** [Feature Name] Regression
- **Status:** [ ] Draft | [ ] Review | [ ] Approved | [ ] Executed

---

## Instructions for Using This Template

1. **Copy this template** to create a new feature test document
2. **Replace all placeholder text** in brackets [like this] with your feature-specific content
3. **Update Feature Information** section with your feature details and test case summaries
4. **Define Prerequisites** in Part 1 - be specific about setup steps and business logic
5. **Document Variables** - track all test data variables in the Variables Tracker section
6. **Write Test Scenarios** in Part 2 - break down into logical test cases with clear steps
7. **Remove this instruction section** when you're done filling out the template

### Tips for Writing Good Test Cases:
- Keep action steps clear and numbered
- Include expected results for each test step
- Reference prerequisites instead of repeating setup instructions
- Use variables [like this] for test data that may change
- Add business logic notes where setup explains important system behavior
- Note any scope limitations or complex flows reserved for separate documents
