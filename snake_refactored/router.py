from app.controllers.application import Application
from bottle import Bottle, route, run, request, redirect, template, static_file



app = Bottle()
ctl = Application()



#-----------------------------------------------------------------------------
# Rotas:


# Arquivos estáticos:
@app.route('/static/<filepath:path>')
def serve_static(filepath):
    return static_file(filepath, root='./app/static')


# Boas Vindas ao usuário
@app.route('/') # sempre que acessar home o logout é automaticamente realizado
@app.route('/user/<unknown>')
def index(unknown=None):
    if not unknown:
        return ctl.render('index',obj=ctl)
    else:
        if ctl.is_authenticated():
            return ctl.render('area_membros')
        else:
            redirect('/login')


@app.route('/cadastro')
def cadastro():
    return ctl.render('cadastro')


@app.route('/login', method='GET')
def login():
    return ctl.render('login')


@app.route('/login', method='POST')
def action_login():
    username = request.forms.get('username')
    password = request.forms.get('password')
    ctl.authenticate_user(username, password)

#-----------------------------------------------------------------------------


if __name__ == '__main__':

    run(app, host='localhost', port=8080, debug=True)
