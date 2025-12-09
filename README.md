# Test Suite Viewer

A modern, static web application for viewing manual test suites. Test suites are defined in YAML files and displayed in a beautiful React interface.

**🌐 Live Demo:** [https://sam-foust.github.io/ium-test-suite-prototype/](https://sam-foust.github.io/ium-test-suite-prototype/)

---

## ✨ Features

- ✅ **Fully Static** - No backend needed, deploys to GitHub Pages for free
- ✅ **YAML-Based** - Easy to edit test suites in version control
- ✅ **Auto-Deploy** - Push to main, site updates automatically via GitHub Actions
- ✅ **Beautiful UI** - Professional, responsive React interface
- ✅ **Fast** - CDN-served, browser-cached, instant loads
- ✅ **Type-Safe** - Full TypeScript support

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

### 1. Create YAML File

Create a test suite following the schema in [`YAML_SCHEMA.md`](YAML_SCHEMA.md):

```yaml
metadata:
  title: "My Test Suite"
  feature: "Feature Name"
  createdBy: "Your Name"
  dateCreated: "2025-12-09"
  status: "Draft"

testScenarios:
  - id: "TC-01"
    title: "Test Scenario"
    testCases:
      - testId: "TC-01.1"
        title: "Test Case"
        actionSteps: ["Step 1"]
        expectedResult: ["Result 1"]
```

### 2. Add to Public Folder

Place file in: `test-suite-ui/public/test-suites/my-test-suite.yaml`

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

**Done!** GitHub Actions automatically rebuilds and deploys (~2 minutes).

---

## 📁 Project Structure

```
ium-test-suite-prototype/
├── test-suite-ui/                    # React Application
│   ├── public/
│   │   └── test-suites/
│   │       ├── manifest.json         # Lists all test suites
│   │       └── *.yaml                # Test suite files
│   ├── src/
│   │   ├── components/               # React components
│   │   ├── services/
│   │   │   └── api.ts               # Fetches & parses YAML
│   │   └── types/                   # TypeScript types
│   └── dist/                        # Built files (GitHub Pages serves this)
│
├── .github/workflows/
│   └── deploy.yml                   # Auto-deployment workflow
│
├── archived/                         # Old backend (not used)
├── DEPLOYMENT.md                    # Deployment guide
└── YAML_SCHEMA.md                   # Test suite format
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
Fetch test-suite.yaml files
    ↓
Parse YAML with js-yaml in browser
    ↓
Render Beautiful UI
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
- **js-yaml** - YAML parsing
- **GitHub Pages** - Free hosting
- **GitHub Actions** - Auto-deployment

---

## 🎨 UI Features

- Card-based test suite list with status badges
- Comprehensive detail views
- Responsive design (desktop & mobile)
- Clean tables for test cases
- Status badges (Draft, Review, Approved, Executed)
- Easy navigation with React Router

---

## 📖 Documentation

- [`DEPLOYMENT.md`](DEPLOYMENT.md) - Deployment guide
- [`YAML_SCHEMA.md`](YAML_SCHEMA.md) - Test suite format
- [`QUICK_START.md`](QUICK_START.md) - Getting started

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
- ✅ QA team test case management
- ✅ Regression test suites
- ✅ Test execution guides

---

## 🔐 Security

- ✅ No backend = No server vulnerabilities
- ✅ Static files only = Minimal attack surface
- ✅ HTTPS enforced by GitHub Pages

⚠️ **Note**: All files are publicly accessible.

---

## 📈 Example

See [`password-management.yaml`](test-suite-ui/public/test-suites/password-management.yaml) for a complete example.

---

## 🤝 Contributing

1. Create YAML test suite
2. Place in `test-suite-ui/public/test-suites/`
3. Update `manifest.json`
4. Push to main - auto-deploys!

---

Built with ❤️ for better manual testing workflows
