from abc import ABC, abstractmethod

class Database(ABC):
    @abstractmethod
    def book(self):
        pass

    @abstractmethod
    def read(self):
        pass