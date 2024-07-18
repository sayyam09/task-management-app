# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
# from app.models import Base

# #DATABASE_URL = 'mysql+pymysql://root:sayyam24@localhost:3306/task_management'
# DATABASE_URL = 'sqlite:///./task_management.db'
# engine = create_engine(DATABASE_URL)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base = declarative_base()

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
#from app.models import Task  # Import the Task model

DATABASE_URL = 'sqlite:///./task_management.db'

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Create the database tables
Base.metadata.create_all(bind=engine)
