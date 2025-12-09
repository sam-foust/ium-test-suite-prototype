# Quick Start Guide

This guide will help you get the Test Suite Viewer up and running quickly.

## Prerequisites

Before you begin, ensure you have:
- ✅ .NET 8 SDK installed
- ✅ Node.js 18+ and npm installed

To verify:
```bash
dotnet --version  # Should show 8.x.x
node --version    # Should show 18+
npm --version     # Should show 9+
```

## Step-by-Step Setup

### 1. Install Dependencies

**Backend:**
```bash
cd TestSuiteApi
dotnet restore
```

**Frontend:**
```bash
cd test-suite-ui
npm install
```

### 2. Start the Backend API

Open a terminal window:
```bash
cd TestSuiteApi
dotnet run
```

You should see:
```
Now listening on: http://localhost:5000
Application started. Press Ctrl+C to shut down.
```

Keep this terminal running!

### 3. Start the Frontend

Open a **new** terminal window:
```bash
cd test-suite-ui
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 4. Open the Application

Open your browser and navigate to:
```
http://localhost:5173
```

You should see the Test Suite Viewer with the "Password Management Regression Test Suite" example.

## What You Should See

### Home Page
- A list of available test suites displayed as cards
- Each card shows:
  - Test suite title
  - Feature name
  - Status badge (Draft, Review, Approved, Executed)
  - Last updated date

### Test Suite Detail Page
Click on a test suite card to see:
- Complete metadata
- Feature information
- Pre-setup instructions
- Execution matrix
- Prerequisites library
- Test variables tracker
- Detailed test scenarios and test cases

## Adding Your Own Test Suite

1. **Create a YAML file** in `TestSuiteApi/Assets/TestSuites/`
   ```bash
   # Example: my-test-suite.yaml
   ```

2. **Follow the schema** from `YAML_SCHEMA.md`
   - Use `password-management.yaml` as a reference

3. **Restart the API**
   ```bash
   # Stop the API (Ctrl+C) and restart
   dotnet run
   ```

4. **Refresh the browser**
   - Your new test suite should appear in the list!

## Troubleshooting

### Problem: "Cannot connect to API"

**Solution:**
1. Verify the API is running on port 5000
2. Check if port 5000 is already in use
3. Look at the API terminal for error messages

### Problem: "Empty test suite list"

**Solution:**
1. Check that `password-management.yaml` exists in `TestSuiteApi/Assets/TestSuites/`
2. Look at the API logs for parsing errors
3. Verify the YAML syntax is correct

### Problem: "npm install fails"

**Solution:**
1. Delete `node_modules` and `package-lock.json`
2. Run `npm cache clean --force`
3. Run `npm install` again

### Problem: "dotnet restore fails"

**Solution:**
1. Verify .NET 8 SDK is installed
2. Check internet connection (NuGet packages need to download)
3. Try `dotnet nuget locals all --clear` then restore again

## Next Steps

Now that you have the application running:

1. ✅ Explore the example test suite
2. ✅ Review the YAML schema documentation
3. ✅ Create your first custom test suite
4. ✅ Share the URL with your team

## API Testing (Optional)

You can test the API directly using:

**Swagger UI:**
```
http://localhost:5000/swagger
```

**Direct API calls:**
```bash
# Get all test suites
curl http://localhost:5000/api/testsuites

# Get specific test suite
curl http://localhost:5000/api/testsuites/password-management
```

## Production Deployment (Future)

For production deployment, you'll need to:
1. Build the frontend: `npm run build`
2. Publish the backend: `dotnet publish -c Release`
3. Configure a proper web server (IIS, Nginx, etc.)
4. Set up proper environment variables
5. Consider adding authentication

---

**Need Help?** Check the main README.md for more detailed information.

