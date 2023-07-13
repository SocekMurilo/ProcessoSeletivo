const express = require('express');
const router = express.Router();
const home = require('./src/controllers/home');
const login = require('./src/controllers/login');
const processo = require('./src/controllers/processos')
const participante = require('./src/controllers/partipante');
const participantes = require('./src/controllers/participantes');
const novoProcesso = require('./src/controllers/novoProcesso');
const grupo = require('./src/controllers/grupos');
const cadastro = require('./src/controllers/cadastrar')


router.get('/', home.pagInicialGet);
router.get('/Login', login.pagLoginGet);
router.get('/Logout', login.pagLogoutGet);
router.get('/Processo', processo.pagProcessosGet);
router.get('/Participante/:IDParticipante', participante.pagParticipanteGet);
router.get('/Participantes', participantes.pagParticipantesGet)
router.get('/Grupos', grupo.pagGruposGet);

router.post('/', login.pagLoginPost);
router.post('/Novo Processo', novoProcesso);

router.post('/Cadastrar', cadastro.pagCadastroPost)

module.exports = router;
