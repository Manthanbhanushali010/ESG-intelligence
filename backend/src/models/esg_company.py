from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class ESGCompany(Base):
    __tablename__ = 'esg_companies'
    
    id = Column(Integer, primary_key=True)
    symbol = Column(String(10), unique=True, nullable=False)
    name = Column(String(200), nullable=False)
    sector = Column(String(100), nullable=False)
    
    # ESG Scores
    environmental_score = Column(Float, nullable=False)
    social_score = Column(Float, nullable=False)
    governance_score = Column(Float, nullable=False)
    overall_score = Column(Float, nullable=False)
    
    # Sustainability Metrics
    carbon_neutral = Column(Boolean, default=False)
    renewable_energy_percentage = Column(Float, default=0.0)
    
    # Goals and Initiatives (stored as JSON strings)
    sustainability_goals = Column(Text)  # JSON string
    key_initiatives = Column(Text)      # JSON string
    
    # Metadata
    last_updated = Column(DateTime, default=datetime.utcnow)
    data_source = Column(String(100), default='ESG Intelligence Engine')
    
    def to_dict(self):
        """Convert model to dictionary for API responses"""
        return {
            'symbol': self.symbol,
            'name': self.name,
            'sector': self.sector,
            'scores': {
                'environmental': self.environmental_score,
                'social': self.social_score,
                'governance': self.governance_score,
                'overall': self.overall_score
            },
            'carbon_neutral': self.carbon_neutral,
            'renewable_energy': self.renewable_energy_percentage,
            'sustainability_goals': self.sustainability_goals.split('|') if self.sustainability_goals else [],
            'key_initiatives': self.key_initiatives.split('|') if self.key_initiatives else [],
            'last_updated': self.last_updated.isoformat(),
            'data_source': self.data_source
        } 