# Test Suite YAML Schema Documentation

## Overview
This document describes the YAML schema used for defining manual test suites in the test management system.

## Schema Structure

```yaml
metadata:
  title: string                    # Title of the test suite
  feature: string                  # Feature name being tested
  createdBy: string                # Author name
  dateCreated: string              # ISO date string
  lastUpdated: string              # ISO date string
  status: string                   # One of: Draft, Review, Approved, Executed

featureInformation:
  feature: string                  # Feature description
  details: string[]                # List of specific details and edge cases

preSetup:
  purpose: string                  # Purpose of pre-setup
  tenantSetup: string[]            # Tenant setup requirements
  userAccounts:                    # List of user accounts to create
    - prerequisite: string
      quantity: number
      notes: string
  checklistItems: string[]         # Setup completion checklist

executionMatrix:
  important: string                # Important notes
  matrix:                          # Test execution matrix
    - userType: string
      platform: string
      variableSet: string
      executionStatus: string
  instructions: string[]           # Testing instructions
  executionFlow: string[]          # Execution flow steps

prerequisites:                     # Prerequisites library
  - id: string                     # Prerequisite ID (e.g., PRE-01)
    dataObject: string             # Description of data object
    steps: string[]                # Steps to create

testVariables:                     # Test variables tracker
  - category: string               # Variable category name
    variables:
      - name: string               # Variable name (e.g., [Username1])
        actualValue: string        # Actual value (empty initially)
        notes: string              # Notes about the variable

testScenarios:                     # Test scenarios
  - id: string                     # Test scenario ID (e.g., TC-01)
    title: string                  # Test scenario title
    description: string            # Test scenario description
    testCases:                     # Individual test cases
      - testId: string             # Test case ID (e.g., TC-01.1)
        title: string              # Test case title
        prerequisiteReference: string  # Reference to prerequisite
        actionSteps: string[]      # List of action steps
        expectedResult: string[]   # List of expected results
        notes: string              # Optional notes
```

## Example Usage

See `password-management.yaml` for a complete example based on the Password Management Regression Test Suite.

## Validation Rules

1. **Required Fields**: metadata.title, metadata.feature, metadata.createdBy, metadata.dateCreated
2. **Status Values**: Must be one of: Draft, Review, Approved, Executed
3. **IDs**: Should follow consistent naming (PRE-XX for prerequisites, TC-XX for test scenarios)
4. **Arrays**: Can be empty but should be present in the structure

## Benefits of YAML Format

- **Human-readable**: Easy to read and edit manually
- **Version control friendly**: Works well with Git
- **Structured**: Enforces consistent test suite format
- **Extensible**: Easy to add new fields without breaking existing suites

