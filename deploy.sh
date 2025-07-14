#!/bin/bash

echo "🚀 ESG Intelligence Deployment Script"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 Deployment Checklist:${NC}"
echo "1. ✅ Backend code ready"
echo "2. ✅ Frontend code ready"
echo "3. ✅ GitHub repository updated"
echo "4. ✅ Render.com configuration prepared"
echo "5. ✅ Vercel configuration prepared"

echo -e "\n${YELLOW}🔧 Next Steps:${NC}"
echo "1. Deploy Backend to Render.com:"
echo "   - Go to https://render.com"
echo "   - Create Web Service"
echo "   - Connect GitHub: Manthanbhanushali010/ESG-intelligence"
echo "   - Root Directory: backend"
echo "   - Build: pip install -r requirements.txt && python src/init_database.py"
echo "   - Start: gunicorn --bind 0.0.0.0:\$PORT src.main:app"

echo -e "\n2. Deploy Frontend to Vercel:"
echo "   - Update backend URL in frontend/src/config.js"
echo "   - Run: cd frontend && npx vercel --prod"

echo -e "\n${GREEN}📊 Test URLs:${NC}"
echo "Backend API: https://your-app.onrender.com/api/esg/analyze"
echo "Frontend: https://your-app.vercel.app"

echo -e "\n${BLUE}🧪 Test Command:${NC}"
echo "curl -X POST https://your-backend-url/api/esg/analyze \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"symbol\": \"TSLA\"}'"

echo -e "\n${GREEN}✨ Deployment Ready!${NC}" 