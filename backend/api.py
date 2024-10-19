from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import Column, String, Float, Text, create_engine, or_
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from typing import Optional

# Initialize FastAPI app
app = FastAPI()

# Define SQLite database connection
DATABASE_URL = "sqlite:///../database/check_register.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Define the CHKREG_2024 model class
class CHKREG(Base):
    __tablename__ = "CHKREG_2024"
    CheckNO = Column(String(8), primary_key=True, index=True)
    checkDate = Column(Text, nullable=False)
    checkCode = Column(String(3), nullable=False)
    checkAmount = Column(Float, nullable=False)
    checkDescription = Column(String(100), nullable=False)
    checkUserDef1 = Column(String(10), nullable=True)
    checkUserDef2 = Column(String(10), nullable=True)

# Create tables in the database
Base.metadata.create_all(bind=engine)

# Define Pydantic model for input data validation
class CHKREGCreate(BaseModel):
    CheckNO: str
    checkDate: str
    checkCode: str
    checkAmount: float
    checkDescription: str
    checkUserDef1: Optional[str] = None
    checkUserDef2: Optional[str] = None

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Add CORS middleware
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route to get all records from CHKREG_2024
@app.get("/chkreg", response_model=list[CHKREGCreate])
def get_all_records(db: Session = Depends(get_db)):
    return db.query(CHKREG).all()

# Route to get a record by CheckNO
@app.get("/chkreg/{check_no}", response_model=CHKREGCreate)
def get_record_by_check_no(check_no: str, db: Session = Depends(get_db)):
    record = db.query(CHKREG).filter(CHKREG.CheckNO == check_no).first()
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    return record

# Route to get records by CheckCode
@app.get("/chkreg/code/{check_code}", response_model=list[CHKREGCreate])
def get_records_by_check_code(check_code: str, db: Session = Depends(get_db)):
    return db.query(CHKREG).filter(CHKREG.checkCode == check_code).all()

# Route to get records with checkAmount greater than a given amount
@app.get("/chkreg/amount_greater/{amount}", response_model=list[CHKREGCreate])
def get_records_by_amount_greater(amount: float, db: Session = Depends(get_db)):
    return db.query(CHKREG).filter(CHKREG.checkAmount > amount).all()

# Route to get records with checkDate between two given dates
@app.get("/chkreg/date_range", response_model=list[CHKREGCreate])
def get_records_by_date_range(start_date: str, end_date: str, db: Session = Depends(get_db)):
    return db.query(CHKREG).filter(CHKREG.checkDate.between(start_date, end_date)).all()

# Route to get records by checkDescription containing a given string
@app.get("/chkreg/description/{description}", response_model=list[CHKREGCreate])
def get_records_by_description(description: str, db: Session = Depends(get_db)):
    return db.query(CHKREG).filter(CHKREG.checkDescription.contains(description)).all()

# Route to get records by checkUserDef1 or checkUserDef2 matching a given string
@app.get("/chkreg/userdef/{userdef}", response_model=list[CHKREGCreate])
def get_records_by_userdef(userdef: str, db: Session = Depends(get_db)):
    return db.query(CHKREG).filter(or_(CHKREG.checkUserDef1 == userdef, CHKREG.checkUserDef2 == userdef)).all()

# Route to update a record by CheckNO
@app.put("/chkreg/{check_no}", response_model=CHKREGCreate)
def update_record(check_no: str, updated_data: CHKREGCreate, db: Session = Depends(get_db)):
    record = db.query(CHKREG).filter(CHKREG.CheckNO == check_no).first()
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    for key, value in updated_data.dict().items():
        setattr(record, key, value)
    db.commit()
    db.refresh(record)
    return record

# Route to delete a record by CheckNO
@app.delete("/chkreg/{check_no}")
def delete_record(check_no: str, db: Session = Depends(get_db)):
    record = db.query(CHKREG).filter(CHKREG.CheckNO == check_no).first()
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    db.delete(record)
    db.commit()
    return {"detail": "Record deleted"}

# Route to insert a new record
@app.post("/chkreg", response_model=CHKREGCreate)
def create_record(new_record: CHKREGCreate, db: Session = Depends(get_db)):
    record = CHKREG(**new_record.dict())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record