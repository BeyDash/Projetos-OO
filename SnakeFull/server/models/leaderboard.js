import Database from "./database.js";

export default class LeaderBoard {
    constructor(){
        this.db = new Database('./database/leaderboard.json')
        this.currentUsers = this.db.list()
    }

    register(username, score) {
        const userNameExists = this.checkIfUserNameExists(username)
        const newScore = { username, score }

        if(userNameExists >= 0){
            // Add the new user to the list
            this.currentUsers[userNameExists] = newScore
        }else {
            this.currentUsers.push(newScore);
        }

        // Save the updated user list to a JSON file
        this.db.saveToJson(this.currentUsers)
    }

    list(){
        return this.currentUsers
    }

    checkIfUserNameExists(username){
        return this.currentUsers?.findIndex(user => user.username == username)
    }

}