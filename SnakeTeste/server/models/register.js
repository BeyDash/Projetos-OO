import Database from "./database.js";

export default class Register {
    constructor(filePath){
        this.db = new Database(filePath)
        this.currentUsers = this.db.list()
    }

    register(username, password) {
        const userNameExists = this.checkIfUserNameExists(username)

        if(userNameExists){
            throw new Error("Username is already taken")
        }

        // Add the new user to the list
        const newUser = { username, password }

        this.currentUsers.push(newUser);

        // Save the updated user list to a JSON file
        this.db.saveToJson(this.currentUsers)
    }

    checkIfUserNameExists(username){
        return this.currentUsers.find(user => user.username === username)
    }
}