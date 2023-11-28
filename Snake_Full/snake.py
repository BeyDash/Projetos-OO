import pygame

class Snake:
    def __init__(self, x, y, size):
        self.x = x
        self.y = y
        self.size = size
        self.dx = 0
        self.dy = 0
        self.length = 1
        self.body = [(self.x, self.y)]

    def set_direction(self, dx, dy):
        self.dx = dx
        self.dy = dy

    def move(self):
        self.x += self.dx
        self.y += self.dy
        self.body.append((self.x, self.y))
        if len(self.body) > self.length:
            del self.body[0]

    def draw(self, screen, color):
        for segment in self.body:
            pygame.draw.rect(screen, color, [segment[0], segment[1], self.size, self.size])

    def collides_with(self, other):
        return self.x == other.x and self.y == other.y

    def collides_with_wall(self, width, height):
        return (
            self.x >= width or self.x < 0 or self.y >= height or self.y < 0
        )

    def collides_with_itself(self):
        return (self.x, self.y) in self.body[:-1]

    def grow(self):
        self.length += 1
