import os
import logging

from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import create_engine

# Defines the base class to define a table.
# Author: Antonio Scardace

class Base(DeclarativeBase):
    pass

# Connect to the MySQL database.
# Author: Antonio Scardace

class Database:

    db_connstr = '{}:{}@{}:{}/{}'.format(
        os.environ['MYSQL_USER'],
        os.environ['MYSQL_PSW'],
        os.environ['MYSQL_HOST'],
        os.environ['MYSQL_PORT'],
        os.environ['MYSQL_DB']
    )
    engine = create_engine('mysql+mysqlconnector://' + db_connstr)

    @staticmethod
    def dml_query(stmt) -> bool:
        try:
            with Database.engine.connect() as eng:
                eng.execute(stmt)
                eng.commit()
            return True
        
        except Exception as e:
            logging.exception(e)
            return False