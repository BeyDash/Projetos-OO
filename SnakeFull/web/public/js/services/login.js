export async function login(username, password) {
    try {
        await window.axios.post('http://localhost:2001/login', {
            username, password
        })

        localStorage.setItem('userData', username)

        alert('Login realizado com sucesso')
        window.location = '/'
    } catch (error) {
        alert("Ops, ou sua senha ou o seu usuário estão incorretos")
    }
}
