const express = require('express');
const router = express.Router();

// Importando os Controllers
const novoProcesso = require('./src/controllers/novoProcesso');
const editarProcesso = require('./src/controllers/editarProcesso');
const atualizarProcesso = require('./src/controllers/atualizarProcesso');

const home = require('./src/controllers/home');

// Iniciando as rotas
router.get('/', home.pagInicialGet);

router.get('/processos', home.processosGet);
router.get('/participantes', home.participantesGet);
router.get('/participante/:IDParticipante', home.participanteGet);
router.get('/grupos', home.gruposGet);
router.get('/:IDProcesso', home.processoGet);

router.post('/ajax', home.indiceIDEtapa);
router.post('/novoProcesso', novoProcesso);
router.post('/editarProcesso/:IDProcesso', editarProcesso);
router.post('/atualizarProcesso/:IDProcesso', atualizarProcesso);

module.exports = router;
