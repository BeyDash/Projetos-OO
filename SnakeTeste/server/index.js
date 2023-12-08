import Register from "./models/register.js"
import express from 'express'
import cors from 'cors'
import { Score } from "./models/score.js"
import { Login } from "./models/login.js"

const app = express()
app.use(express.json())
app.use(cors())

app.post('/register', (req, res) => {
    const { username, password } = req.body

    const register = new Register()

    try {
        register.register(username, password)
        return res.status(200).send("Succesfully registered")
    } catch (error) {
        // TODO: CHeck if it should be 400
        return res.status(400).send(error.message)

        // TODO: Receber esse erro no front e trata-lo redirecionanado para
        // para pag de cadastro e chamando a rota de novo
    }
})

app.put('/update-score', (req, res) => {
    const { username, score } = req.body

    const newScore = new Score(score)
    
    try {
        newScore.updateScore(username)
        const answer = {
            message: 'Sucessfully updated',
            user : {
                username,
                score
            }
        }
        return res.status(200).send(JSON.stringify(answer))
    } catch (error) {
        // TODO: CHECK IF IT SHOULD BE 400
        return res.status(400).send(error.message)
    }
})

app.post('/login', (req, res) => {
    const { username, password } = req.body

    try {
        new Login(username, password)
        return res.status(200).send(JSON.stringify({
            message: "User successfully logged in"
        }))
    } catch (error) {
        // TODO: CHECK IF IT SHOULD BE 400
        return res.status(404).send({
            message: error.message
        })
    }
})



app.listen(2001, () => {
    console.log(" listening on port 2001 ");
})
