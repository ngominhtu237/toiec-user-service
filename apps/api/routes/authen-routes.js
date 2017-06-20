var passport = require('passport');

module.exports = function (app, authenController) {

    app.post('/authen/signup',
        localAuthen,
        authenController.signup,
        authenController.generateAccessToken,
        resAccessToken
    );

    app.post('/authen/signin',
        localAuthen,
        authenController.signin,
        authenController.generateAccessToken,
        resAccessToken
    );
}

function resAccessToken(req, res) {
    return res.status(200).send(res.authenObj);
}

function localAuthen(req, res, next) {
    req.user = {
        email: req.body.email,
        password: req.body.password,
        provider: 'LOCAL'
    }
    next();
}