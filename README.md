# Test Suite Viewer

A modern, static web application for viewing manual test suites. Test suites are defined in standard Gherkin (.feature) files and displayed in a beautiful React interface.

**🌐 Live Demo:** [https://sam-foust.github.io/ium-test-suite-prototype/](https://sam-foust.github.io/ium-test-suite-prototype/)

---

## ✨ Features

- ✅ **Fully Static** - No backend needed, deploys to GitHub Pages for free
- ✅ **Gherkin/BDD Format** - Industry-standard Given-When-Then syntax
- ✅ **Auto-Deploy** - Push to main, site updates automatically via GitHub Actions
- ✅ **Beautiful UI** - Professional, responsive React interface with syntax highlighting
- ✅ **Fast** - CDN-served, browser-cached, instant loads
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Automation-Ready** - Direct path to Cypress + Cucumber integration

---

## 🚀 Quick Start

### Local Development

```bash
cd test-suite-ui
npm install
npm run dev
```

Opens at `http://localhost:5173`

### View Live Site

Visit: [https://sam-foust.github.io/ium-test-suite-prototype/](https://sam-foust.github.io/ium-test-suite-prototype/)

---

## 📝 Adding New Test Suites

### 1. Create Gherkin Feature File

Create a `.feature` file using standard Gherkin syntax:

```gherkin
@authentication @critical
Feature: User Login
  As a user
  I want to log into the application
  So that I can access my account

  Background:
    Given the application is running
    And the database is accessible

  @smoke-test
  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter username "john.doe"
    And I enter password "SecurePass123"
    And I click the "Login" button
    Then I should be redirected to the dashboard
    And I should see a welcome message

  @error-handling
  Scenario: Failed login with invalid password
    Given I am on the login page
    When I enter username "john.doe"
    And I enter an incorrect password
    And I click the "Login" button
    Then I should see an error message "Invalid credentials"
    And I should remain on the login page
```

### 2. Add to Public Folder

Place file in a category subfolder:
```
test-suite-ui/public/test-suites/{category}/my-test.feature
```

Example: `test-suite-ui/public/test-suites/authn/login-flow.feature`

### 3. Update Manifest

Edit [`test-suite-ui/public/test-suites/manifest.json`](test-suite-ui/public/test-suites/manifest.json):

```json
{
  "testSuites": [
    {
      "id": "password-management",
      "file": "authn/password-management.feature",
      "category": "Authentication"
    },
    {
      "id": "login-flow",
      "file": "authn/login-flow.feature",
      "category": "Authentication"
    }
  ]
}
```

### 4. Commit and Push

```bash
git add .
git commit -m "Add Login Flow Test Suite"
git push origin main
```

**Done!** GitHub Actions automatically rebuilds and deploys (~2 minutes).

---

## 📁 Project Structure

```
ium-test-suite-prototype/
├── test-suite-ui/                    # React Application
│   ├── public/
│   │   └── test-suites/
│   │       ├── manifest.json         # Lists all test suites
│   │       └── authn/                # Category folders
│   │           ├── *.feature         # Gherkin test suite files
│   │           └── ...
│   ├── src/
│   │   ├── components/               # React components
│   │   │   └── GherkinFeatureViewer.tsx  # Gherkin display
│   │   ├── services/
│   │   │   └── api.ts               # Fetches & parses Gherkin
│   │   └── types/                   # TypeScript types
│   └── dist/                        # Built files (GitHub Pages serves this)
│
├── .github/workflows/
│   └── deploy.yml                   # Auto-deployment workflow
│
├── archived/                         # Old backend (not used)
└── docs/                            # Documentation
    ├── AI_AGENT_GUIDE.md            # Comprehensive guide for creating tests
    ├── DEPLOYMENT.md                # Deployment guide
    └── QUICK_START.md               # Getting started
```

---

## 🎯 How It Works

```
User Browser
    ↓
React App Loads from GitHub Pages CDN
    ↓
Fetch manifest.json (list of test suites)
    ↓
Fetch .feature files (Gherkin)
    ↓
Parse Gherkin with @cucumber/gherkin in browser
    ↓
Render Beautiful UI with Syntax Highlighting
```

**No backend, no API, all static!**

---

## 🛠️ Development

### Install Dependencies

```bash
cd test-suite-ui
npm install
```

### Run Dev Server

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

---

## 📦 Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Navigation
- **@cucumber/gherkin** - Gherkin parsing
- **@cucumber/messages** - Gherkin types
- **GitHub Pages** - Free hosting
- **GitHub Actions** - Auto-deployment

---

## 🎨 UI Features

- Card-based test suite list with tags
- Collapsible scenarios with syntax highlighting
- Given (blue), When (green), Then (orange) keyword colors
- Background section highlighting
- Examples tables for data-driven tests
- Responsive design (desktop & mobile)
- Status tags from feature tags
- Easy navigation with query string routing

---

## 📚 Gherkin Syntax

### Keywords

- **Feature**: High-level description of a software feature
- **Background**: Steps that run before each scenario (can be at Feature or Rule level)
- **Rule**: Groups related scenarios under a business rule
- **Scenario**: Concrete example of business rule
- **Given**: Preconditions (blue)
- **When**: Actions (green)
- **Then**: Expected outcomes (orange)
- **And/But**: Additional steps (gray)

### Tags

Use tags to organize and categorize:

```gherkin
@authentication @critical @smoke-test
Feature: User Login
```

### Comments

```gherkin
# This is a comment
# Setup notes: Ensure email service is configured
```

---

## 📖 Documentation

- [`docs/AI_AGENT_GUIDE.md`](docs/AI_AGENT_GUIDE.md) - **Comprehensive guide for AI agents** - How to create and extend test suites using Gherkin
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) - Deployment guide
- [`docs/QUICK_START.md`](docs/QUICK_START.md) - Getting started

---

## 💰 Cost

**FREE!** GitHub Pages free tier:
- 1GB storage
- 100GB bandwidth/month
- Perfect for test documentation

---

## 🎯 Use Cases

Perfect for:
- ✅ Manual test documentation
- ✅ BDD/Gherkin test case management
- ✅ Regression test suites
- ✅ Test execution guides
- ✅ Living documentation
- ✅ Future Cypress/Cucumber automation

---

## 🔐 Security

- ✅ No backend = No server vulnerabilities
- ✅ Static files only = Minimal attack surface
- ✅ HTTPS enforced by GitHub Pages

⚠️ **Note**: All files are publicly accessible.

---

## 📈 Examples

See the following for complete examples:
- [`test-suite-ui/public/test-suites/authn/password-management.feature`](test-suite-ui/public/test-suites/authn/password-management.feature)
- [`test-suite-ui/public/test-suites/authn/otp-delivery-flow.feature`](test-suite-ui/public/test-suites/authn/otp-delivery-flow.feature)

---

## 🤝 Contributing

1. Create Gherkin `.feature` file
2. Place in appropriate category folder in `test-suite-ui/public/test-suites/`
3. Update `manifest.json`
4. Push to main - auto-deploys!

---

## 🔄 Future Automation

This format is automation-ready! When you're ready to automate:

1. Install Cypress + Cucumber
2. Write step definitions that match your Gherkin steps
3. Run tests: `npx cypress run`

Your Gherkin files serve as both documentation and executable tests!

---

Built with ❤️ for better manual testing workflows and BDD practices
