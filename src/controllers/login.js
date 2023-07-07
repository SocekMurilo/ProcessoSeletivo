
const Sequelize = require("sequelize");
const User = require("../model/User");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


module.exports = {
    async pagLoginGet(req, res) {
        res.render('../views/Login', { erro: false });
    },
    async pagLoginPost(req, res) {
        // console.log(req.session)

        if (Number(req.body.RA) == NaN)
            return res.render('../views/Login', { erro: true });
        

        const user = await User.findOne({
            raw: true,
            attributes: ['id', 'RA', 'password'],
            where: {
                RA: req.body.RA
            }
        })
        if (user == null) {
            return res.render('../views/Login', { erro: true });
        }
        if (!(await bcrypt.compare(req.body.password, user.password))) {
            return res.render('../views/Login', { erro: true });
        }
        
        session = req.session;
        session.RA = user.RA;

        // console.log(session)

        res.redirect('/');

    },
    async pagLogoutGet(req, res) {
        req.session.destroy();
        res.redirect('/Login');
    }
}

// Tempo para expirar o Login
// var Token = jwt.sign({ id: user.id }, "JKL$&#*JISGD*#($SDH", {
//     expiresIn: "1d" // 7Dias
// });
