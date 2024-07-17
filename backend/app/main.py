from fastapi import FastAPI
from app.routers import tasks
from app.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    'http://localhost:3000',
    "https://task-management-app-frontend-hazel.vercel.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
        allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)
Base.metadata.create_all(bind=engine)

app.include_router(tasks.router)

