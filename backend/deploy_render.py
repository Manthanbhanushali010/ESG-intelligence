#!/usr/bin/env python3
"""
Deployment script for Render.com
This script helps prepare the backend for Render deployment
"""

import os
import sys
import subprocess

def check_requirements():
    """Check if all required files exist"""
    required_files = [
        'requirements.txt',
        'src/main.py',
        'src/routes/esg.py',
        'src/models/esg_company.py',
        'src/database/config.py',
        'render.yaml'
    ]
    
    missing_files = []
    for file in required_files:
        if not os.path.exists(file):
            missing_files.append(file)
    
    if missing_files:
        print("❌ Missing required files:")
        for file in missing_files:
            print(f"   - {file}")
        return False
    
    print("✅ All required files found")
    return True

def create_env_file():
    """Create .env file for local development"""
    env_content = """# Local Development Environment
FLASK_ENV=development
DATABASE_URL=sqlite:///./esg_intelligence.db
CORS_ORIGINS=*
DEBUG=True
"""
    
    with open('.env', 'w') as f:
        f.write(env_content)
    
    print("✅ Created .env file for local development")

def main():
    print("🚀 Preparing ESG Intelligence Backend for Render.com deployment")
    print("=" * 60)
    
    # Check requirements
    if not check_requirements():
        sys.exit(1)
    
    # Create .env file
    create_env_file()
    
    print("\n📋 Deployment Checklist:")
    print("1. ✅ Backend files prepared")
    print("2. ✅ Database configuration updated")
    print("3. ✅ Requirements updated")
    print("4. ✅ Render.yaml created")
    
    print("\n🎯 Next Steps:")
    print("1. Push your code to GitHub")
    print("2. Go to https://render.com")
    print("3. Connect your GitHub repository")
    print("4. Select 'Web Service'")
    print("5. Choose the 'backend' directory")
    print("6. Deploy!")
    
    print("\n🔗 Your app will be available at:")
    print("   https://your-app-name.onrender.com")
    
    print("\n📊 API Endpoints:")
    print("   - POST /api/esg/analyze")
    print("   - GET /api/esg/rankings")
    print("   - GET /api/esg/trends")
    print("   - GET /api/esg/sectors")

if __name__ == "__main__":
    main() 