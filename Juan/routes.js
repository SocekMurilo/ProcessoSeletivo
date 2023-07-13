const express = require('express');
const router = express.Router();

// Importando os Controllers
const novoProcesso = require('./src/controllers/novoProcesso');
const home = require('./src/controllers/home');

router.post('/novoProcesso', novoProcesso);

// Iniciando as rotas
router.get('/', home.pagInicialGet);

router.get('/processos', home.processosGet);
router.get('/participantes', home.participantesGet);
router.get('/participante/:IDParticipante', home.participanteGet);
router.get('/grupos', home.gruposGet);
router.get('/:IDProcesso', home.processoGet);

module.exports = router;
