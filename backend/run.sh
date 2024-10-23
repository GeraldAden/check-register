export DATABASE_URL=sqlite:///../database/check_register.db
uvicorn api:app --port 8000 --reload
