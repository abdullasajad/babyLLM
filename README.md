# babyLLM Android

A native Android application for AI-powered search with intelligent summaries.

## Features

- **🔍 AI-Powered Search** - Search the web with intelligent results
- **📝 Smart Summaries** - Generate AI summaries for search results  
- **🔐 User Authentication** - Secure login and signup system
- **🎨 Material Design 3** - Modern, beautiful Android UI
- **🌙 Dark/Light Themes** - Automatic theme switching
- **📱 Responsive Design** - Works on all Android devices
- **🔄 Auto-Retry** - Automatic retry logic for failed requests
- **🛡️ Secure** - Network security configuration and encrypted storage

## Tech Stack

- **Language**: Kotlin
- **UI**: Jetpack Compose + Material Design 3
- **Architecture**: MVVM + Repository Pattern
- **Networking**: Retrofit + OkHttp with retry interceptors
- **Storage**: DataStore Preferences (encrypted)
- **Navigation**: Navigation Compose

## Quick Start

### Prerequisites
- **Android Studio**: Arctic Fox or newer (recommended: latest stable)
- **JDK**: 8 or higher
- **Android SDK**: API 24+ (Android 7.0+)
- **Gradle**: 8.2+ (included in project)

### Automated Setup (Windows)

```bash
# 1. Clone the repository
git clone https://github.com/abdullasajad/babyLLM.git
cd babyLLM

# 2. Run the setup script
setup-android.bat

# This will:
# - Detect your Android SDK
# - Create local.properties
# - Configure the project
```

### Manual Setup

```bash
# 1. Clone the repository
git clone https://github.com/abdullasajad/babyLLM.git
cd babyLLM

# 2. Create local.properties in android/ folder
# Add this line (replace with your SDK path):
sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk

# 3. Open Android Studio
# File → Open → Select 'android' folder

# 4. Wait for Gradle sync → Click Run
```

### Build APK

```bash
# Navigate to android directory
cd android

# Windows
gradlew.bat assembleDebug

# Mac/Linux
./gradlew assembleDebug

# Output: android/app/build/outputs/apk/debug/app-debug.apk
```

## Project Structure

```
android/
├── app/
│   ├── src/main/java/com/babyllm/android/
│   │   ├── MainActivity.kt           # App entry point
│   │   ├── data/                     # API & repositories
│   │   │   ├── api/                  # Retrofit services
│   │   │   ├── model/                # Data classes
│   │   │   └── repository/           # Data repositories
│   │   └── ui/                       # Jetpack Compose UI
│   │       ├── auth/                 # Login/Signup screens
│   │       ├── home/                 # Home screen
│   │       ├── search/               # Search functionality
│   │       ├── settings/             # Settings screen
│   │       └── theme/                # Material Design 3
│   └── src/main/res/                 # Android resources
├── build.gradle                      # Project configuration
└── gradlew                          # Gradle wrapper
```

## Configuration

### API Endpoints
Update API URLs in `android/app/build.gradle`:
```gradle
buildTypes {
    debug {
        buildConfigField "String", "API_BASE_URL", "\"https://your-api.com/api\""
    }
    release {
        buildConfigField "String", "API_BASE_URL", "\"https://your-api.com/api\""
    }
}
```

### Required Backend Endpoints
- `POST /api/auth/login` - User authentication
- `POST /api/auth/signup` - User registration
- `GET /api/search?q=query` - Search functionality
- `POST /api/summary/webpage` - AI summary generation

## Development

### Build Commands
```bash
# Debug build
./gradlew assembleDebug

# Release build
./gradlew assembleRelease

# Clean build
./gradlew clean assembleDebug

# Run tests
./gradlew test
```

### Common Issues

| Issue | Solution |
|-------|----------|
| **Gradle sync fails** | `File → Invalidate Caches and Restart` in Android Studio |
| **SDK not found** | Run `setup-android.bat` or manually create `local.properties` |
| **Build errors** | Run `./gradlew clean assembleDebug` |
| **Network errors** | Check API_BASE_URL in `app/build.gradle` |
| **App crashes on start** | Ensure minimum SDK 24+ device/emulator |
| **Cannot connect to server** | Use `10.0.2.2` for emulator, actual IP for physical device |

### Troubleshooting Network Issues

**For Android Emulator:**
- Backend URL should be `http://10.0.2.2:PORT` (not localhost)
- Example: `http://10.0.2.2:5000/api`

**For Physical Device:**
- Use your computer's local IP address
- Example: `http://192.168.1.100:5000/api`
- Ensure device and computer are on same network

**Update API URL:**
Edit `android/app/build.gradle`:
```gradle
buildTypes {
    debug {
        buildConfigField "String", "API_BASE_URL", "\"http://10.0.2.2:5000/api\""
    }
}
```

## Architecture

### MVVM Pattern
- **Model**: Data classes and repository pattern
- **View**: Jetpack Compose UI components  
- **ViewModel**: Business logic and state management

### Key Components
- **Authentication**: Secure token-based auth with DataStore
- **Search**: Real-time search with AI summaries
- **UI/UX**: Material Design 3 with responsive layouts
- **Navigation**: Navigation Compose for screen flow

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Built with ❤️ using Kotlin and Jetpack Compose**

