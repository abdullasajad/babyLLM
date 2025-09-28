@echo off
echo 🚀 Starting babyLLM Development Environment...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version

REM Install root dependencies
echo 📦 Installing root dependencies...
npm install

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
if not exist ".env" (
    echo ⚠️  Creating .env file from template...
    copy env.example .env
    echo 📝 Please edit backend\.env with your API keys and database URL
)
npm install
cd ..

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
if not exist ".env" (
    echo ⚠️  Creating .env file from template...
    copy env.example .env
    echo 📝 Please edit frontend\.env with your API URL
)
npm install
cd ..

echo.
echo 🎉 Setup complete!
echo.
echo 📋 Next steps:
echo 1. Configure your environment variables:
echo    - Edit backend\.env with your API keys
echo    - Edit frontend\.env with your backend URL
echo.
echo 2. Start the development servers:
echo    npm run dev
echo.
echo 3. Or start them separately:
echo    Backend:  cd backend ^&^& npm run dev
echo    Frontend: cd frontend ^&^& npm start
echo.
echo 📖 For deployment instructions, see DEPLOYMENT.md
pause
