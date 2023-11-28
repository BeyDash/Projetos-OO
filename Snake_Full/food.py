import random
import pygame

class Food:
    def __init__(self, size, width, height):
        self.size = size
        self.width = width
        self.height = height
        self.x = random.randint(0, (width - size) // size) * size
        self.y = random.randint(0, (height - size) // size) * size

    def draw(self, screen, color):
        pygame.draw.rect(screen, color, [self.x, self.y, self.size, self.size])

    def generate_new_position(self):
        self.x = random.randint(0, (self.width - self.size) // self.size) * self.size
        self.y = random.randint(0, (self.height - self.size) // self.size) * self.size
