@echo off
echo ========================================
echo   babyLLM Android Setup Script
echo ========================================
echo.

echo Step 1: Checking project structure...
if not exist "android" (
    echo Error: Android folder not found!
    echo Please run this script from the babyLLM project root.
    pause
    exit /b 1
)

echo ✓ Android project found
echo.

echo Step 2: Setting up local.properties...
cd android

if not exist "local.properties" (
    if exist "local.properties.template" (
        echo Creating local.properties from template...
        copy "local.properties.template" "local.properties"
        echo.
        echo ⚠️  IMPORTANT: Please edit local.properties and set your Android SDK path!
        echo    Common location: C:\Users\%USERNAME%\AppData\Local\Android\Sdk
        echo.
    ) else (
        echo Creating basic local.properties...
        echo sdk.dir=C:\\Users\\%USERNAME%\\AppData\\Local\\Android\\Sdk > local.properties
        echo ⚠️  Please verify the SDK path in local.properties is correct.
        echo.
    )
) else (
    echo ✓ local.properties already exists
)

echo Step 3: Starting backend server...
echo.
echo Opening new window for backend server...
start "babyLLM Backend" cmd /k "cd /d %~dp0backend && echo Starting babyLLM backend server... && node simple-server.js"

echo.
echo Step 4: Instructions for Android Studio...
echo.
echo ========================================
echo   NEXT STEPS:
echo ========================================
echo.
echo 1. Open Android Studio
echo 2. Click "Open an existing Android Studio project"
echo 3. Navigate to and select the 'android' folder
echo 4. Wait for Gradle sync to complete
echo 5. Click the green "Run" button to build and install
echo.
echo ========================================
echo   TROUBLESHOOTING:
echo ========================================
echo.
echo • If build fails, check that local.properties has correct SDK path
echo • Make sure Android SDK API 24+ is installed
echo • Ensure backend server is running (check the new window)
echo • For physical device: Enable USB Debugging in Developer Options
echo.
echo Backend server is running in a separate window.
echo You can close this window and proceed with Android Studio.
echo.
pause
