from database import Base
from sqlalchemy import Column, Integer, String, TIMESTAMP, text


class Offer(Base):
    __tablename__ = "offers"

    id = Column(Integer, primary_key=True, nullable=False)
    origin_code = Column(String, nullable=False)
    origin_airport = Column(String, nullable=False)
    destination_code = Column(String, nullable=False)
    destination_airport = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    departure_date = Column(String, nullable=False)
    departure_time = Column(String, nullable=True)
    arrival_time = Column(String, nullable=True)
    duration = Column(String, nullable=True)
    stop_airports = Column(String, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text("now()"))
