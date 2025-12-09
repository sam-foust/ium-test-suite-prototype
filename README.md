# Test Suite Viewer

A modern, static web application for viewing manual test suites. Test suites are defined in YAML files and displayed in a beautiful React interface. Automatically deploys to GitHub Pages!

## 🚀 Quick Start

### View Live Demo

After deploying to GitHub Pages, your site will be at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

### Local Development

```bash
cd test-suite-ui
npm install
npm run dev
```

Opens at `http://localhost:5173`

## ✨ Features

- ✅ **Fully Static** - No backend needed, deploys to GitHub Pages for free
- ✅ **YAML-Based** - Easy to edit test suites in version control
- ✅ **Auto-Deploy** - Push to main, site updates automatically
- ✅ **Beautiful UI** - Professional, responsive React interface
- ✅ **Fast** - CDN-served, browser-cached, instant loads
- ✅ **Type-Safe** - Full TypeScript support

## 📁 Project Structure

```
ium-test-suite-prototype/
├── test-suite-ui/                    # React Frontend (deployed to GitHub Pages)
│   ├── public/
│   │   └── test-suites/
│   │       ├── manifest.json         # Lists all test suites
│   │       └── *.yaml                # Test suite files
│   ├── src/
│   │   ├── components/               # React components
│   │   ├── services/
│   │   │   └── api.ts               # Fetches & parses YAML
│   │   └── types/                   # TypeScript types
│   └── dist/                        # Built files (auto-generated)
│
├── .github/
│   └── workflows/
│       └── deploy.yml               # GitHub Actions deployment
│
├── TestSuiteApi/                    # Backend (archived - not needed)
├── DEPLOYMENT.md                    # Deployment guide
├── YAML_SCHEMA.md                   # Test suite schema
└── README.md                        # This file
```

## 🎯 How It Works

**Architecture:**
```
User Browser
    ↓
React App Loads
    ↓
Fetch manifest.json (list of test suites)
    ↓
Fetch test-suite.yaml
    ↓
Parse YAML with js-yaml
    ↓
Render Beautiful UI
```

**No backend, no API, all static!**

## 📝 Adding Test Suites

### 1. Create YAML File

Create a new test suite following the schema in [`YAML_SCHEMA.md`](YAML_SCHEMA.md):

```yaml
metadata:
  title: "My Test Suite"
  feature: "Feature Name"
  createdBy: "Your Name"
  dateCreated: "2025-12-09"
  lastUpdated: "2025-12-09"
  status: "Draft"

testScenarios:
  - id: "TC-01"
    title: "Test Scenario"
    testCases:
      - testId: "TC-01.1"
        title: "Test Case"
        actionSteps:
          - "Step 1"
        expectedResult:
          - "Result 1"
```

### 2. Add to Public Folder

```bash
# Place file in:
test-suite-ui/public/test-suites/my-test-suite.yaml
```

### 3. Update Manifest

Edit [`test-suite-ui/public/test-suites/manifest.json`](test-suite-ui/public/test-suites/manifest.json):

```json
{
  "testSuites": [
    {
      "id": "password-management",
      "file": "password-management.yaml"
    },
    {
      "id": "my-test-suite",
      "file": "my-test-suite.yaml"
    }
  ]
}
```

### 4. Commit and Push

```bash
git add .
git commit -m "Add My Test Suite"
git push origin main
```

**Done!** GitHub Actions will automatically rebuild and deploy (~2 minutes).

## 🚀 Deployment

See [`DEPLOYMENT.md`](DEPLOYMENT.md) for complete deployment instructions.

### Quick Setup

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: **GitHub Actions**
   - Save

3. **Done!**
   - Site deploys automatically
   - Available at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## 🛠️ Development

### Install Dependencies

```bash
cd test-suite-ui
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Test Locally

1. Build: `npm run build`
2. Preview: `npm run preview`
3. Open: `http://localhost:4173`

## 📦 Technologies

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing
- **js-yaml** - YAML parsing in browser

### Deployment
- **GitHub Actions** - CI/CD
- **GitHub Pages** - Free hosting

### No Backend Required!
- All processing happens in the browser
- YAML files are fetched and parsed client-side
- Perfect for read-only test documentation

## 🎨 UI Features

