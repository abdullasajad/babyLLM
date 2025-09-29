@echo off
echo Building babyLLM Android App...
echo.

echo Checking if gradlew exists...
if not exist gradlew.bat (
    echo Error: gradlew.bat not found!
    echo Please make sure you're in the android directory.
    pause
    exit /b 1
)

echo.
echo Building debug APK...
call gradlew.bat assembleDebug

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Build successful!
    echo.
    echo Debug APK location:
    echo app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo You can now install this APK on your Android device.
) else (
    echo.
    echo ❌ Build failed!
    echo Please check the error messages above.
)

echo.
pause
