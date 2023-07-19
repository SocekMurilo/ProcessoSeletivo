// Importando as tabelas do DB
const Participantes = require('../model/participante');
const Processo = require('../model/processos');
const Etapa = require('../model/etapas');
const ParticipanteProcesso = require('../model/participanteProcesso');
const Nota = require('../model/notas');

const XLSX = require('xlsx');
const moment = require('moment');
const { Op } = require('sequelize');

module.exports = async function importarDados(req, res) {

  if (!req.session.EDV)
    return res.redirect('/Login')

  const arquivo = req.files.arquivo;
  const workbook = XLSX.read(arquivo.data, { type: 'buffer' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const dados = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  const input = req.body;

  const novoProcesso = await Processo.create({
    Nome: input.nome,
    Data: input.data,
    NumEtapas: input.etapa
  });

  const etapas = [];
  for (let i = 1; i <= input.etapa; i++) {
    const nomeEtapa = req.body[`etapa${i}`];
    etapas.push({
      IDProcesso: novoProcesso.IDProcesso,
      Nome: nomeEtapa,
      Data: novoProcesso.Data,
      Turno: novoProcesso.IDProcesso
    });
  }

  await Etapa.bulkCreate(etapas);

  const participantes = [];

  dados.slice(1).forEach((linha) => {
    const [Nome, Telefone, Nascimento, Idade, Email, Cursos, Idiomas, Curriculo, Video, Nota] = linha;

    if (Nome) {
      const participante = {
        Nome,
        Telefone,
        Nascimento,
        Idade,
        Email,
        Cursos,
        Idiomas,
        Curriculo,
        Video,
        ParticipanteProcesso: {
          Status: 1
        },
        IDProcesso: novoProcesso.IDProcesso
      };

      participantes.push(participante);

      if (Nota) {
        participante.Nota = {
          Nota: Nota,
          IDEtapa: etapas[0].IDEtapa
        };
      }
    }
  });

  for (const participante of participantes) {
    const existingParticipante = await Participantes.findOne({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { Email: participante.Email },
              { Email: { [Op.ne]: 'Sem Formulário' } }
            ]
          },
          {
            [Op.and]: [
              { Telefone: String(participante.Telefone) },
              { Telefone: { [Op.ne]: 'Sem Formulário' } }
            ]
          }
        ]
      }
    });

    if (existingParticipante) {
      await ParticipanteProcesso.create({
        IDParticipante: existingParticipante.IDParticipante,
        IDProcesso: novoProcesso.IDProcesso
      });
      if (participante.Nota) {
        await Nota.create({
          Nota: participante.Nota.Nota,
          IDEtapa: participante.Nota.IDEtapa,
          IDParticipante: existingParticipante.IDParticipante
        });
      }
    } else {
      const newParticipante = await Participantes.create(participante);

      await ParticipanteProcesso.create({
        IDParticipante: newParticipante.IDParticipante,
        IDProcesso: novoProcesso.IDProcesso
      });
      if (participante.Nota) {
        await Nota.create({
          Nota: participante.Nota.Nota,
          IDEtapa: participante.Nota.IDEtapa,
          IDParticipante: newParticipante.IDParticipante
        });
      }
    }
  }

  res.render('index', { processo: novoProcesso.IDProcesso, etapas: [] });
};
