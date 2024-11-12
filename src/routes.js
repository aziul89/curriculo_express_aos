const express = require('express');
const pool = require('./database');

const router = express.Router();

router.get('/pessoa', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pessoa');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar pessoas' });
    }
});

router.post('/pessoa', async (req, res) => {
    const { nome, email, telefone, endereco } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO pessoa (nome, email, telefone, endereco) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, email, telefone, endereco]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar pessoa' });
    }
});

router.get('/formacao', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM formacao');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar formacoes' });
    }
});

router.post('/formacao', async (req, res) => {
    const { pessoa_id, instituicao, curso, data_inicio, data_fim } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO formacao (pessoa_id, instituicao, curso, data_inicio, data_fim) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [pessoa_id, instituicao, curso, data_inicio, data_fim]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar formacao' });
    }
});

router.get('/experiencia', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM experiencia');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar experiencias' });
    }
});

router.post('/experiencia', async (req, res) => {
    const { pessoa_id, empresa, cargo, data_inicio, data_fim, descricao } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO experiencia (pessoa_id, empresa, cargo, data_inicio, data_fim, descricao) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [pessoa_id, empresa, cargo, data_inicio, data_fim, descricao]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar experiencia' });
    }
});

module.exports = router;
