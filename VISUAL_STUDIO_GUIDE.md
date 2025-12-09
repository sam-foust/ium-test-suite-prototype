# Running Test Suite Viewer from Visual Studio

## Quick Start - Method 1: Using Batch Script (Recommended)

1. **Double-click `start.bat`** in the project root
   - This will automatically:
     - Start the .NET backend on port 5000
     - Start the React frontend on port 5173
     - Open your browser to the application
   
2. **Both servers run in separate command windows**
   - Keep both windows open while using the application
   - Close them when done

## Method 2: Run from Visual Studio

1. **Open Visual Studio**
   - Open `TestSuiteViewer.sln`

2. **In the Debug dropdown**, select:
   - "Start Backend + Frontend" to launch both
   - OR "TestSuiteApi" to run backend only

3. **Press F5** or click the Start button

4. **Access:**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000/api/testsuites`
   - Swagger: `http://localhost:5000/swagger`

## Method 3: Manual Start (For Development)

### Terminal 1 - Backend:
```bash
cd TestSuiteApi
dotnet run
```

### Terminal 2 - Frontend:
```bash
cd test-suite-ui
npm install  # First time only
npm run dev
```

## How It Works

### Development Setup
- **Backend**: .NET 10 Web API on port 5000
- **Frontend**: Vite React dev server on port 5173
- **CORS**: Backend allows requests from frontend
- **HMR**: Hot Module Replacement for instant React updates

### Files Created
- `start.bat` - Convenient startup script for both servers
- `setup.bat` - One-time setup to install npm packages
- `TestSuiteViewer.sln` - Visual Studio solution file
- `.vscode/` - VS Code debugging configuration (optional)

## Prerequisites

**Node.js must be installed:**
- Download from: https://nodejs.org/
- Verify with: `node --version` and `npm --version`

**If Node.js is not installed:**
1. Download and install Node.js
2. Restart your command prompt/Visual Studio
3. Run `setup.bat` to install npm packages

## Visual Studio Profiles

In Visual Studio, you can choose different launch profiles:

### "TestSuiteApi" (Backend Only)
- Runs only the .NET API
- Good for API development and testing
- Access Swagger at: `http://localhost:5000/swagger`

### "Start Backend + Frontend" (Both)
- Runs the `start.bat` script
- Launches both backend and frontend
- Full application experience

## Making Changes

### Backend Changes (C#)
1. Edit files in `TestSuiteApi/`
2. Save changes
3. Restart the debugger (Shift+F5, then F5)
4. Or use hot reload (if available)

### Frontend Changes (React/TypeScript)
1. Edit files in `test-suite-ui/src/`
2. Save changes
3. **Changes auto-reload instantly** (HMR)
4. No restart needed!

### Adding New Test Suites
1. Create `.yaml` file in `TestSuiteApi/Assets/TestSuites/`
2. Follow the schema in `YAML_SCHEMA.md`
3. Restart backend only
4. Frontend will automatically fetch new suite

## Debugging

### Backend (C#)
- Set breakpoints in Visual Studio
- Press F5 to start debugging
- Breakpoints will hit when API is called

### Frontend (React)
- Use browser DevTools (F12)
- React DevTools extension recommended
- Console.log for debugging
- Source maps enabled

## Troubleshooting

### "npm is not recognized"
**Solution:** Install Node.js from https://nodejs.org/ and restart

### Port 5000 already in use
**Solution:**
1. Stop any running instances
2. Change port in `TestSuiteApi/Properties/launchSettings.json`
3. Update API URL in `test-suite-ui/vite.config.ts`

### Frontend not loading
**Solution:**
```bash
cd test-suite-ui
npm install
npm run dev
```

### Backend builds but frontend doesn't start
**Solution:** Make sure Node.js is installed, then run:
```bash
cd test-suite-ui
npm install
```

## Production Build

To build for production deployment:

```bash
# Build backend
cd TestSuiteApi
dotnet publish -c Release -o ./publish

# Build frontend
cd test-suite-ui
npm run build
```

The frontend build creates optimized static files in `test-suite-ui/dist/`

## Ports Used

- **5000** - Backend API
- **5173** - Frontend Dev Server (Vite)

Make sure these ports are not in use by other applications.

## Quick Reference

| Task | Command |
|------|---------|
| Start everything | Double-click `start.bat` |
| Setup first time | Double-click `setup.bat` |
| Backend only | `cd TestSuiteApi && dotnet run` |
| Frontend only | `cd test-suite-ui && npm run dev` |
| Build backend | `dotnet build` |
| Build frontend | `npm run build` |
| View API | `http://localhost:5000/swagger` |
| View App | `http://localhost:5173` |

## Need Help?

See the main `README.md` in the root folder for more information about:
- Application architecture
- YAML schema
- API endpoints
- Feature documentation

