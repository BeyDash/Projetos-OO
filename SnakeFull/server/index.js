import Register from "./models/register.js"
import express from 'express'
import cors from 'cors'
import { Score } from "./models/score.js"
import { Login } from "./models/login.js"
import LeaderBoard from "./models/leaderboard.js"

const app = express()
app.use(express.json())
app.use(cors())

app.post('/register', (req, res) => {
    const { username, password } = req.body

    const register = new Register('./database/users.json')

    try {
        register.register(username, password)
        return res.status(200).send("Succesfully registered")
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

app.put('/update-score', (req, res) => {
    const { username, score } = req.body

    const newScore = new Score(score)

    try {
        newScore.updateScore(username)
        const answer = {
            message: 'Sucessfully updated',
            user: {
                username,
                score
            }
        }
        return res.status(200).send(JSON.stringify(answer))
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message)
    }
})

app.post('/leaderboard', (req, res) => {
    const { username, score } = req.body

    try {
        new LeaderBoard().register(username, score)
        return res.status(200).send(JSON.stringify({
            "message": "saved to leaderboard"
        }))
    } catch (error) {
        console.log(error);
        return res.status(500).send(JSON.stringify({
            "message": "error on saving to leaderboard"
        }))
    }
})

app.get('/leaderboard', (req, res) => {
    const list = new LeaderBoard().list()

    return res.status(200).send(JSON.stringify(list))
})

app.post('/login', (req, res) => {
    const { username, password } = req.body

    try {
        new Login(username, password)
        return res.status(200).send(JSON.stringify({
            message: "User successfully logged in"
        }))
    } catch (error) {
        return res.status(404).send({
            message: error.message
        })
    }
})

app.listen(2001, () => {
    console.log(" listening on port 2001 ");
})
