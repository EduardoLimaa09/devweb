const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

let pessoas = [
    { id: 1, nome: 'Maria Fifi' },
    { id: 2, nome: 'Cleitão' },
    { id: 3, nome: 'Sergin' }
];

app.get('/pessoa', (req, res) => {
    res.json(pessoas);
});

app.get('/pessoa/:id', (req, res) => {
    const { id } = req.params;
    const pessoa = pessoas.find(p => p.id == id);
    if (pessoa) {
        res.json(pessoa);
    } else {
        res.status(404).json({ error: 'Pessoa não encontrada' });
    }
});

app.post('/pessoa', (req, res) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ error: 'Nome é obrigatório' });
    }

    const newId = pessoas.length ? Math.max(...pessoas.map(p => p.id)) + 1 : 1;
    const novaPessoa = { id: newId, nome };
    pessoas.push(novaPessoa);
    res.status(201).json(novaPessoa);
});

app.put('/pessoa/:id', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ error: 'Nome é obrigatório para atualização' });
    }

    const pessoa = pessoas.find(p => p.id == id);

    if (pessoa) {
        pessoa.nome = nome;
        res.json(pessoa);
    } else {
        res.status(404).json({ error: 'Pessoa não encontrada' });
    }
});

app.delete('/pessoa/:id', (req, res) => {
    const { id } = req.params;
    const index = pessoas.findIndex(p => p.id == id);

    if (index !== -1) {
        const [pessoaExcluida] = pessoas.splice(index, 1);
        res.json({ message: 'Pessoa excluída', pessoa: pessoaExcluida });
    } else {
        res.status(404).json({ error: 'Pessoa não encontrada' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
