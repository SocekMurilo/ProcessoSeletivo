const Sequelize = require("sequelize");
const User = require("../model/User")

module.exports = {
    async pagCadastroGet(req, res) {
        var dados = req.body;
        dados.password = await bcrypt.hash(dados.password, 8);

        await User.create(dados)
            .then(() => {
                return res.json({
                    erro: false,
                    mensagem: "Usuário Valido"
                })
            }).catch(() => {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Usuário Invalido"
                })
            })
        return res.render('../views/Login');
    }
}

var Cadastro = module.exports;