- **Card-based test suite list** with status badges
- **Comprehensive detail views** with all test information
- **Responsive design** - works on desktop and mobile
- **Clean tables** for test cases and execution matrices
- **Status badges** - Draft, Review, Approved, Executed
- **Easy navigation** with React Router

## 📖 Documentation

- [`DEPLOYMENT.md`](DEPLOYMENT.md) - How to deploy to GitHub Pages
- [`YAML_SCHEMA.md`](YAML_SCHEMA.md) - Test suite YAML format
- [`QUICK_START.md`](QUICK_START.md) - Getting started guide
- [`PROJECT_SUMMARY.md`](PROJECT_SUMMARY.md) - Technical overview

## 🎯 Use Cases

Perfect for:
- ✅ Manual test documentation
- ✅ QA team test case management
- ✅ Regression test suites
- ✅ Test execution guides
- ✅ Internal documentation sites

## 💡 Benefits

### For QA/Testers
- Easy-to-read test documentation
- Clear step-by-step instructions
- Pre-setup checklists
- Execution matrices
- Variable tracking

### For Teams
- Version controlled (Git)
- Easy to update (just edit YAML)
- Free hosting (GitHub Pages)
- Automatic deployment
- No maintenance

### For Developers
- Type-safe codebase
- Modern React/TypeScript
- Fast development with Vite HMR
- Simple architecture
- Easy to extend

## 🔐 Security

- ✅ No backend = No server vulnerabilities
- ✅ Static files only = Minimal attack surface
- ✅ HTTPS enforced by GitHub Pages
- ✅ GitHub's infrastructure security

⚠️ **Note**: All files are publicly accessible. Don't include sensitive data!

## 💰 Cost

**FREE!** 

GitHub Pages free tier:
- 1GB storage
- 100GB bandwidth/month
- Unlimited public repositories

Perfect for test documentation!

## 🤝 Contributing

1. Create YAML test suite
2. Place in `test-suite-ui/public/test-suites/`
3. Update `manifest.json`
4. Commit and push
5. Auto-deploys!

## 📈 Future Enhancements

Possible additions (not in current version):
- Test run recording (would need backend/database)
- Search and filter functionality
- Export to PDF/Excel
- User authentication
- Test execution tracking

## ⚡ Performance

- **Fast**: Static files served from CDN
- **Cached**: Browser caches YAML files
- **Small**: ~200KB gzipped
- **Instant**: No API round-trips

## 🎓 Example

See [`password-management.yaml`](test-suite-ui/public/test-suites/password-management.yaml) for a complete example test suite.

## 📞 Support

- Check [`DEPLOYMENT.md`](DEPLOYMENT.md) for deployment issues
- See [`YAML_SCHEMA.md`](YAML_SCHEMA.md) for YAML format questions
- Review GitHub Actions logs in the **Actions** tab

## ✅ Success Criteria

✅ **Frontend loads YAML files directly**  
✅ **No API or backend needed**  
✅ **Deploys to GitHub Pages automatically**  
✅ **Free hosting forever**  
✅ **Easy to add new test suites**  
✅ **Mobile responsive**  
✅ **Professional UI**  

---

**Ready to deploy? See [`DEPLOYMENT.md`](DEPLOYMENT.md)**

Built with ❤️ for better manual testing workflows

```
ium-test-suite-prototype/
├── TestSuiteApi/              # .NET 8 Web API Backend
│   ├── Controllers/           # API controllers
│   ├── Models/               # Data models
│   ├── Services/             # Business logic
│   ├── Assets/TestSuites/    # YAML test suite files
│   └── TestSuiteApi.csproj   # .NET project file
├── test-suite-ui/            # React Frontend
│   ├── src/                  # Source code
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx          # Main app
│   └── package.json         # npm dependencies
├── YAML_SCHEMA.md           # YAML schema documentation
├── password-management.yaml  # Example test suite
└── README.md                # This file
```

## Features

✅ **Read-Only Test Suite Viewer**
- Browse all available test suites
- View detailed test case information
- Clean, professional UI with responsive design
- Status badges and organized sections

✅ **YAML-Based Test Definitions**
- Easy to edit and version control
- Human-readable format
- Structured schema for consistency

✅ **Modern Tech Stack**
- .NET 8 Web API backend
- React 18 + TypeScript frontend
- Vite for fast development
- No database required (files as source of truth)

