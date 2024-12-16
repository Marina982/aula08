const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

let jogos = [];

app.post('/jogos', (req, res) => {
    const { nome, email } = req.body;
    
    if (!nome || !email) {
        return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
    }

    const novoJogo = { id: jogos.length + 1, nome, email };
    jogos.push(novoJogo);
    
    res.status(201).json(novoUsuario);
});

app.get('/jogos', (req, res) => {
    res.status(200).json(jogos);
});

app.get('/jogos/:id', (req, res) => {
    const { id } = req.params;
    const jogo = jogos.find(u => u.id === parseInt(id));
    
    if (!jogos) {
        return res.status(404).json({ erro: 'Jogo não encontrado' });
    }
    
    res.status(200).json(usuario);
});

app.put('/jogos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;
    
    const jogo = jogo.find(u => u.id === parseInt(id));
    
    if (!jogo) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    
    jogo.nome = nome || jogo.nome;
    jogo.email = email || jogo.email;
    
    res.status(200).json(jogo);
});

app.delete('/jogos/:id', (req, res) => {
    const { id } = req.params;
    const index = jogos.findIndex(u => u.id === parseInt(id));
    
    if (index === -1) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    
    jogos.splice(index, 1);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
