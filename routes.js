const express = require('express');
const router = express.Router();
const XLSX = require('xlsx');
const Participante = require('./src/model/participante');

router.get('/importar-excel', (req, res) => {
  res.render('index');
});

router.post('/importar-excel', (req, res) => {
  const arquivo = req.files.arquivo;
  const workbook = XLSX.read(arquivo.data, { type: 'buffer' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const dados = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  dados.forEach((linha) => {
    const [nome, email, telefone] = linha;
    Participante.create({ nome, email, telefone });
  });

  res.send('Importação concluída com sucesso!');
});

// Importando os Controllers
const home = require('./src/controllers/home');

// Iniciando as rotas
router.get('/', home.pagInicialGet);

module.exports = router;
