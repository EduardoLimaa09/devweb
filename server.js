//Aluno: Carlos Eduardo e Jonatas Camilo 2a

const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

let publicacoes = [];

app.post('/publicacao', (req, res) => {
  const { id, titulo, conteudo } = req.body;

  if (!id || !titulo || !conteudo) {
    return res.status(400).json({ error: 'Os campos "id", "titulo" e "conteudo" são obrigatórios.' });
  }

  const publicacaoExistente = publicacoes.find(p => p.id === id);
  if (publicacaoExistente) {
    return res.status(400).json({ error: 'Publicação com este ID já existe.' });
  }

  const novaPublicacao = { id, titulo, conteudo };
  publicacoes.push(novaPublicacao);

  return res.status(201).json(novaPublicacao);
});

app.get('/publicacao/:id', (req, res) => {
  const { id } = req.params;

  const publicacao = publicacoes.find(p => p.id === id);

  if (!publicacao) {
    return res.status(404).json({ error: 'Publicação não encontrada.' });
  }

  return res.status(200).json(publicacao);
});
app.delete('/publicacao/:id', (req, res) => {
  const { id } = req.params;

  const index = publicacoes.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Publicação não encontrada.' });
  }

  publicacoes.splice(index, 1);

  return res.status(204).send();
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
