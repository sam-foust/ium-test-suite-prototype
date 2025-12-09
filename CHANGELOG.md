# Changelog

All notable changes to the Test Suite Viewer project.

## [1.0.0] - 2025-12-09

### Initial Release - MVP

#### Added

**Backend (TestSuiteApi)**
- .NET 8 Web API project structure
- YAML parsing using YamlDotNet library
- RESTful API with two endpoints:
  - GET /api/testsuites - List all test suites
  - GET /api/testsuites/{id} - Get specific test suite
- Complete C# models for test suite data structure
- TestSuiteService for reading and parsing YAML files
- CORS configuration for local development
- Swagger documentation support
- Launch settings for consistent development experience

**Frontend (test-suite-ui)**
- React 18 + TypeScript + Vite project setup
- React Router for client-side navigation
- Axios HTTP client for API communication
- Complete TypeScript type definitions
- Components:
  - TestSuiteList: Card-based list view
  - TestSuiteDetail: Comprehensive detail view
- Pages:
  - HomePage: Main landing page with test suite list
  - TestSuitePage: Individual test suite detail page
- Professional CSS styling with:
  - Responsive design
  - Status badges
  - Clean table layouts
  - Modern color scheme
  - Card-based UI

**Documentation**
- README.md: Comprehensive project documentation
- QUICK_START.md: Step-by-step getting started guide
- YAML_SCHEMA.md: Complete YAML schema documentation
- PROJECT_SUMMARY.md: High-level project overview
- TestSuiteApi/README.md: Backend-specific documentation
- test-suite-ui/README.md: Frontend-specific documentation

**Example Content**
- password-management.yaml: Complete example test suite
- Converted from original markdown template

**Configuration**
- .gitignore: Proper ignore rules for .NET and Node.js
- package.json: Frontend dependencies and scripts
- TestSuiteApi.csproj: Backend dependencies
- vite.config.ts: Frontend build configuration
- tsconfig.json: TypeScript configuration
- launchSettings.json: API launch configuration

#### Technical Details

**Dependencies**
- Backend:
  - .NET 8.0
  - YamlDotNet 16.2.0
- Frontend:
  - React 18.3.1
  - React Router 6.26.1
  - Axios 1.7.4
  - TypeScript 5.2.2
  - Vite 5.3.1

**Features**
- Read-only test suite viewer
- YAML-based test definitions
- RESTful API architecture
- Type-safe frontend
- Responsive UI design
- Status badge system (Draft, Review, Approved, Executed)
- Comprehensive test case display with:
  - Metadata
  - Feature information
  - Pre-setup instructions
  - Execution matrix
  - Prerequisites
  - Test variables
  - Test scenarios and cases

**Performance**
- Fast file-based reads
- No database overhead
- Instant page loads with Vite HMR
- Efficient YAML parsing

#### Known Limitations

- No test run recording (future enhancement)
- No user authentication (future enhancement)
- No search/filter functionality (future enhancement)
- File-based storage only (no database)
- Manual API restart required when adding new YAML files

#### File Structure

```
Project Root
├── TestSuiteApi/          (.NET 8 Backend)
├── test-suite-ui/         (React Frontend)
├── YAML_SCHEMA.md
├── password-management.yaml
├── README.md
├── QUICK_START.md
└── PROJECT_SUMMARY.md
```

#### Next Steps

See PROJECT_SUMMARY.md for planned enhancements and future development roadmap.

---

## Future Versions (Planned)

### [2.0.0] - TBD
- Test run recording functionality
- User authentication and authorization
- Database integration for test history

### [2.1.0] - TBD
- Search and filter capabilities
- Advanced reporting features
- Export to PDF/Excel

### [3.0.0] - TBD
- Real-time collaboration
- CI/CD integration
- Mobile app support

