import requests
import os

from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

from datetime import datetime, timedelta

# It provides the main methods to fetch data from a Twitter profile.
# Data are some personal info and a set of tweets with their metrics.
# Author: Antonio Scardace

class TwitterApi:
    
    def __init__(self):
        self.__bearer_token = os.environ["TWITTER_BEARER"]

    def __normalize_handle(self, handle):
        return handle[1:] if handle[0] == '@' else handle

    def __fetch_data(self, url):
        headers = { 'Authorization': "Bearer " + self.__bearer_token }
        session = requests.Session()
        session.mount('https://', HTTPAdapter(max_retries=Retry(connect=3, backoff_factor=0.5)))
        return session.get(url, headers=headers).json()
    
    def get_user_info_by_handle(self, handle):
        handle = self.__normalize_handle(handle)
        return self.__fetch_data(f'https://api.twitter.com/2/users/by/username/{handle}?user.fields=verified,public_metrics,description,created_at,profile_image_url')['data']

    def get_user_tweets_within_dates(self, id, start_time, end_time):
        start_iso = start_time.isoformat() + 'Z'
        end_iso = end_time.isoformat() + 'Z'
        data = self.__fetch_data(f'https://api.twitter.com/2/users/{id}/tweets?max_results=100&start_time={start_iso}&end_time={end_iso}&tweet.fields=id,public_metrics,created_at')
        return data['data'] if data['meta']['result_count'] > 0 else []
    
    def get_user_tweets_within_seconds(self, id, secs):
        end = datetime.utcnow().replace(microsecond=0)
        start = end - timedelta(seconds=secs)
        return self.get_user_tweets_within_dates(id, start, end)
    
    def get_user_tweets_within_minutes(self, id, mins):
        end = datetime.utcnow().replace(microsecond=0)
        start = end - timedelta(minutes=mins)
        return self.get_user_tweets_within_dates(id, start, end)
    
    def get_user_tweets_within_hours(self, id, hours):
        end = datetime.utcnow().replace(microsecond=0)
        start = end - timedelta(hours=hours)
        return self.get_user_tweets_within_dates(id, start, end)

    def get_user_tweets_within_days(self, id, days):
        end = datetime.utcnow().replace(microsecond=0)
        start = end - timedelta(days=days)
        return self.get_user_tweets_within_dates(id, start, end)