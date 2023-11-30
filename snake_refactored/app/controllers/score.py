from app.models.score import Score
from app.controllers.user_account import DataRecord

class Score(DataRecord):
    def __init__(self, username):
        self.Pontuacao = 0
        self.username = username

    def _increment(self):
        self.Pontuacao += 1

    # def book():
    #     pass

    def book(self, game_score):
        # save actual score in a json file created to store users data
        # that has this structure:[{"username": "Henrique", "password": "123456"}]
        # it should become something like:[{"username": "Henrique", "password": "123456", "score": 10}]
        # Procura por um usuário com o username desejado
        new_score= Score(game_score)

        for user in self.__user_accounts:
            if user.get('username') == self.username:
                # Adiciona a chave 'score' ao usuário encontrado
                user['score'] = new_score
                break  # Se o usuário foi encontrado, não precisa continuar procurando
        with open("app/controllers/db/user_accounts.json", "w") as arquivo_json:
            user_data = [vars(user_account) for user_account in \
            self.__user_accounts]
            json.dump(user_data, arquivo_json)
        


# Example usage:
# pontuacao = Pontuacao()
# pontuacao.incrementar()
# print("Pontuação:", pontuacao.Pontuacao)

# pontos_obtidos = pontuacao.obter_pontos('up')
# print("Pontos Obtidos:", pontos_obtidos)
