const XLSX = require('xlsx');

const ParticipanteProcesso = require('../model/participanteProcesso');
const Participante = require('../model/participante');


const atualizarProcesso = async (req, res) => {
  try {
    const arquivo = req.files.arquivo;
    const workbook = XLSX.read(arquivo.data, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const dados = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    for (let i = 1; i < dados.length; i++) {
        const participanteDados = dados[i];
        const nomeParticipante = participanteDados.Nome;
        const novoStatus = participanteDados.Status;
      
        // Encontre o participante pelo nome
        const participante = await Participante.findOne({ where: { Nome: nomeParticipante } });
      
        // Verifique se o participante foi encontrado
        if (participante) {
          // Atualize o status do participante na etapa desejada
          await ParticipanteProcesso.update(
            { Status: novoStatus },
            { where: { IDParticipante: participante.IDParticipante, IDEtapa: idEtapa } }
          );
        }
      }

    res.status(200).json({ mensagem: 'Status dos participantes atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar o status dos participantes:', error);
    res.status(500).json({ mensagem: 'Erro ao atualizar o status dos participantes' });
  }
};

module.exports = atualizarProcesso;