from sqlalchemy import Column
from sqlalchemy import String, Date

from .base import Base

# political_groups table
# Author: Antonio Scardace

class PoliticalGroups(Base):

    __tablename__ = 'political_groups'

    name = Column('name', String(32), nullable=False, primary_key=True)
    country = Column('country', String(16), nullable=False)
    logo_color = Column('logo_color', String(32), nullable=False)
    last_update = Column('last_update', Date, nullable=False)

    def __init__(self, name: str):
        self.name = name