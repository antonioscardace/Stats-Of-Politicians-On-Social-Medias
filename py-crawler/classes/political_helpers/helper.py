from abc import ABC, abstractmethod
from sqlalchemy import insert

from ..databases.base import Database
from ..databases.political_groups import PoliticalGroups

# Defines the abstract Helper class.
# Author: Antonio Scardace

class Helper(ABC):

    def _upsert_group_info(self, group, date):
        stmt = insert(PoliticalGroups).values(
            name=group.name,
            country=group.country,
            logo_color=group.color,
            last_update=date.strftime('%Y-%m-%d')
        )
        Database.dml_query(stmt.on_conflict_do_update(
            country=group.country,
            logo_color=group.color,
            last_update=date.strftime('%Y-%m-%d')
        ))

    @abstractmethod
    def insert_accounts(self, accounts, date):
        raise NotImplementedError("Method must be implemented.")

    @abstractmethod
    def insert_group(self, group, date):
        raise NotImplementedError("Method must be implemented.")
    