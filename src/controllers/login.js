const User = require("../model/User");
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken');

module.exports = {
    async pagLoginGet(req, res) {
        res.render('../views/Login', {erro: false});
    },
    async pagLoginPost(req, res) {
        try{
            const user = await User.findOne({
                attributes: ['id', 'RA', 'password'],
                where: {
                    RA: req.body.RA
                }
            })
            if (user === null) {
                return res.render('../views/Login', {erro: true});
            }
            if (!(await bcrypt.compare(req.body.password, user.password))) {
                return res.render('../views/Login', {erro: true});
            }
            
            // Tempo para expirar o Login
            var Token = jwt.sign({ id: user.id }, "JKL$&#*JISGD*#($SDH", {
                expiresIn: "1d" // 7Dias
            });

            res.redirect('/');
        }catch{
            return res.render('../views/Login', {erro: true});
        }

    }
}

