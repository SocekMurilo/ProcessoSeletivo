const express = require('express');
const router = express.Router();

// Importando os Controllers
const home = require('./src/controllers/home');
const novoProcesso = require('./src/controllers/novoProcesso');
const editarProcesso = require('./src/controllers/editarProcesso');
const atualizarProcesso = require('./src/controllers/atualizarProcesso');
const grupos = require('./src/controllers/grupos');
const participante = require('./src/controllers/participante');
const participantes = require('./src/controllers/participantes');
const processo = require('./src/controllers/processo');
const processos = require('./src/controllers/processos');
const login = require('./src/controllers/login');
const cadastrar = require('./src/controllers/cadastrar');
const atualizarStatus = require('./src/controllers/atualizarStatusParticipante');



// Iniciando as rotas
router.get('/', home.pagInicialGet);

router.get('/favicon.ico', (req, res) => res.status(204));
router.get('/Login', login.pagLoginGet);
router.get('/Logout', login.pagLogoutGet);
router.get ('/Grupos', grupos.pagGruposGet);
router.get ('/Processos', processos.pagProcessosGet);
router.get ('/Participantes', participantes.pagParticipantesGet);
router.get ('/participante/:IDParticipante', participante.pagParticipanteGet);
router.get ('/:IDProcesso', processo.pagProcessoGet);

// router.get('/processos', home.processosGet);
// router.get('/participantes', home.participantesGet);
// router.get('/participante/:IDParticipante', home.participanteGet);
// router.get('/grupos', home.gruposGet);
// router.get('/:IDProcesso', home.processoGet);

router.post('/', login.pagLoginPost);
router.post('/ajax', home.indiceIDEtapa);
router.post('/novoProcesso', novoProcesso);
router.post('/editarProcesso/:IDProcesso', editarProcesso);
router.post('/atualizarProcesso/:IDProcesso', atualizarProcesso);
router.post('/atualizarStatusParticipante', atualizarStatus.atualizarStatusParticipante);


router.post('/Cadastrar', cadastrar.pagCadastroPost)





module.exports = router;