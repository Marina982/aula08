const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

let jogos = [];

app.post('/jogos', (req, res) => {
    const { nome, email, idade, cpf, endereco, pais, idioma } = req.body;
    
    if (!nome || !email) {
        return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
    }

    const novoJogo = { id: jogos.length + 1, nome, email, idade, cpf, endereco, pais, idioma };
    jogos.push(novoJogo);
    
    res.status(201).json(novoJogo);
});

app.get('/jogos', (req, res) => {
    res.status(200).json(jogos);
});

app.get('/jogos/:id', (req, res) => {
    const { id } = req.params;
    const jogo = jogos.find(u => u.id === parseInt(id));
    
    if (!jogo) {
        return res.status(404).json({ erro: 'Jogo não encontrado' });
    }
    
    res.status(200).json(jogo);
});

app.put('/jogos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email, idade, cpf, endereco, pais, idioma } = req.body;
    
    const jogo = jogos.find(u => u.id === parseInt(id));
    
    if (!jogo) {
        return res.status(404).json({ erro: 'Jogo não encontrado' });
    }
    
    jogo.nome = nome || jogo.nome;
    jogo.email = email || jogo.email;
    jogo.idade = idade || jogo.idade;
    jogo.cpf = cpf || jogo.cpf;
    jogo.endereco = endereco || jogo.endereco;
    jogo.pais = pais || jogo.pais;
    jogo.idioma = idioma || jogo.idioma;
    
    res.status(200).json(jogo);
});

app.delete('/jogos/:id', (req, res) => {
    const { id } = req.params;
    const index = jogos.findIndex(u => u.id === parseInt(id));
    
    if (index === -1) {
        return res.status(404).json({ erro: 'Jogo não encontrado' });
    }
    
    jogos.splice(index, 1);
    res.status(204).send();
});

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
