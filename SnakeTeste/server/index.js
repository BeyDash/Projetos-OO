import Register from "./models/register.js"
import express from 'express'

const app = express()
app.use(express.json())

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


app.listen(2001, () => {
    console.log(" listening on port 2001 ");
})
