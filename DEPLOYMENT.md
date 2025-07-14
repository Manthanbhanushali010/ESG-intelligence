# ESG Intelligence Engine - Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended - 5 minutes)
1. **Deploy Frontend:**
   ```bash
   cd frontend
   npm install -g vercel
   vercel --prod
   ```

2. **Deploy Backend:**
   ```bash
   cd backend
   vercel --prod
   ```

### Option 2: Railway (Backend) + Vercel (Frontend)
1. **Backend on Railway:**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repo
   - Deploy the `backend` folder
   - Get your API URL

2. **Update Frontend Config:**
   ```javascript
   // frontend/src/config.js
   production: {
     apiUrl: 'https://your-railway-app.railway.app'
   }
   ```

### Option 3: Render (Free Tier)
1. **Backend on Render:**
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect GitHub repo
   - Set build command: `pip install -r requirements.txt`
   - Set start command: `gunicorn src.main:app`

### Option 4: GitHub Pages (Frontend Only)
1. **Enable GitHub Pages:**
   - Go to repo Settings > Pages
   - Source: Deploy from branch
   - Branch: gh-pages
   - The GitHub Action will auto-deploy

## 🌐 Local Network Access

### Make it accessible on your network:
```bash
# Backend
cd backend
python src/main.py --host 0.0.0.0 --port 5003

# Frontend  
cd frontend
npm run dev -- --host
```

### Access URLs:
- **Frontend**: `http://YOUR_IP:5173`
- **Backend**: `http://YOUR_IP:5003`

## 🔧 Environment Variables

### Backend (.env):
```env
FLASK_ENV=production
DATABASE_URL=sqlite:///./esg_intelligence.db
CORS_ORIGINS=*
```

### Frontend (.env):
```env
VITE_API_URL=https://your-backend-url.com
```

## 📊 Demo Data

The app includes demo ESG data for:
- **TSLA** (Tesla) - 85 ESG Score
- **MSFT** (Microsoft) - 92 ESG Score  
- **AAPL** (Apple) - 89 ESG Score
- **NFLX** (Netflix) - 82 ESG Score
- **NVDA** (NVIDIA) - 88 ESG Score

## 🎯 Testing

1. **Local Testing:**
   ```bash
   # Terminal 1
   cd backend && python src/main.py
   
   # Terminal 2  
   cd frontend && npm run dev
   ```

2. **Access URLs:**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5003

3. **Test API:**
   ```bash
   curl -X POST http://localhost:5003/api/esg/analyze \
     -H "Content-Type: application/json" \
     -d '{"symbol": "TSLA"}'
   ```

## 🔒 Security Notes

- ✅ CORS enabled for development
- ✅ Input validation on API endpoints
- ✅ Error handling with fallbacks
- ⚠️ Add authentication for production
- ⚠️ Use HTTPS in production

## 📈 Performance

- **Frontend**: React + Vite (Fast build)
- **Backend**: Flask + SQLAlchemy (Lightweight)
- **Database**: SQLite (File-based, easy deployment)
- **Caching**: Add Redis for production scale

## 🚀 Production Checklist

- [ ] Deploy backend to cloud platform
- [ ] Update frontend API URL
- [ ] Add environment variables
- [ ] Enable HTTPS
- [ ] Add monitoring/logging
- [ ] Set up CI/CD pipeline
- [ ] Add authentication
- [ ] Configure database backups

## 📞 Support

For deployment issues:
1. Check the logs in your deployment platform
2. Verify environment variables
3. Test API endpoints directly
4. Check CORS configuration

---

**Ready to deploy! Choose your preferred option above.** 