from .twitter import TwitterHelper

# Using Design Pattern Factory Method, this is the ConcreteCreator for Helpers.
# Author: Antonio Scardace

class HelperCreator:

    @staticmethod
    def get_helper(social):
        if not social or not social.strip(): return None

        if social == 'twitter': return TwitterHelper()
        raise ValueError('Social Media not supported.')