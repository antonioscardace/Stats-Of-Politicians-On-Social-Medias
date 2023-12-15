from abc import ABC, abstractmethod

# Defines the abstract Group class.
# Author: Antonio Scardace

class Group(ABC):

    @abstractmethod
    def __init__(self, accounts, color, country, name):
        raise NotImplementedError("Method must be implemented.")

    @abstractmethod
    def get_total_followers_count(self):
        raise NotImplementedError("Method must be implemented.")