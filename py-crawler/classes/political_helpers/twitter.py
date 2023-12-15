from sqlalchemy import insert

from .helper import Helper

from ..databases.base import Database
from ..databases.twitter_accounts import TwitterAccounts
from ..databases.twitter_dailystats_accounts import TwitterDailyStatsAccounts
from ..databases.twitter_dailystats_groups import TwitterDailyStatsGroups
from ..databases.twitter_hashtags_accounts import TwitterHashtagsAccounts

# Defines the TwitterHelper class, which implements the general Helper class.
# Stats calculated previously by each Political Twitter Account and Group, can now be stored.
# Author: Antonio Scardace

class TwitterHelper(Helper):

    def __insert_account_used_hashtag(self, account, date, hashtag):
        Database.dml_query(insert(TwitterHashtagsAccounts).values(
            date=date.strftime('%Y-%m-%d'),
            handle=account.username,
            hashtag=hashtag.lower()
        ))

    def __insert_daily_account_insights(self, account, date):
        Database.dml_query(insert(TwitterDailyStatsAccounts).values(
            handle=account.username,
            date=date.strftime('%Y-%m-%d'),
            fetched_tweets_count=account.get_fetched_tweets_today(),
            followers_count=account.followers_count,
            avg_len=account.get_avg_tweet_len(),
            avg_likes=account.get_avg_metric_per_tweet('like_count'),
            avg_replies=account.get_avg_metric_per_tweet('reply_count'),
            avg_retweets=account.get_avg_metric_per_tweet('retweet_count'),
            avg_sentiment=account.avg_sentiment,
            tot_likes=account.get_sum_metric('like_count'),
            tot_retweets=account.get_sum_metric('retweet_count'),
            tot_replies=account.get_sum_metric('reply_count')
        ))

    def __insert_daily_group_insights(self, group, date):
        Database.dml_query(insert(TwitterDailyStatsGroups).values(
            name=group.name,
            date=date.strftime('%Y-%m-%d'),
            fetched_tweets_count=group.get_total_fetched_tweet_count(),
            followers_count=group.get_total_followers_count(),
            num_analyzed_accounts=group.get_num_of_analyzed_accounts(),
            avg_len=group.get_avg_tweet_len(),
            avg_likes=group.get_avg_metric_of_tweets('like_count'),
            avg_replies=group.get_avg_metric_of_tweets('reply_count'),
            avg_retweets=group.get_avg_metric_of_tweets('retweet_count'),
            avg_sentiment=group.get_most_freq_sentiment(),
            tot_likes=group.get_sum_metric('like_count'),
            tot_retweets=group.get_sum_metric('retweet_count'),
            tot_replies=group.get_sum_metric('reply_count'),
            tot_tweets_count=group.get_total_tweet_count()
        ))
            
    def __upsert_account_info(self, account, date):
        stmt = insert(TwitterAccounts).values(
            id=account.id,
            handle=account.username,
            name=account.name,
            description=account.descr,
            created_on=account.created_on,
            followers_count=account.followers_count,
            following_count=account.following_count,
            political_group=account.group,
            profile_image_url=account.profile_img_url,
            tot_tweets_count=account.tweet_count,
            verified=account.verified,
            last_update=date.strftime('%Y-%m-%d')
        )
        Database.dml_query(stmt.on_conflict_do_update(
            followers_count=account.followers_count,
            following_count=account.following_count,
            political_group=account.group,
            profile_image_url=account.profile_img_url,
            tot_tweets_count=account.tweet_count,
            last_update=date.strftime('%Y-%m-%d')
        ))

    def insert_accounts(self, accounts, date):
        for account in accounts:
            self.__upsert_account_info(account, date)
            self.__insert_daily_account_insights(account, date)
            
            for hashtag in account.hashtags:
                self.__insert_account_used_hashtag(account, date, hashtag)

    def insert_group(self, group, date):
        self._upsert_group_info(group, date)
        self.__insert_daily_group_insights(group, date)