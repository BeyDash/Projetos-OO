import Database from "./database.js"

export class Score {
    constructor(score) {
        this.db = new Database('./database/users.json')
        this.score = score
    }

    shouldUpdateScore() {
        const user = this.db.list(username)
        if (!user.score || user.score < this.score) {
            return true
        }
        return false
    }

    updateScore(username) {
        if (this.shouldUpdateScore) {
            const updates = {
                score: this.score
            }

            this.db.update(username, updates)
            return this.db.list(username)
        }
    }
}