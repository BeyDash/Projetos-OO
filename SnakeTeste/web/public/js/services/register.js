export async function register(username, password) {
    try {
        await window.axios.post('http://localhost:2001/register', {
            username,
            password
        })
        alert("Cadastro realizado com sucesso")
        window.location = '/index.html'
    } catch (error) {
        alert("Ops! Parece que esse username já está sendo usado, tente outro");
    }
}