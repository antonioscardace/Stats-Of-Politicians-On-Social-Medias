from sqlalchemy import Column
from sqlalchemy import String, Integer, DECIMAL, ForeignKey

from .base import Base

# twitter_dailystats_groups table.
# Author: Antonio Scardace

class TwitterDailyStatsGroups(Base):

    __tablename__ = 'twitter_dailystats_groups'

    name = Column('name', String(255), ForeignKey('political_groups.name', ondelete='CASCADE'), nullable=False, primary_key=True)
    date = Column('date', String(64), nullable=False, primary_key=True)
    followers_count = Column('followers_count', Integer, nullable=False)
    fetched_tweets_count = Column('fetched_tweets_count', Integer, nullable=False)
    num_analyzed_accounts = Column('num_analyzed_accounts', Integer, nullable=False)
    tot_likes = Column('tot_likes', Integer, nullable=False)
    tot_retweets = Column('tot_retweets', Integer, nullable=False)
    tot_replies = Column('tot_replies', Integer, nullable=False)
    tot_tweets_count = Column('tot_tweets_count', Integer, nullable=False)
    avg_len = Column('avg_len', DECIMAL(10, 2), nullable=False)
    avg_likes = Column('avg_likes', DECIMAL(10, 2), nullable=False)
    avg_retweets = Column('avg_retweets', DECIMAL(10, 2), nullable=False)
    avg_replies = Column('avg_replies', DECIMAL(10, 2), nullable=False)
    avg_sentiment = Column('avg_sentiment', String, nullable=False)

    def __init__(self, name: str, date):
        self.name = name
        self.date = date