## Getting Started

### Prerequisites

- .NET 8 SDK
- Node.js 18+ and npm

### Installation

1. **Clone the repository**
   ```bash
   cd C:\ServiceTitan\src\ium-test-suite-prototype
   ```

2. **Install Backend Dependencies**
   ```bash
   cd TestSuiteApi
   dotnet restore
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../test-suite-ui
   npm install
   ```

### Running the Application

1. **Start the Backend API**
   ```bash
   cd TestSuiteApi
   dotnet run
   ```
   
   The API will start on `http://localhost:5000` (or as configured in launchSettings.json)

2. **Start the Frontend** (in a new terminal)
   ```bash
   cd test-suite-ui
   npm run dev
   ```
   
   The UI will start on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## Adding New Test Suites

1. Create a new YAML file in `TestSuiteApi/Assets/TestSuites/`
2. Follow the schema defined in `YAML_SCHEMA.md`
3. Use `password-management.yaml` as a reference example
4. The file name (without extension) becomes the test suite ID
5. Restart the API to load the new test suite

### YAML Schema Overview

```yaml
metadata:
  title: "Your Test Suite Title"
  feature: "Feature Name"
  createdBy: "Author Name"
  dateCreated: "YYYY-MM-DD"
  lastUpdated: "YYYY-MM-DD"
  status: "Draft|Review|Approved|Executed"

featureInformation:
  feature: "Description"
  details: []

preSetup:
  purpose: "Setup purpose"
  tenantSetup: []
  userAccounts: []
  checklistItems: []

executionMatrix:
  important: "Important note"
  matrix: []
  instructions: []
  executionFlow: []

prerequisites: []
testVariables: []
testScenarios: []
```

See `YAML_SCHEMA.md` for complete documentation.

## API Endpoints

### GET `/api/testsuites`
Returns a list of all test suites with summary information.

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

### GET `/api/testsuites/{id}`
Returns the complete details of a specific test suite.

**Example:** `/api/testsuites/password-management`

## Development

### Backend (TestSuiteApi)

- **Framework**: .NET 8 Web API
- **YAML Parser**: YamlDotNet
- **CORS**: Enabled for local React development
- **Port**: 5000 (default)

### Frontend (test-suite-ui)

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Router**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Custom CSS (no framework dependencies)
- **Port**: 5173 (default)

## Architecture

```
┌─────────────┐         HTTP          ┌──────────────┐
│             │    (REST API)         │              │
│   React     │ ◄─────────────────► │  .NET 8 API  │
│  Frontend   │   JSON responses      │              │
│             │                       │              │
└─────────────┘                       └──────┬───────┘
                                             │
                                             │ Reads
                                             ▼
                                      ┌─────────────┐
                                      │   YAML      │
                                      │   Files     │
                                      └─────────────┘
```

## Future Enhancements (Out of Scope for MVP)

- 🔲 Test run recording functionality
- 🔲 User authentication
- 🔲 Database for storing test run history
- 🔲 Search and filter capabilities
- 🔲 Markdown rendering for detailed descriptions
- 🔲 Export to PDF/Excel
- 🔲 Test execution tracking with timestamps
- 🔲 Multiple user support with roles

## Troubleshooting

### API Issues

- **"Test suites not loading"**: Ensure the .NET API is running on the correct port
- **"CORS errors"**: Check that the API's CORS configuration includes your frontend URL
- **"Empty test suite list"**: Verify YAML files exist in `TestSuiteApi/Assets/TestSuites/`

### Frontend Issues

- **"Cannot connect to API"**: Update `VITE_API_BASE_URL` in `.env` file
- **"Build errors"**: Run `npm install` to ensure all dependencies are installed
- **"TypeScript errors"**: Check that all type definitions in `src/types/index.ts` match the API responses

## Contributing

1. Add new YAML test suites to `TestSuiteApi/Assets/TestSuites/`
2. Follow the YAML schema defined in `YAML_SCHEMA.md`
3. Use meaningful test case IDs and descriptions
4. Keep the schema consistent across all test suites

## License

Internal use only - ServiceTitan

## Support

For questions or issues, please contact the QA team.

---

Built with ❤️ for better manual testing workflows
