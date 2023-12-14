import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Obtém o caminho do diretório atual para corretamente lidar com os caminhos relativos
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuração para servir arquivos estáticos na pasta 'public'
app.use(express.static(join(__dirname, 'public')));

// Configuração para lidar com requisições para o arquivo 'register.html'
app.post('/register.html', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'register.html'));
});

app.post('/login.html', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'login.html'));
});

// Configuração para lidar com requisições para outros arquivos (por exemplo, JavaScript)
app.get('/js/*', (req, res) => {
    res.sendFile(join(__dirname, 'public', req.url));
});

// Configuração para lidar com requisições para a raiz ou outras páginas
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
