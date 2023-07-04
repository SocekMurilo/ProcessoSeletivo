// const Participante = require('../models/participante');

// exports.getIndex = (req, res) => {
//   Participante.findAll().then((participantes) => {
//     res.render('index', { participantes });
//   });
// };

module.exports = {
    async pagInicialGet(req, res){
        res.render('../views/index');
    }
}