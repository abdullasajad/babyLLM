# 🆓 babyLLM - Free API Setup Guide

## 🎯 **REQUIRED APIs FOR FULL FUNCTIONALITY**

**Date**: September 27, 2025  
**Status**: ✅ **FREE TIER OPTIONS AVAILABLE**

---

## 🔑 **ESSENTIAL APIs (Free Tiers)**

### **1. 🔍 Search API (Required)**
**For web search functionality**

#### **Option A: Bing Search API (Recommended)**
- **Provider**: Microsoft Azure
- **Free Tier**: 1,000 searches/month
- **Cost**: $0/month (then $5 per 1,000 searches)
- **Quality**: Excellent search results

**Setup Steps**:
1. Go to [Azure Portal](https://portal.azure.com)
2. Create free account (no credit card for free tier)
3. Search "Bing Search v7" → Create
4. Get API key from "Keys and Endpoint"

#### **Option B: SerpAPI (Alternative)**
- **Provider**: SerpAPI
- **Free Tier**: 100 searches/month
- **Cost**: $0/month (then $50/month)
- **Quality**: Google search results

#### **Option C: Custom Search (Backup)**
- **Provider**: Google Custom Search
- **Free Tier**: 100 searches/day
- **Cost**: $0/month (then $5 per 1,000 searches)
- **Quality**: Good, customizable

### **2. 🤖 AI API (Required for Summaries)**
**For generating intelligent summaries**

#### **Option A: OpenAI API (Best Quality)**
- **Provider**: OpenAI
- **Free Tier**: $5 credit (expires after 3 months)
- **Cost**: ~$0.002 per summary
- **Models**: GPT-3.5-turbo, GPT-4

**Setup Steps**:
1. Go to [OpenAI Platform](https://platform.openai.com)
2. Create account → API Keys
3. Get $5 free credit (enough for ~2,500 summaries)

#### **Option B: Anthropic Claude (Alternative)**
- **Provider**: Anthropic
- **Free Tier**: Limited free usage
- **Cost**: Pay-per-use
- **Quality**: Excellent for summaries

#### **Option C: Hugging Face (Free)**
- **Provider**: Hugging Face
- **Free Tier**: Unlimited (rate limited)
- **Cost**: $0/month
- **Quality**: Good, open-source models

---

## 💰 **COST BREAKDOWN (Free Tiers)**

| API | Free Tier | Monthly Limit | Estimated Usage |
|-----|-----------|---------------|-----------------|
| **Bing Search** | 1,000 searches | 1,000 queries | ~33 searches/day |
| **OpenAI GPT-3.5** | $5 credit | ~2,500 summaries | ~83 summaries/day |
| **MongoDB Atlas** | 512MB storage | Unlimited requests | Small database |
| **Railway** | 500 hours | ~21 days uptime | Development use |
| **Vercel** | 100GB bandwidth | Unlimited requests | High traffic OK |

**Total Cost**: **$0/month** for moderate usage

---

## 🚀 **QUICK API SETUP (15 minutes)**

### **Step 1: Bing Search API (5 minutes)**
```bash
# 1. Go to https://portal.azure.com
# 2. Sign up for free account
# 3. Search "Bing Search v7"
# 4. Create resource (free tier)
# 5. Copy API key
```

**Environment Variable**:
```env
BING_SEARCH_API_KEY=your_bing_api_key_here
```

### **Step 2: OpenAI API (5 minutes)**
```bash
# 1. Go to https://platform.openai.com
# 2. Create account
# 3. Go to API Keys section
# 4. Create new API key
# 5. Copy key (starts with sk-)
```

**Environment Variable**:
```env
OPENAI_API_KEY=sk-your_openai_api_key_here
```

### **Step 3: Update Backend (5 minutes)**
Add to your `backend/.env` file:
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=http://localhost:3000

# API Keys for full functionality
BING_SEARCH_API_KEY=your_bing_api_key_here
OPENAI_API_KEY=sk-your_openai_api_key_here
```

---

## 🔄 **FALLBACK OPTIONS (No API Keys)**

### **Demo Mode (No APIs Required)**
Your babyLLM works without APIs using **mock data**:

- **Search Results**: Pre-defined sample results
- **Summaries**: Template-based responses
- **All UI Features**: Fully functional
- **Perfect for**: Demos, development, testing

### **Gradual Upgrade Path**
1. **Start**: Demo mode (no APIs)
2. **Add Search**: Bing API for real search
3. **Add AI**: OpenAI for real summaries
4. **Scale Up**: Paid tiers when needed

---

## 🛠️ **API INTEGRATION STATUS**

### **✅ Already Integrated**
Your babyLLM backend already has:
- Bing Search API integration
- OpenAI API integration
- Fallback to mock data
- Error handling for missing APIs
- Rate limiting protection

### **🔧 Configuration Required**
Just add environment variables:
```env
# Required for real functionality
BING_SEARCH_API_KEY=your_key
OPENAI_API_KEY=your_key

# Optional for enhanced features
ANTHROPIC_API_KEY=your_key
HUGGINGFACE_API_KEY=your_key
```

---

## 📊 **USAGE ESTIMATES**

### **Typical Usage (Free Tier Limits)**
- **Light Use**: 10 searches/day = 300/month ✅ Within limits
- **Medium Use**: 30 searches/day = 900/month ✅ Within limits
- **Heavy Use**: 50 searches/day = 1,500/month ❌ Exceeds free tier

### **Cost When Scaling**
- **Bing Search**: $5 per 1,000 additional searches
- **OpenAI**: ~$0.002 per summary (very cheap)
- **Total**: ~$10-20/month for heavy usage

---

## 🔒 **API SECURITY BEST PRACTICES**

### **Environment Variables**
```env
# ✅ Correct - Use environment variables
OPENAI_API_KEY=sk-your_key_here

# ❌ Wrong - Never hardcode in code
const apiKey = "sk-your_key_here"
```

### **Rate Limiting**
Your backend includes:
- Request rate limiting
- API quota monitoring
- Graceful fallbacks
- Error handling

### **Key Rotation**
- Regenerate keys monthly
- Use different keys for dev/prod
- Monitor usage in dashboards
- Set up billing alerts

---

## 🎯 **RECOMMENDED SETUP ORDER**

### **Phase 1: Free Demo (0 APIs)**
```bash
# Deploy without any API keys
# Uses mock data for everything
# Perfect for testing deployment
```

### **Phase 2: Real Search (1 API)**
```bash
# Add Bing Search API
BING_SEARCH_API_KEY=your_key
# Real search results, mock summaries
```

### **Phase 3: Full AI (2 APIs)**
```bash
# Add OpenAI API
BING_SEARCH_API_KEY=your_bing_key
OPENAI_API_KEY=your_openai_key
# Full functionality unlocked!
```

---

## 🆓 **FREE ALTERNATIVES**

### **Search Alternatives**
1. **DuckDuckGo API** - Limited but free
2. **Wikipedia API** - Free, educational content
3. **News API** - Free tier for news search
4. **Custom scraping** - Build your own (advanced)

### **AI Alternatives**
1. **Hugging Face** - Free inference API
2. **Cohere** - Free tier available
3. **AI21 Labs** - Free trial credits
4. **Local models** - Run on your server

---

## 📞 **GETTING API KEYS**

### **Bing Search API**
```
1. Visit: https://portal.azure.com
2. Sign up: Free account (no credit card)
3. Create: "Bing Search v7" resource
4. Location: Choose closest region
5. Pricing: F1 (Free tier)
6. Get Key: Resource → Keys and Endpoint
```

### **OpenAI API**
```
1. Visit: https://platform.openai.com
2. Sign up: Email verification required
3. Navigate: API → API Keys
4. Create: New secret key
5. Copy: Starts with "sk-"
6. Usage: Monitor in dashboard
```

---

## 🎉 **SUCCESS CHECKLIST**

### **✅ API Setup Complete When:**
- [ ] Bing Search API key obtained
- [ ] OpenAI API key obtained
- [ ] Environment variables set
- [ ] Backend restarted with new keys
- [ ] Search returns real results
- [ ] Summaries are AI-generated
- [ ] No error messages in console

### **🧪 Test Your APIs**
```bash
# Test search endpoint
curl "http://localhost:5000/api/search?q=artificial intelligence"

# Test summary endpoint
curl -X POST "http://localhost:5000/api/summary/webpage" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

---

## 🚀 **READY TO GO!**

With these free API keys, your babyLLM will have:
- ✅ **Real web search** (1,000 searches/month free)
- ✅ **AI-powered summaries** ($5 credit = ~2,500 summaries)
- ✅ **Professional functionality** (indistinguishable from paid services)
- ✅ **Room to grow** (easy upgrade path when needed)

**🎊 Your AI search assistant will be fully functional with $0 monthly cost!**

---

*Start with free tiers, scale when you need to!* 💪
