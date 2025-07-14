import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database.config import SessionLocal, engine
from models.esg_company import ESGCompany, Base

def populate_database():
    """Populate database with initial ESG company data"""
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Clear existing data (only if table exists)
        db.query(ESGCompany).delete()
        db.commit()
    except:
        pass  # Table doesn't exist yet, that's fine
    
    # Sample ESG company data
    companies = [
        {
            'symbol': 'TSLA',
            'name': 'Tesla Inc.',
            'sector': 'Automotive',
            'environmental_score': 92.0,
            'social_score': 78.0,
            'governance_score': 85.0,
            'overall_score': 85.0,
            'carbon_neutral': True,
            'renewable_energy_percentage': 95.0,
            'sustainability_goals': 'Accelerate sustainable transport|Zero emissions manufacturing|Renewable energy ecosystem|Sustainable supply chain',
            'key_initiatives': 'Gigafactory renewable energy|Battery recycling program|Employee safety excellence|Transparent reporting'
        },
        {
            'symbol': 'MSFT',
            'name': 'Microsoft Corporation',
            'sector': 'Technology',
            'environmental_score': 88.0,
            'social_score': 94.0,
            'governance_score': 95.0,
            'overall_score': 92.0,
            'carbon_neutral': True,
            'renewable_energy_percentage': 100.0,
            'sustainability_goals': 'Carbon negative by 2030|100% renewable energy|Zero waste operations|Water positive by 2030',
            'key_initiatives': 'AI for Earth program|Climate Innovation Fund|Diverse workforce initiatives|Transparent governance'
        },
        {
            'symbol': 'AAPL',
            'name': 'Apple Inc.',
            'sector': 'Technology',
            'environmental_score': 91.0,
            'social_score': 86.0,
            'governance_score': 90.0,
            'overall_score': 89.0,
            'carbon_neutral': True,
            'renewable_energy_percentage': 100.0,
            'sustainability_goals': 'Carbon neutral by 2030|100% recycled materials|Zero waste to landfill|Renewable energy supply chain',
            'key_initiatives': 'Supplier Clean Energy Program|Recycling robot Daisy|Privacy protection|Accessibility features'
        },
        {
            'symbol': 'NFLX',
            'name': 'Netflix Inc.',
            'sector': 'Media & Entertainment',
            'environmental_score': 75.0,
            'social_score': 88.0,
            'governance_score': 82.0,
            'overall_score': 82.0,
            'carbon_neutral': True,
            'renewable_energy_percentage': 78.0,
            'sustainability_goals': 'Net zero emissions by 2030|Diverse content creation|Global accessibility|Responsible content',
            'key_initiatives': 'Carbon offset programs|Inclusive storytelling|Employee wellbeing|Data privacy protection'
        },
        {
            'symbol': 'NVDA',
            'name': 'NVIDIA Corporation',
            'sector': 'Technology',
            'environmental_score': 88.0,
            'social_score': 85.0,
            'governance_score': 90.0,
            'overall_score': 88.0,
            'carbon_neutral': False,
            'renewable_energy_percentage': 65.0,
            'sustainability_goals': 'AI for climate solutions|Sustainable computing|Diverse workforce|Ethical AI development',
            'key_initiatives': 'Energy efficient GPUs|STEM education programs|Responsible AI research|Supply chain transparency'
        }
    ]
    
    try:
        # Clear existing data
        db.query(ESGCompany).delete()
        
        # Add new companies
        for company_data in companies:
            company = ESGCompany(**company_data)
            db.add(company)
        
        db.commit()
        print("✅ Database populated successfully with ESG company data!")
        
    except Exception as e:
        print(f"❌ Error populating database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    populate_database() 