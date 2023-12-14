import Database from "./database.js";

export class Login {
    constructor(username, password) {
        // verificar se user existe na database, se sim, retorna o username
        this.db = new Database('./database/users.json')

        const userExists = this.db.list(username)

        if(userExists?.password != password){
            throw new Error("Either your password or username are incorrect")
        }

        return username
    }
}