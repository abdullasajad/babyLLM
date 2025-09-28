# babyLLM - AI Search Assistant

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/abdullasajad/babyLLM)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/abdullasajad/babyLLM)

A simple AI-powered search assistant that combines web search with GPT summaries.

## Features

- **Web Search**: Real-time search with Bing API
- **AI Summaries**: GPT-powered content summarization  
- **Responsive UI**: Works on desktop and mobile
- **Free Hosting**: Deploy for $0/month

## Tech Stack

- **Frontend**: Vanilla JavaScript, HTML, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **APIs**: Bing Search, OpenAI GPT

## Quick Start

### Local Development
```bash
# Clone and setup
git clone https://github.com/abdullasajad/babyLLM.git
cd babyLLM

# Start backend
cd backend
npm install
npm start

# Start frontend (new terminal)
cd frontend
npm install
npm start
```

Visit `http://localhost:3000`

### Deploy to Production
1. Click the deploy buttons above
2. Set environment variables (see below)
3. Your app will be live in minutes

## Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/babyllm
JWT_SECRET=your-super-secret-jwt-key

# Optional API Keys (app works with demo data without these)
BING_SEARCH_API_KEY=your_bing_api_key
OPENAI_API_KEY=sk-your_openai_api_key
```

### Frontend (.env)
```env
EXPO_PUBLIC_API_URL=https://your-backend-domain.railway.app/api
```

## Getting API Keys (Optional)

The app works with demo data, but for real functionality:

1. **Bing Search API**: Go to [Azure Portal](https://portal.azure.com) → Create "Bing Search v7" (1,000 free searches/month)
2. **OpenAI API**: Go to [OpenAI Platform](https://platform.openai.com) → Create API key ($5 free credit)

## Deployment Cost

**Free Tier**: $0/month using Vercel + Railway + MongoDB Atlas free tiers

## API Endpoints

```bash
GET  /health                    # Health check
GET  /api/search?q=query       # Search web
POST /api/summary/webpage      # Generate summary
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see [LICENSE](./LICENSE) file for details.</div>
