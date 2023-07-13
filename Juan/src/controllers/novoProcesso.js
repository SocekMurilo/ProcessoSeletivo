// Importando as tabelas do DB
const Participantes = require('../model/participante');
const Processo = require('../model/processos');
const Etapa = require('../model/etapas');
const ParticipanteProcesso = require('../model/participanteProcesso');

const XLSX = require('xlsx');
const moment = require('moment');
const { Op } = require('sequelize');

module.exports = async function importarDados(req, res) {
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

    dados.slice(1).forEach((linha) => { // Ignora a primeira linha, que contém os nomes das colunas
      const [Nome, Telefone, Nascimento, Idade, Email, Cursos, Idiomas, Curriculo, Video] = linha;
    
      // Verifica se o campo 'Nome' está preenchido
      if (Nome) {
        participantes.push({
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
        });
      }
    });
  
    for (const participante of participantes) {
      const existingParticipante = await Participantes.findOne({
        where: 
        {
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
      } else {
        const newParticipante = await Participantes.create(participante);
  
        await ParticipanteProcesso.create({
          IDParticipante: newParticipante.IDParticipante,
          IDProcesso: novoProcesso.IDProcesso
        });
      }
    }
  
    res.render('index', { processo: novoProcesso.IDProcesso });
  };
  
    
      

  