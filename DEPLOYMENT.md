# babyLLM Deployment Guide

This guide will help you deploy babyLLM completely for free using various cloud services.

## 🚀 Quick Start

### Prerequisites
- GitHub account
- Node.js 18+ installed locally
- Git installed

### 1. Clone and Setup

```bash
git clone https://github.com/abdullasajad/babyLLM.git
cd babyLLM

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## 🗄️ Database Setup (MongoDB Atlas - FREE)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for free account
   - Create a new cluster (M0 Sandbox - FREE forever)

2. **Configure Database**
   - Create database user with read/write permissions
   - Whitelist IP addresses (0.0.0.0/0 for development)
   - Get connection string

3. **Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/babyllm?retryWrites=true&w=majority
   ```

## 🔧 Backend Deployment (Railway - FREE)

### Option 1: Railway (Recommended)

1. **Create Railway Account**
   - Go to [Railway](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**
   - Connect your GitHub repository
   - Select the babyLLM repository
   - Railway will auto-detect the Node.js app
   - Set environment variables in Railway dashboard:
     ```
     NODE_ENV=production
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_super_secret_jwt_key_here
     BING_SEARCH_API_KEY=your_bing_api_key
     OPENAI_API_KEY=your_openai_api_key
     PORT=5000
     ```

3. **Custom Start Command**
   - Set start command: `cd backend && npm start`

### Option 2: Render (Alternative)

1. **Create Render Account**
   - Go to [Render](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Connect GitHub repository
   - Set build command: `cd backend && npm install`
   - Set start command: `cd backend && npm start`
   - Add environment variables

## 🌐 Frontend Deployment (Vercel - FREE)

1. **Create Vercel Account**
   - Go to [Vercel](https://vercel.com)
   - Sign up with GitHub

2. **Deploy Frontend**
   - Import your GitHub repository
   - Set framework preset to "Other"
   - Set build command: `cd frontend && npm run build`
   - Set output directory: `frontend/web-build`
   - Add environment variables:
     ```
     EXPO_PUBLIC_API_URL=https://your-railway-app.railway.app/api
     ```

3. **Custom Domain (Optional)**
   - Add custom domain in Vercel dashboard
   - Update DNS records as instructed

## 🔑 API Keys Setup (FREE Tiers)

### Bing Search API
1. Go to [Microsoft Azure](https://azure.microsoft.com/free/)
2. Create free account (requires credit card but won't charge)
3. Create Bing Search v7 resource
4. Get API key (1000 queries/month free)

### OpenAI API
1. Go to [OpenAI](https://platform.openai.com)
2. Create account and get API key
3. Add $5 credit for testing (pay-as-you-go)

### Alternative: OpenRouter (More Free Options)
1. Go to [OpenRouter](https://openrouter.ai)
2. Create account
3. Get API key with free tier models

## 🔄 CI/CD Setup (GitHub Actions - FREE)

1. **Add Repository Secrets**
   Go to GitHub repository → Settings → Secrets and variables → Actions

   Add these secrets:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   BING_SEARCH_API_KEY=your_bing_key
   OPENAI_API_KEY=your_openai_key
   RAILWAY_TOKEN=your_railway_token
   VERCEL_TOKEN=your_vercel_token
   VERCEL_ORG_ID=your_vercel_org_id
   VERCEL_PROJECT_ID=your_vercel_project_id
   API_URL=https://your-backend-url.railway.app/api
   ```

2. **Get Railway Token**
   - Install Railway CLI: `npm install -g @railway/cli`
   - Login: `railway login`
   - Get token: `railway whoami --token`

3. **Get Vercel Tokens**
   - Install Vercel CLI: `npm install -g vercel`
   - Login: `vercel login`
   - Get tokens from Vercel dashboard

## 📱 Mobile App Deployment

### Android (Google Play Store)

1. **Build APK**
   ```bash
   cd frontend
   expo build:android
   ```

2. **Download APK**
   - Expo will provide download link
   - Test APK on device

3. **Play Store Upload**
   - Create Google Play Console account ($25 one-time fee)
   - Upload APK and fill store listing

### iOS (App Store)

1. **Build IPA**
   ```bash
   cd frontend
   expo build:ios
   ```

2. **App Store Connect**
   - Requires Apple Developer account ($99/year)
   - Upload IPA through Xcode or Application Loader

## 🔍 Monitoring and Analytics (FREE)

### Railway Monitoring
- Built-in metrics and logs
- 500 hours/month free

### Vercel Analytics
- Built-in web analytics
- Free tier available

### MongoDB Atlas Monitoring
- Built-in database monitoring
- Performance insights

## 💰 Cost Breakdown

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| MongoDB Atlas | 512MB storage | $9+/month |
| Railway | 500 hours/month | $5+/month |
| Vercel | 100GB bandwidth | $20+/month |
| Bing Search API | 1000 queries/month | $4/1000 queries |
| OpenAI API | $5 credit | Pay-as-you-go |

**Total Free Usage**: Perfect for development and small-scale production!

## 🚨 Production Considerations

### Security
- Use strong JWT secrets
- Enable CORS properly
- Rate limit API endpoints
- Validate all inputs

### Performance
- Enable caching
- Optimize images
- Use CDN for static assets
- Monitor API response times

### Scaling
- MongoDB Atlas auto-scaling
- Railway auto-scaling
- Vercel edge functions

## 🛠️ Troubleshooting

### Common Issues

1. **CORS Errors**
   - Update CORS_ORIGIN in backend environment variables
   - Include your Vercel domain

2. **Database Connection**
   - Check MongoDB Atlas IP whitelist
   - Verify connection string format

3. **API Key Limits**
   - Monitor usage in respective dashboards
   - Implement caching to reduce API calls

4. **Build Failures**
   - Check Node.js version compatibility
   - Verify all environment variables are set

### Support
- Create issues in GitHub repository
- Check Railway/Vercel documentation
- MongoDB Atlas support forum

## 📈 Next Steps

1. **Custom Domain**: Add your own domain
2. **Analytics**: Implement user analytics
3. **Caching**: Add Redis caching layer
4. **CDN**: Use Cloudflare for better performance
5. **Monitoring**: Add error tracking (Sentry)

---

🎉 **Congratulations!** Your babyLLM application is now deployed and running completely free!
