from sqlalchemy import Column
from sqlalchemy import String, Date, Integer, Text, ForeignKey

from .base import Base

# twitter_accounts table.
# Author: Antonio Scardace

class TwitterAccounts(Base):

    __tablename__ = 'twitter_accounts'

    handle = Column('handle', String(255), nullable=False, primary_key=True)
    id = Column('id', String(64), nullable=False)
    full_name = Column('full_name', String(64), nullable=False)
    profile_image_url = Column('profile_image_url', String(255), nullable=False)
    verified = Column('verified', Integer, nullable=False)
    created_on = Column('created_on', String(64), nullable=False)
    followers_count = Column('followers_count', Integer, nullable=False)
    following_count = Column('following_count', Integer, nullable=False)
    tot_tweets_count = Column('tot_tweets_count', Integer, nullable=False)
    description = Column('description', Text, nullable=False)
    name = Column('name', String(32), ForeignKey('political_groups.name', ondelete='CASCADE'), nullable=False)
    last_update = Column('last_update', Date, nullable=False)

    def __init__(self, handle: str):
        self.handle = handle