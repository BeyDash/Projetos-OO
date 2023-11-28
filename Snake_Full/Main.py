import pygame
import sys
from snake import Snake
from food import Food
import json

class Game:
    def __init__(self):
        pygame.init()

        # Constantes
        self.WIDTH, self.HEIGHT = 1280, 720
        self.SNAKE_SIZE = 20
        self.SNAKE_SPEED = 15
        self.BLACK = (0, 0, 0)
        self.WHITE = (255, 255, 255)
        self.GREEN = (0, 255, 0)

        # Cria a tela
        self.screen = pygame.display.set_mode((self.WIDTH, self.HEIGHT))
        pygame.display.set_caption("Snake Game")

        # Fonte
        self.font = pygame.font.SysFont(None, 35)

        # Estado do jogo
        self.game_over = False
        self.score = 0
        self.snake = Snake(self.WIDTH // 2, self.HEIGHT // 2, self.SNAKE_SIZE)
        self.food = Food(self.SNAKE_SIZE, self.WIDTH, self.HEIGHT)

        # High Score
        self.high_score = self.load_high_score()

    def load_high_score(self):
        try:
            with open("highscore.json", "r") as file:
                data = json.load(file)
                return data["high_score"]
        except FileNotFoundError:
            return 0

    def save_high_score(self):
        if self.score > self.high_score:
            self.high_score = self.score
            high_score_data = {"high_score": self.high_score}
            with open("highscore.json", "w") as file:
                json.dump(high_score_data, file)

    def show_menu(self):
        menu = True
        while menu:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    self.quit_game()
                elif event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_s:
                        menu = False  # Start the game
                    elif event.key == pygame.K_q:
                        self.quit_game()

            self.screen.fill(self.BLACK)
            title_text = self.font.render("Snake", True, self.WHITE)
            start_text = self.font.render("Aperte S para começar", True, self.WHITE)
            quit_text = self.font.render("Aperte Q para sair", True, self.WHITE)

            # Obtém as dimensões da tela
            screen_width, screen_height = self.screen.get_size()

            # Obtém as dimensões do texto
            title_width, title_height = title_text.get_size()
            start_width, start_height = start_text.get_size()
            quit_width, quit_height = quit_text.get_size()

            # Calcula as posições centralizadas
            title_x = (screen_width - title_width) // 2
            title_y = screen_height // 4
            start_x = (screen_width - start_width) // 2
            start_y = screen_height // 2 - 50
            quit_x = (screen_width - quit_width) // 2
            quit_y = screen_height // 2 + 50

            # Desenha os textos na tela
            self.screen.blit(title_text, (title_x, title_y))
            self.screen.blit(start_text, (start_x, start_y))
            self.screen.blit(quit_text, (quit_x, quit_y))

            pygame.display.update()

    def quit_game(self):
        pygame.quit()
        sys.exit()

    def reset_game(self):
        self.game_over = False
        self.score = 0
        self.snake = Snake(self.WIDTH // 2, self.HEIGHT // 2, self.SNAKE_SIZE)
        self.food = Food(self.SNAKE_SIZE, self.WIDTH, self.HEIGHT)

    def render(self):
        self.screen.fill(self.BLACK)
        self.snake.draw(self.screen, self.GREEN)
        self.food.draw(self.screen, self.WHITE)

        # Mostra o highscore acima do score
        high_score_text = self.font.render("High Score: " + str(self.high_score), True, self.WHITE)
        self.screen.blit(high_score_text, (10, 10))

        # Mostra o score abaixo do highscore
        score_text = self.font.render("Score: " + str(self.score), True, self.WHITE)
        self.screen.blit(score_text, (10, 40))

        pygame.display.update()

    def run(self):
        self.show_menu()
        while True:  # Troque para um loop infinito
            while not self.game_over:
                for event in pygame.event.get():
                    if event.type == pygame.QUIT:
                        self.quit_game()
                    elif event.type == pygame.KEYDOWN:
                        if event.key == pygame.K_UP and self.snake.dy == 0:
                            self.snake.set_direction(0, -self.SNAKE_SIZE)
                        elif event.key == pygame.K_DOWN and self.snake.dy == 0:
                            self.snake.set_direction(0, self.SNAKE_SIZE)
                        elif event.key == pygame.K_LEFT and self.snake.dx == 0:
                            self.snake.set_direction(-self.SNAKE_SIZE, 0)
                        elif event.key == pygame.K_RIGHT and self.snake.dx == 0:
                            self.snake.set_direction(self.SNAKE_SIZE, 0)
                        elif event.key == pygame.K_r:
                            self.reset_game()

                self.snake.move()

                if self.snake.collides_with(self.food):
                    self.score += 10
                    self.food.generate_new_position()
                    self.snake.grow()

                if (
                    self.snake.collides_with_wall(self.WIDTH, self.HEIGHT)
                    or self.snake.collides_with_itself()
                ):
                    self.game_over = True

                self.render()

                pygame.time.Clock().tick(self.SNAKE_SPEED)

            self.save_high_score()

            # Agora, após a morte, exiba uma mensagem e aguarde o jogador pressionar 'r' para reiniciar
            self.screen.fill(self.BLACK)
            game_over_text = self.font.render("Game Over - Pressione 'R' para reiniciar", True, self.WHITE)
            self.screen.blit(game_over_text, ((self.WIDTH - game_over_text.get_width()) // 2, self.HEIGHT // 2))
            pygame.display.update()

            # Espere que o jogador pressione 'r' para reiniciar
            restart_pressed = False
            while not restart_pressed:
                for event in pygame.event.get():
                    if event.type == pygame.QUIT:
                        self.quit_game()
                    elif event.type == pygame.KEYDOWN:
                        if event.key == pygame.K_r:
                            restart_pressed = True
                            self.reset_game()

                pygame.time.Clock().tick(5)  # Adicione um pequeno atraso para economizar recursos

if __name__ == "__main__":
    game = Game()
    game.run()
