@echo off
echo 🚀 Quick Start babyLLM...

echo 📦 Installing backend dependencies...
cd backend
npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    echo ❌ Backend installation failed, trying with --force...
    npm install --force
)

echo 📦 Installing frontend dependencies...
cd ..\frontend
npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    echo ❌ Frontend installation failed, trying with --force...
    npm install --force
)

echo ✅ Dependencies installed!
echo 🚀 Starting development servers...

echo Starting backend server...
cd ..\backend
start cmd /k "npm run dev"

echo Starting frontend server...
cd ..\frontend
start cmd /k "npm start"

echo 🎉 Both servers are starting!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:19006

pause
