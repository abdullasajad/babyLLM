# babyLLM Android

Native Android implementation of the babyLLM AI search assistant.

## Quick Setup

1. Open Android Studio
2. Import this `android` folder
3. Wait for Gradle sync
4. Click Run

## Build APK

```bash
./gradlew assembleDebug
# Output: app/build/outputs/apk/debug/app-debug.apk
```

## Architecture

- **Language**: Kotlin
- **UI**: Jetpack Compose + Material Design 3
- **Pattern**: MVVM + Repository
- **Network**: Retrofit + OkHttp
- **Storage**: DataStore Preferences

## API Configuration

Update endpoints in `app/build.gradle`:
```gradle
buildConfigField "String", "API_BASE_URL", "\"https://your-api.com/api\""
```

## Required Endpoints
- `POST /api/auth/login` - Authentication
- `POST /api/auth/signup` - Registration  
- `GET /api/search?q=query` - Search
- `POST /api/summary/webpage` - AI summaries

---

See main [README.md](../README.md) for complete documentation.
