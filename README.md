# babyLLM Android

A native Android application for AI-powered search with intelligent summaries.

## Features

- **🔍 AI-Powered Search** - Search the web with intelligent results
- **📝 Smart Summaries** - Generate AI summaries for search results  
- **🔐 User Authentication** - Secure login and signup system
- **🎨 Material Design 3** - Modern, beautiful Android UI
- **🌙 Dark/Light Themes** - Automatic theme switching
- **📱 Responsive Design** - Works on all Android devices

## Tech Stack

- **Language**: Kotlin
- **UI**: Jetpack Compose + Material Design 3
- **Architecture**: MVVM + Repository Pattern
- **Networking**: Retrofit + OkHttp
- **Storage**: DataStore Preferences
- **Navigation**: Navigation Compose

## Quick Start

### Prerequisites
- Android Studio Arctic Fox+
- JDK 8+
- Android SDK API 24+

### Setup
```bash
# 1. Clone the repository
git clone https://github.com/abdullasajad/babyLLM.git
cd babyLLM

# 2. Open Android Studio
# File → Open → Select 'android' folder

# 3. Wait for Gradle sync → Click Run
```

### Build APK
```bash
cd android
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
| Gradle sync fails | `File → Invalidate Caches and Restart` |
| SDK not found | Create `local.properties` with SDK path |
| Build errors | `./gradlew clean assembleDebug` |

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

