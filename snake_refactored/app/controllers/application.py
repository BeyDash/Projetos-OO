from app.controllers.user_account import DataRecord
from bottle import redirect, template



class Application():

    def __init__(self):

        self.pages = {
        'index': self.index,
        'login': self.login,
        'cadastro': self.cadastro,
        'area_membros': self.area_membros
        }

        self.__model = DataRecord()


    def render(self,page,obj=None):

        content = self.pages.get(page, self.index)
        return content(obj)


    def index(self,obj):

        self.__model.logout()
        return template('app/views/html/index',ctl=obj)


    def area_membros(self,obj):

        username = self.__model.getUserName()
        return template('app/views/html/area_membros',nome=username)


    def cadastro(self,obj):

        if self.__model.logon():
            username= self.__model.getUserName()
            return template('app/views/html/cadastro', \
            success=True, name=username)
        else:
            return template('app/views/html/cadastro', \
            success=False)


    def login(self,obj):

        return template('app/views/html/login')


    def is_authenticated(self):

        return self.__model.logon()


    def authenticate_user(self,username,password):

        if self.__model.checkUser(username, password):
            redirect(f'/user/{username}')
        redirect('/login')
