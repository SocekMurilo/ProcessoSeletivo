const User = require("../model/User")
const bcrypt = require('bcryptjs')

module.exports = {
    async pagCadastroPost(req, res) {
        var dados = req.body;
        dados.password = await bcrypt.hash(dados.password, 8);

        await User.create(dados)
            .then(() => {
                return res.json({
                    mensagem: "Usuário Valido"
                })
            }).catch(() => {
                return res.status(400).json({
                    mensagem: "Usuário Invalido"
                })
            })
        return res.render('../views/Login');
    }
}

var Cadastro = module.exports;