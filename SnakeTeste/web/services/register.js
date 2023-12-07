export default async function register(username, password) {
    try {
        // Acesse o Axios diretamente do escopo global
        const response = await window.axios.post('http://localhost:2001/register', {
            username,
            password
        })
        console.log(response.data);
    } catch (error) {
        console.error(error.response.data);
    }
}