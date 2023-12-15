from sqlalchemy import Column
from sqlalchemy import String, Date, Integer, ForeignKey

from .base import Base

# twitter_hashtags_accounts table.
# Author: Antonio Scardace

class TwitterHashtagsAccounts(Base):

    __tablename__ = 'twitter_hashtags_accounts'

    id = Column('id', Integer, nullable=False, primary_key=True)
    handle = Column('handle', String(255), ForeignKey('twitter_accounts.handle', ondelete='CASCADE'), nullable=False)
    hashtag = Column('hashtag', String(128), nullable=False)
    date = Column('date', Date, nullable=False)

    def __init__(self, id: str):
        self.id = id