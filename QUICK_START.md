# 🚀 Quick Start Guide for babyLLM

## Current Status: Dependencies Installing

The project dependencies are currently being installed. Here's how to start the project:

## Method 1: Automatic (Recommended)

```bash
# Run the quick start script
.\quick-start.bat
```

## Method 2: Manual Step-by-Step

### 1. Install Backend Dependencies
```bash
cd backend
npm install --force
```

### 2. Install Frontend Dependencies
```bash
cd ../frontend
npm install --legacy-peer-deps
```

### 3. Start Backend Server
```bash
cd backend
npm run dev
```
Backend will start on: http://localhost:5000

### 4. Start Frontend Server (New Terminal)
```bash
cd frontend
npm start
```
Frontend will start on: http://localhost:19006

## Method 3: If Dependencies Fail

If you encounter dependency issues, try:

```bash
# Backend
cd backend
npm install --legacy-peer-deps --force

# Frontend  
cd frontend
npm install --legacy-peer-deps --force
```

## Environment Setup

1. **Backend Environment** (backend/.env):
```
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
BING_SEARCH_API_KEY=your_bing_api_key
OPENAI_API_KEY=your_openai_api_key
```

2. **Frontend Environment** (frontend/.env):
```
EXPO_PUBLIC_API_URL=http://localhost:5000/api
```

## Troubleshooting

### Common Issues:

1. **Port 5000 in use**: Change PORT in backend/.env
2. **Dependencies conflicts**: Use --legacy-peer-deps flag
3. **Missing API keys**: Add them to backend/.env

### Quick Test:

1. Backend health check: http://localhost:5000/health
2. Frontend web app: http://localhost:19006

## Next Steps

Once both servers are running:
1. Open http://localhost:19006 in your browser
2. Create an account or log in
3. Try searching for something
4. Test the AI summarization features

## Need Help?

Check the full documentation:
- `DEPLOYMENT.md` - Full deployment guide
- `HEALTH_CHECK.md` - Project status
- `PROJECT_SUMMARY.md` - Architecture overview
