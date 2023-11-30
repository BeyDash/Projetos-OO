class UserAccount():

    def __init__(self, username, password):
        self.username= username
        self.password= password

    def who_r_u(self):
        print(f"Nome: {self.username}, Código: {self.password}")
