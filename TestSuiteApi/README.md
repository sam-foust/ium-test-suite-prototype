# Test Suite API

.NET 8 Web API for serving test suite data from YAML files.

## Requirements

- .NET 8 SDK or later

## Installation

```bash
dotnet restore
```

## Running the API

```bash
dotnet run
```

The API will start on `http://localhost:5000` (or as configured).

## Endpoints

### GET /api/testsuites
Returns a list of all test suites with basic information.

**Response:**
```json
[
  {
    "id": "password-management",
    "title": "Password Management Regression Test Suite",
    "feature": "Password Management",
    "status": "Draft",
    "lastUpdated": "2025-12-09"
  }
]
```

### GET /api/testsuites/{id}
Returns the full details of a specific test suite.

**Response:**
```json
{
  "id": "password-management",
  "metadata": { ... },
  "featureInformation": { ... },
  "preSetup": { ... },
  "executionMatrix": { ... },
  "prerequisites": [ ... ],
  "testVariables": [ ... ],
  "testScenarios": [ ... ]
}
```

## Adding New Test Suites

1. Create a new YAML file in `Assets/TestSuites/`
2. Follow the schema defined in the root `YAML_SCHEMA.md`
3. The file name (without extension) will be used as the test suite ID
4. Restart the API to load the new test suite

## Development

The API uses:
- YamlDotNet for YAML parsing
- ASP.NET Core Web API
- CORS enabled for local React development

