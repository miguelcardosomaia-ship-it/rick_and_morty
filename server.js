const express = require('express');
const https = require('https');
const path = require('path');
const app = express();
const URL_API = 'https://rickandmortyapi.com/api/character';

app.use(express.static(path.join(__dirname)));

function buscarPersonagens(callback) {
    https.get(URL_API, (resposta) => {
        let dados = '';

        resposta.on('data', (parte) => {
            dados += parte;
        });

        resposta.on('end', () => {
            const json = JSON.parse(dados);
            callback(json.results);
        });
    }).on('error', (erro) => {
        console.error('Erro ao buscar API:', erro);
        callback([]);
    });
}

app.get('/personagens', (req, res) => {
    buscarPersonagens((personagens) => {
        res.json(personagens);
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
