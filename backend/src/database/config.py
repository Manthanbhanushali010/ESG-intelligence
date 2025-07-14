from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os

import os

# Database URL - Use PostgreSQL in production, SQLite in development
DATABASE_URL = os.getenv('DATABASE_URL', "sqlite:///./esg_intelligence.db")

# Create engine with appropriate connect_args
if DATABASE_URL.startswith('postgresql'):
    # PostgreSQL (production)
    engine = create_engine(DATABASE_URL)
else:
    # SQLite (development)
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False}
    )

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class
Base = declarative_base()

def get_db():
    """Dependency to get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """Initialize database with tables"""
    Base.metadata.create_all(bind=engine) 