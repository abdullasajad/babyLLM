# 🚀 Quick Start Guide - babyLLM Android

Get up and running in 5 minutes!

## Prerequisites

- ✅ Android Studio installed
- ✅ Android SDK (API 24+)
- ✅ JDK 8 or higher

## Step 1: Clone & Setup (2 minutes)

```bash
# Clone the repository
git clone https://github.com/abdullasajad/babyLLM.git
cd babyLLM

# Run automated setup (Windows)
setup-android.bat
```

**That's it!** The script will:
- Find your Android SDK
- Create `local.properties`
- Configure the project

## Step 2: Open in Android Studio (1 minute)

1. Open Android Studio
2. `File → Open`
3. Select the `android` folder
4. Wait for Gradle sync (first time may take 2-3 minutes)

## Step 3: Run the App (2 minutes)

### Option A: Using Emulator

1. Click the green **Run** button (▶)
2. Select an emulator (or create one)
3. App will build and launch automatically

### Option B: Using Physical Device

1. Enable **Developer Options** on your device
2. Enable **USB Debugging**
3. Connect via USB
4. Click the green **Run** button (▶)
5. Select your device

## 🎉 Done!

The app should now be running on your device/emulator.

## ⚙️ Configuration (Optional)

### Update API URL

If you have a backend running, update the API URL in `android/app/build.gradle`:

```gradle
buildTypes {
    debug {
        // For emulator (use 10.0.2.2 instead of localhost)
        buildConfigField "String", "API_BASE_URL", "\"http://10.0.2.2:5000/api\""
        
        // For physical device (use your computer's IP)
        // buildConfigField "String", "API_BASE_URL", "\"http://192.168.1.100:5000/api\""
    }
}
```

Then rebuild the app.

## 🐛 Troubleshooting

### Build Fails?
```bash
cd android
gradlew.bat clean assembleDebug
```

### SDK Not Found?
- Run `setup-android.bat` again
- Or manually create `android/local.properties`:
  ```
  sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
  ```

### Cannot Connect to Server?
- **Emulator**: Use `http://10.0.2.2:PORT` (not localhost)
- **Physical Device**: Use your computer's local IP address
- Ensure device and computer are on same WiFi network

## 📚 More Help?

- **Detailed Setup**: See [SETUP.md](SETUP.md)
- **All Changes**: See [CHANGELOG.md](CHANGELOG.md)
- **Verification**: See [VERIFICATION.md](VERIFICATION.md)
- **Full README**: See [README.md](README.md)

## ✨ What's New?

This version includes:
- 🔄 **Auto-retry logic** for network requests
- 🛡️ **Enhanced security** configuration
- 💬 **Better error messages** for troubleshooting
- 📖 **Comprehensive documentation**
- 🚀 **Production-ready** codebase

Happy coding! 🎉
