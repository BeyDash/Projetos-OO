import { SnakeGame } from "./models/SnakeGame.js";

const canvas = document.getElementById("snakeCanvas");
const playMenu = document.getElementById("playMenu");
const leaderboard = document.getElementById("leaderboard");
const leaderboardList = document.getElementById("leaderboardList");
const game = new SnakeGame(canvas);

export function startGame() {
    leaderboard.style.display = "none";
    leaderboardList.style.display = "none";
    playMenu.style.display = "none";
    snakeCanvas.style.display = "block";
    document.addEventListener("keydown", handleKeyPress);
    gameLoop();
}

export function toggleLeaderboard() {
    playMenu.style.display = playMenu.style.display === "none" ? "block" : "none";
    leaderboard.style.display = leaderboard.style.display === "none" ? "block" : "none";
    leaderboardList.style.display = leaderboard.style.display;
    if (leaderboard.style.display === "block") {
        game.updateLeaderboardUI();
    }
}

function handleKeyPress(event) {
    switch (event.key) {
        case "ArrowUp":
            game.direction = "up";
            break;
        case "ArrowDown":
            game.direction = "down";
            break;
        case "ArrowLeft":
            game.direction = "left";
            break;
        case "ArrowRight":
            game.direction = "right";
            break;
    }
}

function gameLoop() {
    game.move();
    game.checkCollision();
    game.draw();

    if (playMenu.style.display !== "none") {
        return;
    }

    setTimeout(gameLoop, 200);
}

export async function goToRegisterPage() {
    window.location.href = './register.html';
};

