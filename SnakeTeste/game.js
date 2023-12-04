class SnakeGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.gridSize = 20;
        this.snake = [{ x: 5, y: 5 }];
        this.food = this.generateFood();
        this.score = 0;
        this.direction = "right";
    }

    generateFood() {
        const x = Math.floor(Math.random() * (this.canvas.width / this.gridSize));
        const y = Math.floor(Math.random() * (this.canvas.height / this.gridSize));
        return { x, y };
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawSnake();
        this.drawFood();
        this.drawScore();
    }

    drawSnake() {
        this.ctx.fillStyle = "#00F";
        this.snake.forEach(segment => {
            this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize, this.gridSize);
        });
    }

    drawFood() {
        this.ctx.fillStyle = "#F00";
        this.ctx.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize, this.gridSize);
    }

    drawScore() {
        this.ctx.fillStyle = "#FFF";
        this.ctx.font = "20px Arial";
        this.ctx.fillText(`Score: ${this.score}`, 10, 30);
    }

    move() {
        const head = { ...this.snake[0] };

        switch (this.direction) {
            case "up":
                head.y -= 1;
                break;
            case "down":
                head.y += 1;
                break;
            case "left":
                head.x -= 1;
                break;
            case "right":
                head.x += 1;
                break;
        }

        this.snake.unshift(head);

        if (head.x === this.food.x && head.y === this.food.y) {
            this.score++;
            this.food = this.generateFood();
        } else {
            this.snake.pop();
        }
    }

    checkCollision() {
        const head = this.snake[0];

        if (head.x < 0 || head.x >= this.canvas.width / this.gridSize ||
            head.y < 0 || head.y >= this.canvas.height / this.gridSize) {
            this.endGame();
        }

        for (let i = 1; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                this.endGame();
            }
        }
    }

    endGame() {
        const playerName = prompt("Game Over! Enter your name for the leaderboard:");

        if (playerName !== null) {
            const scoreData = { name: playerName, score: this.score };
            this.addToLeaderboard(scoreData);
            this.updateLeaderboardUI();
        }

        document.getElementById("gameOverMessage").textContent = `Game Over! Your score: ${this.score}`;
        document.getElementById("gameOverMessage").style.display = "block";
        this.resetGame();
    }

    resetGame() {
        this.snake = [{ x: 5, y: 5 }];
        this.food = this.generateFood();
        this.score = 0;
        this.direction = "right";
        document.getElementById("playMenu").style.display = "block";
        document.getElementById("gameOverMessage").style.display = "none";
        snakeCanvas.style.display = "none";
        this.nameInputDisplayed = false; // Reinicia o controle para exibir o nome
    }

    addToLeaderboard(scoreData) {
        let leaderboardData = localStorage.getItem("leaderboardData");
        leaderboardData = leaderboardData ? JSON.parse(leaderboardData) : [];

        leaderboardData.push(scoreData);
        leaderboardData.sort((a, b) => b.score - a.score);

        localStorage.setItem("leaderboardData", JSON.stringify(leaderboardData));
    }

    updateLeaderboardUI() {

        const leaderboardList = document.getElementById("leaderboardList");
        leaderboardList.innerHTML = "";
      
        const leaderboardData = JSON.parse(localStorage.getItem("leaderboardData")) || [];
        
        // Only show top 10 scores
        const top10 = leaderboardData.slice(0, 10);
      
        top10.forEach(score => {
          const li = document.createElement("li");
          li.textContent = `${score.name} - ${score.score}`;
      
          leaderboardList.appendChild(li);
        });
      
      }
      
    
    showLeaderboard() {
        playMenu.style.display = "none";
        leaderboard.style.display = "block";
        leaderboardList.style.display = "block";
        this.updateLeaderboardUI();
    }

    hideLeaderboard() {
        leaderboard.style.display = "none";
        playMenu.style.display = "block";
    }
}


const canvas = document.getElementById("snakeCanvas");
const playMenu = document.getElementById("playMenu");
const leaderboard = document.getElementById("leaderboard");
const leaderboardList = document.getElementById("leaderboardList");
const game = new SnakeGame(canvas);

function startGame() {
    leaderboard.style.display = "none";
    leaderboardList.style.display = "none";
    playMenu.style.display = "none";
    snakeCanvas.style.display = "block";
    document.addEventListener("keydown", handleKeyPress);
    gameLoop();
}

function toggleLeaderboard() {
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
