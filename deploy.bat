@echo off
setlocal enabledelayedexpansion

REM babyLLM Windows Deployment Script
REM This script helps you deploy babyLLM to production

echo 🚀 babyLLM Deployment Script
echo ==============================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Dependencies check passed!
echo.

REM Setup environment files
echo 📝 Setting up environment files...

REM Backend environment
if not exist "backend\.env" (
    echo Creating backend .env file...
    (
        echo NODE_ENV=production
        echo PORT=5000
        echo MONGODB_URI=mongodb://localhost:27017/babyllm
        echo JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
        echo CORS_ORIGIN=http://localhost:3000
        echo # Optional API keys for full functionality
        echo # BING_SEARCH_API_KEY=your_bing_api_key
        echo # OPENAI_API_KEY=your_openai_api_key
    ) > backend\.env
    echo ⚠️  Please edit backend\.env with your actual values!
)

REM Frontend environment
if not exist "frontend\.env" (
    echo Creating frontend .env file...
    echo EXPO_PUBLIC_API_URL=http://localhost:5000/api > frontend\.env
    echo ⚠️  Please edit frontend\.env with your backend URL!
)

echo ✅ Environment files created!
echo.

REM Install dependencies
echo 📦 Installing dependencies...

REM Install root dependencies
if exist "package.json" (
    npm install
)

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
npm install
if %errorlevel% neq 0 (
    echo ⚠️  Backend installation had issues, trying with --force...
    npm install --force
)
cd ..

REM Install frontend dependencies
if exist "frontend\package.json" (
    echo Installing frontend dependencies...
    cd frontend
    npm install --legacy-peer-deps
    if %errorlevel% neq 0 (
        echo ⚠️  Frontend installation had issues, trying with --force...
        npm install --force
    )
    cd ..
)

echo ✅ Dependencies installed!
echo.

REM Test local setup
echo 🧪 Testing local setup...
echo.
echo You can now test your app locally:
echo 1. Backend: cd backend ^&^& node simple-server.js
echo 2. Frontend: cd frontend ^&^& node simple-server.js
echo 3. Open: http://localhost:3000
echo.

REM Production deployment info
echo 🚀 Production Deployment Options:
echo.
echo Option 1: Free Hosting (Recommended)
echo - Frontend: Vercel (Free)
echo - Backend: Railway (Free)
echo - Database: MongoDB Atlas (Free)
echo - Total Cost: $0/month
echo.
echo Option 2: Production Scale
echo - Frontend: Vercel Pro ($20/month)
echo - Backend: Railway Pro ($5/month)
echo - Database: MongoDB Atlas M10 ($9/month)
echo - Total Cost: $34/month
echo.

REM Ask about deployment
set /p deploy="Do you want to see deployment instructions? (y/N): "
if /i "%deploy%"=="y" (
    echo.
    echo 📋 Quick Deployment Steps:
    echo.
    echo 1. DATABASE SETUP (MongoDB Atlas):
    echo    - Go to https://mongodb.com/atlas
    echo    - Create free cluster
    echo    - Get connection string
    echo.
    echo 2. BACKEND DEPLOYMENT (Railway):
    echo    - Go to https://railway.app
    echo    - Connect GitHub repository
    echo    - Set environment variables
    echo.
    echo 3. FRONTEND DEPLOYMENT (Vercel):
    echo    - Go to https://vercel.com
    echo    - Connect GitHub repository
    echo    - Set API URL environment variable
    echo.
    echo 📖 See HOSTING_GUIDE.md for detailed instructions!
    echo.
)

REM Install deployment tools
set /p tools="Do you want to install deployment tools (Railway CLI, Vercel CLI)? (y/N): "
if /i "%tools%"=="y" (
    echo.
    echo 🛠️  Installing deployment tools...
    echo Installing Railway CLI...
    npm install -g @railway/cli
    echo Installing Vercel CLI...
    npm install -g vercel
    echo.
    echo ✅ Deployment tools installed!
    echo.
    echo Quick commands:
    echo - railway login ^&^& railway up (deploy backend)
    echo - vercel login ^&^& vercel --prod (deploy frontend)
    echo.
)

echo.
echo 🎉 babyLLM deployment script completed!
echo.
echo 📁 Your project structure:
echo ├── backend/          (Node.js API server)
echo ├── frontend/         (Web application)
echo ├── HOSTING_GUIDE.md  (Detailed deployment guide)
echo └── deploy.bat        (This script)
echo.
echo 🚀 Your app is ready to be hosted!
echo 📖 Check HOSTING_GUIDE.md for step-by-step instructions.
echo.

pause
