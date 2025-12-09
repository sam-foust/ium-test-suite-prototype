@echo off
echo ====================================
echo Test Suite Viewer - Setup Script
echo ====================================
echo.

echo Checking Node.js installation...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo After installation, restart this script.
    pause
    exit /b 1
)

echo Node.js found: 
node --version
echo npm version:
npm --version
echo.

echo Installing frontend dependencies...
cd test-suite-ui
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)

echo.
echo ====================================
echo Setup Complete!
echo ====================================
echo.
echo You can now:
echo 1. Open TestSuiteViewer.sln in Visual Studio
echo 2. Press F5 to run the application
echo.
echo Or run manually:
echo   Backend:  cd TestSuiteApi && dotnet run
echo   Frontend: cd test-suite-ui && npm run dev
echo.
pause

