module.exports = {
    user: (app, req, res) => {
        req.assert('nome', 'O nome é obrigatorio.').notEmpty();
        req.assert('email', 'O e-mail esta invalido.').notEmpty().isEmail();

        let errors = req.validationErrors();
        if(errors) {
            app.utils.error.send(errors, req, res);
            return false;
        } else {
            return true;
        }

    }
};