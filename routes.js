const express = require('express');
const router = express.Router();
const XLSX = require('xlsx');
const Participante = require('./src/model/participante');
const home = require('./src/controllers/home');
const login = require('./src/controllers/login');
const Import = require ('./src/controllers/imp_Excel')

router.get('/', home.pagInicialGet);
router.post('/', login.pagLoginPost);
router.get('/Login', login.pagLoginGet)
router.get('/Logout', login.pagLogoutGet);
router.get('/importar-excel', Import.Import_ExcelGet);
router.post('/importar-excel', Import.Import_ExcelPost);
module.exports = router;
