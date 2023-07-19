// participanteController.js

const { Participante } = require('../model/participante'); // Importe o modelo do Participante

// Controlador para atualizar o status do participante
module.exports.atualizarStatusParticipante = async (req, res) => {
  const idParticipante = req.body.idParticipante; // Obtenha o ID do participante do corpo da solicitação
  const novoStatus = req.body.novoStatus; // Obtenha o novo status do participante do corpo da solicitação

  try {
    // Encontre o participante pelo ID e atualize o status
    await Participante.update({ Status: novoStatus }, { where: { IDParticipante: idParticipante } });
    res.sendStatus(200); // Responda com status 200 (OK) para indicar que a atualização foi bem-sucedida
  } catch (error) {
    console.error('Erro ao atualizar o status do participante:', error);
    res.sendStatus(500); // Responda com status 500 (Erro do servidor) se houver algum erro
  }
};
