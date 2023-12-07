import Database from "./database.js";

export default class Register {

    constructor(username, password) {
        this.users = []
        // this.isLoggedIn = false
        this.username = username
        this.password = password

        this.register()
    }

    register() {
        // instantiate database
        const db = new Database('./database/users.json')

        // Check if the username already exists
        // const existingUser = this.users.find(user => user.username === username);
        // if (existingUser) {
        //     console.log('Username already exists. Please choose a different one.');

        //     // Use a recursive aproach
        //     this.register();
        // }

        // Add the new user to the list
        const newUser = { 
            username: this.username, 
            password: this.password 
        }

        this.users.push(newUser);

        // Save the updated user list to a JSON file
        db.saveToJson(this.users)
        console.log('Registration successful! You can now log in.');
    }

}