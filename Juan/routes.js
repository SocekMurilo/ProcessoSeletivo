const express = require('express');
const router = express.Router();

// Importando os Controllers
const novoProcesso = require('./src/controllers/novoProcesso');
const editarProcesso = require('./src/controllers/editarProcesso');
const atualizarProcesso = require('./src/controllers/atualizarProcesso');
const Grupos = require('./src/model/grupos')

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


router.post('/salvar', async (req, res) => {
    try {
        const { grupoId, participantesIds } = req.body; // Dados enviados pelo frontend
        // Atualiza os IDs dos participantes nas etapas corretas no banco de dados
        const grupoAtualizado = await Grupos.update(
            { IDEtapa: participantesIds }, // Coluna a ser atualizada
            { where: { IDGrupo: grupoId } } // Condição para atualização (no caso, ID do grupo)
        );

        res.status(200).json({ message: 'Alterações salvas com sucesso!' });
    } catch (error) {
        console.error('Erro ao salvar as alterações:', error);
        res.status(500).json({ error: 'Erro ao salvar as alterações' });
    }
});

module.exports = router;