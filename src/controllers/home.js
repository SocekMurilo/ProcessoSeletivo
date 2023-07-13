module.exports = {
    async pagInicialGet(req, res){
        if (!req.session.EDV)
            return res.redirect('/Login')
        res.render('../views/index');
    }
}