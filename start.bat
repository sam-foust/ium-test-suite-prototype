@echo off
REM Test Suite Viewer - Start Both Backend and Frontend
REM This script starts both the .NET API and React frontend in separate windows

echo ====================================
echo Test Suite Viewer - Starting...
echo ====================================
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm packages are installed
if not exist "test-suite-ui\node_modules\" (
    echo Installing npm packages...
    cd test-suite-ui
    call npm install
    cd ..
)

echo Starting Backend API...
start "Test Suite API - Backend" cmd /k "cd TestSuiteApi && dotnet run"

echo Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo Starting Frontend Dev Server...
start "Test Suite UI - Frontend" cmd /k "cd test-suite-ui && npm run dev"

echo.
echo ====================================
echo Both servers are starting!
echo ====================================
echo.
echo Backend API: http://localhost:5000
echo Frontend UI: http://localhost:5173
echo Swagger:     http://localhost:5000/swagger
echo.
echo The application will open in your browser shortly.
echo Press any key to open the browser now, or wait...
timeout /t 5

start http://localhost:5173

echo.
echo Both servers are running in separate windows.
echo Close those windows to stop the servers.
echo.
pause

