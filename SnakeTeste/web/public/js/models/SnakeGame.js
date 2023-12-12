export class SnakeGame {
    constructor(canvas) { // Construtor que recebe um elemento canvas como parâmetro
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.gridSize = 20;
        this.snake = [{ x: 5, y: 5 }];
        this.food = this.generateFood();
        this.score = 0;
        this.direction = "right";
    }

    generateFood() { // Método para gerar a posição inicial da comida
        const x = Math.floor(Math.random() * (this.canvas.width / this.gridSize));
        const y = Math.floor(Math.random() * (this.canvas.height / this.gridSize));
        return { x, y };
    }

    draw() {  // Método para desenhar os elementos no canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawSnake();
        this.drawFood();
        this.drawScore();
    }

    drawSnake() { // Método para desenhar a cobra no canvas
        this.ctx.fillStyle = "#00F";
        this.snake.forEach(segment => {
            this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize, this.gridSize);
        });
    }

    drawFood() { // Método para desenhar a comida no canvas
        this.ctx.fillStyle = "#F00";
        this.ctx.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize, this.gridSize);
    }

    drawScore() { // Método para desenhar a pontuação no canvas
        this.ctx.fillStyle = "#FFF";
        this.ctx.font = "20px Arial";
        this.ctx.fillText(`Score: ${this.score}`, 10, 30);
    }

    move() { // Método para mover a cobra
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

        if (head.x === this.food.x && head.y === this.food.y) { // Verificar se a cobra atingiu a comida
            this.score++;
            this.food = this.generateFood();
        } else {
            this.snake.pop();
        }
    }

    checkCollision() {  // Método para verificar colisões com as bordas do canvas e consigo mesma
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

    async endGame() { // Método assíncrono chamado quando o jogo termina
        let scoreData = { score: this.score };
        let username = localStorage?.getItem('userData')

        const leaderBoard = localStorage.getItem('leaderboardData')

        // populate leaderboard
        if (!leaderBoard) {
            const dbLeaderBoard = await this.populateLeaderBoard()
            localStorage.setItem('leaderboardData', JSON.stringify(dbLeaderBoard.data))
        }

        if (username) {
            scoreData.username = username
        } else {
            scoreData.username = prompt("Game Over! Escreva seu nome para o leaderboard:");
        }

        this.addToLeaderboard(scoreData);
        this.updateLeaderboardUI();
        alert("Adicionado ao leaderboard! Clique no botão para consulta-lo")

        document.getElementById("gameOverMessage").textContent = `Game Over! Your score: ${this.score}`;
        this.resetGame();
    }

    resetGame() { // Método para reiniciar o jogo
        this.snake = [{ x: 5, y: 5 }];
        this.food = this.generateFood();
        this.score = 0;
        this.direction = "right";
        document.getElementById("playMenu").style.display = "block";
        document.getElementById("gameOverMessage").style.display = "none";
        snakeCanvas.style.display = "none";
        this.nameInputDisplayed = false; // Reinicia o controle para exibir o nome
    }

    async addToLeaderboard(scoreData) { // Método para adicionar pontuação ao leaderboard
        let leaderboardData = localStorage.getItem("leaderboardData");
        leaderboardData = leaderboardData ? JSON.parse(leaderboardData) : [];

        const userInLeaderBoard = leaderboardData.findIndex(user => user.username === scoreData.username);

        if (userInLeaderBoard >= 0) {  // Método para determinar se a pontuação deve ser atualizada no leaderboard
            const score = leaderboardData[userInLeaderBoard].score
            const updateScore = this.shouldUpdateScore(score, scoreData.score)

            if (updateScore) {
                leaderboardData[userInLeaderBoard].score = scoreData.score

                await this.saveLeaderBoard(scoreData)
                await this.updateScore(scoreData)
            }
        } else {
            leaderboardData.push(scoreData);
            await this.saveLeaderBoard(scoreData)
        }

        leaderboardData.sort((a, b) => b.score - a.score);
        localStorage.setItem("leaderboardData", JSON.stringify(leaderboardData));
    }

    shouldUpdateScore(score, newScore) {
        if (newScore > score) {
            return true
        }

        return false
    }

    updateLeaderboardUI() { // Método para atualizar a UI do leaderboard

        const leaderboardList = document.getElementById("leaderboardList");
        leaderboardList.innerHTML = "";

        const leaderboardData = JSON.parse(localStorage.getItem("leaderboardData")) || [];

        // Only show top 10 scores
        const top10 = leaderboardData.slice(0, 10);

       // aqui
        top10.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `${user.username} - ${user.score}`;

            leaderboardList.appendChild(li);
        });

    }

    async saveLeaderBoard(scoreData) { // Método assíncrono para salvar pontuação no servidor
        try {
            await window.axios.post('http://localhost:2001/leaderboard', scoreData)
        } catch (error) {
            console.log("Impossivel salvar o leaderboard no banco");
        }

    }
 
    async updateScore(scoreData){ // Método assíncrono para atualizar pontuação no servidor
        try {
            await window.axios.put('http://localhost:2001/update-score', scoreData)
        } catch (error) {
            console.log("Impossivel fazer o update do score");
        }
    }

    async populateLeaderBoard(){  // Método assíncrono para popular o leaderboard a partir do servidor
        try {
            return await window.axios.get('http://localhost:2001/leaderboard')
        } catch (error) {
            console.log("Impossivel salvar o leaderboard no banco");
        }
    }

    showLeaderboard() {  // Método para exibir o leaderboard na UI
        playMenu.style.display = "none";
        leaderboard.style.display = "block";
        leaderboardList.style.display = "block";
        this.updateLeaderboardUI();
    }

    hideLeaderboard() {  // Método para ocultar o leaderboard na UI
        leaderboard.style.display = "none";
        playMenu.style.display = "block";
    }
}
