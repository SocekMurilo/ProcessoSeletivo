// const Participante = require('../models/participante');

// exports.getIndex = (req, res) => {
//   Participante.findAll().then((participantes) => {
//     res.render('index', { participantes });
//   });
// };

module.exports = {
    async pagInicialGet(req, res){
        if (!req.session.RA)
            return res.redirect('/Login')
        res.render('../views/index');
    }
}