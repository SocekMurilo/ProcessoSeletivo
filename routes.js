const express = require('express');
const router = express.Router();
const home = require('./src/controllers/home');
const login = require('./src/controllers/login');
const cadastro = require('./src/controllers/cadastrar');
const processo = require('./src/controllers/processo')
const processos = require('./src/controllers/processos');
const novoProcesso = require('./src/controllers/novoProcesso');
const participante = require('./src/controllers/partipante');
const participantes = require('./src/controllers/participantes');
const grupo = require('./src/controllers/grupos');
const editarProcesso = require('./src/controllers/editarProcesso');



router.get('/', home.pagInicialGet);
router.get('/Login', login.pagLoginGet);
router.get('/Logout', login.pagLogoutGet);
router.get('/:IDProcesso', processo.pagProcessoGet);
router.get('/Processos', processos.pagProcessosGet)
router.get('/Participante/:IDParticipante', participante.pagParticipanteGet);
router.get('/Participantes', participantes.pagParticipantesGet)
router.get('/Grupos', grupo.pagGruposGet);

router.post('/', login.pagLoginPost);
router.post('/NovoProcesso', novoProcesso);
router.post('/editarProcesso/:IDProcesso', editarProcesso);

router.post('/Cadastrar', cadastro.pagCadastroPost)

module.exports = router;
