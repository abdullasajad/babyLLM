# babyLLM Android - Complete Setup Guide

This guide will help you set up and run the babyLLM Android application.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Building the App](#building-the-app)
5. [Running the App](#running-the-app)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

1. **Android Studio** (Latest stable version recommended)
   - Download: https://developer.android.com/studio
   - Minimum version: Arctic Fox (2020.3.1)

2. **Java Development Kit (JDK)**
   - Version: JDK 8 or higher
   - Recommended: JDK 11 or JDK 17
   - Check version: `java -version`

3. **Android SDK**
   - Minimum API Level: 24 (Android 7.0)
   - Target API Level: 34 (Android 14)
   - Required components:
     - Android SDK Platform 34
     - Android SDK Build-Tools 34.0.0
     - Android SDK Platform-Tools
     - Android Emulator (optional, for testing)

### System Requirements

- **OS**: Windows 10/11, macOS 10.14+, or Linux
- **RAM**: 8GB minimum, 16GB recommended
- **Disk Space**: 10GB free space minimum
- **Internet**: Required for downloading dependencies

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/abdullasajad/babyLLM.git
cd babyLLM
```

### Step 2: Automated Setup (Windows)

```bash
# Run the setup script
setup-android.bat
```

The script will:
- Detect your Android SDK location
- Create `local.properties` file
- Configure the project

### Step 2 (Alternative): Manual Setup

#### Windows

1. Locate your Android SDK path:
   - Default: `C:\Users\YourUsername\AppData\Local\Android\Sdk`
   - Or check in Android Studio: `File → Settings → Appearance & Behavior → System Settings → Android SDK`

2. Create `local.properties` file in the `android/` folder:
   ```properties
   sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
   ```
   Note: Use double backslashes (`\\`) on Windows

#### macOS/Linux

1. Locate your Android SDK path:
   - macOS: `/Users/YourUsername/Library/Android/sdk`
   - Linux: `/home/YourUsername/Android/Sdk`

2. Create `local.properties` file in the `android/` folder:
   ```properties
   sdk.dir=/Users/YourUsername/Library/Android/sdk
   ```

## Configuration

### API Configuration

The app needs a backend API to function. Configure the API URL in `android/app/build.gradle`:

```gradle
android {
    buildTypes {
        debug {
            buildConfigField "String", "API_BASE_URL", "\"http://10.0.2.2:5000/api\""
        }
        release {
            buildConfigField "String", "API_BASE_URL", "\"https://your-production-api.com/api\""
        }
    }
}
```

**Important Network Notes:**

- **For Android Emulator**: Use `http://10.0.2.2:PORT` instead of `localhost`
  - `10.0.2.2` is a special alias to your host loopback interface
  - Example: `http://10.0.2.2:5000/api`

- **For Physical Device**: Use your computer's local IP address
  - Find your IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
  - Example: `http://192.168.1.100:5000/api`
  - Ensure device and computer are on the same network

### Gradle Sync

1. Open Android Studio
2. `File → Open` → Select the `android` folder
3. Wait for Gradle sync to complete (this may take several minutes on first run)
4. If sync fails, try: `File → Invalidate Caches and Restart`

## Building the App

### Using Android Studio

1. Open the project in Android Studio
2. Select `Build → Make Project` or press `Ctrl+F9` (Windows/Linux) or `Cmd+F9` (Mac)
3. Wait for the build to complete

### Using Command Line

#### Debug Build

```bash
cd android

# Windows
gradlew.bat assembleDebug

# Mac/Linux
./gradlew assembleDebug
```

Output: `android/app/build/outputs/apk/debug/app-debug.apk`

#### Release Build

```bash
cd android

# Windows
gradlew.bat assembleRelease

# Mac/Linux
./gradlew assembleRelease
```

Output: `android/app/build/outputs/apk/release/app-release.apk`

#### Clean Build

```bash
cd android

# Windows
gradlew.bat clean assembleDebug

# Mac/Linux
./gradlew clean assembleDebug
```

## Running the App

### On Android Emulator

1. **Create an Emulator** (if you don't have one):
   - In Android Studio: `Tools → Device Manager`
   - Click `Create Device`
   - Select a device (e.g., Pixel 5)
   - Select a system image (API 24 or higher)
   - Click `Finish`

2. **Run the App**:
   - Click the green `Run` button (▶) in Android Studio
   - Or press `Shift+F10` (Windows/Linux) or `Ctrl+R` (Mac)
   - Select your emulator from the list

### On Physical Device

1. **Enable Developer Options**:
   - Go to `Settings → About Phone`
   - Tap `Build Number` 7 times
   - Go back to `Settings → Developer Options`

2. **Enable USB Debugging**:
   - In Developer Options, enable `USB Debugging`

3. **Connect Device**:
   - Connect your device via USB
   - Accept the USB debugging prompt on your device

4. **Run the App**:
   - Click the green `Run` button in Android Studio
   - Select your device from the list

## Troubleshooting

### Gradle Sync Issues

**Problem**: Gradle sync fails with dependency errors

**Solutions**:
1. Check your internet connection
2. `File → Invalidate Caches and Restart`
3. Delete `.gradle` folder and sync again
4. Update Gradle wrapper: `./gradlew wrapper --gradle-version=8.2`

### SDK Not Found

**Problem**: `SDK location not found`

**Solutions**:
1. Run `setup-android.bat` (Windows)
2. Manually create `local.properties` with correct SDK path
3. Set `ANDROID_HOME` environment variable

### Build Errors

**Problem**: Build fails with compilation errors

**Solutions**:
1. Clean and rebuild: `./gradlew clean assembleDebug`
2. Check JDK version: `java -version` (should be 8+)
3. Update Android Studio to latest version
4. Sync project with Gradle files

### Network Connection Issues

**Problem**: App cannot connect to backend

**Solutions**:

1. **For Emulator**:
   - Use `http://10.0.2.2:PORT` instead of `localhost`
   - Check if backend is running
   - Verify port number

2. **For Physical Device**:
   - Use computer's local IP (e.g., `192.168.1.100`)
   - Ensure device and computer are on same WiFi network
   - Check firewall settings

3. **Update API URL**:
   - Edit `android/app/build.gradle`
   - Update `API_BASE_URL` in `buildConfigField`
   - Rebuild the app

### App Crashes on Launch

**Problem**: App crashes immediately after opening

**Solutions**:
1. Check logcat in Android Studio for error messages
2. Ensure device/emulator is API 24+ (Android 7.0+)
3. Clear app data: `Settings → Apps → babyLLM → Clear Data`
4. Reinstall the app

### Permission Issues

**Problem**: Network permission denied

**Solutions**:
1. Check `AndroidManifest.xml` has `INTERNET` permission
2. For Android 9+, ensure `usesCleartextTraffic="true"` is set
3. Check network security configuration

## Additional Resources

- **Android Developer Documentation**: https://developer.android.com/docs
- **Kotlin Documentation**: https://kotlinlang.org/docs/home.html
- **Jetpack Compose**: https://developer.android.com/jetpack/compose
- **Retrofit**: https://square.github.io/retrofit/

## Getting Help

If you encounter issues not covered in this guide:

1. Check the [GitHub Issues](https://github.com/abdullasajad/babyLLM/issues)
2. Review Android Studio's Logcat for error messages
3. Ensure all prerequisites are correctly installed
4. Try a clean build: `./gradlew clean assembleDebug`

## Next Steps

Once the app is running:

1. Test the search functionality
2. Try generating AI summaries
3. Test authentication (login/signup)
4. Explore the settings screen

Happy coding! 🚀
