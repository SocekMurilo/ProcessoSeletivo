module.exports = {
    async pagInicialGet(req, res){
        if (!req.session.RA)
            return res.redirect('/Login')
        res.render('../views/index');
    }
}