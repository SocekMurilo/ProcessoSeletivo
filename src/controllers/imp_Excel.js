const express = require('express');
const router = express.Router();
const XLSX = require('xlsx');
const Participante = require('./src/model/participante');

module.exports = {
    async Import_ExcelGet (req, res) {
        res.render('index');
    },
    async Import_ExcelPost (req, res) {

    const arquivo = req.files.arquivo;
    const workbook = XLSX.read(arquivo.data, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const dados = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
    dados.forEach((linha) => {
      const [nome, email, telefone] = linha;
      Participante.create({ nome, email, telefone });
    });
  
    res.send('Importação concluída com sucesso!');
  }
}
