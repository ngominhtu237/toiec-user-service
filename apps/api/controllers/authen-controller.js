var dependencies = {
    authenService: null,
    tokenService: null
}

function AuthenController(authenService, tokenService) {
    dependencies.authenService = authenService;
    dependencies.tokenService = tokenService;
}

AuthenController.prototype.signup = function (req, res, next) {
    dependencies.authenService.localSignup(req.user.email, req.user.password, function (err, user) {
        if (err) {
            next(err);
        } else {
            req.user = user;
            next();
        }
    })
}

AuthenController.prototype.signin = function (req, res, next) {
    switch (req.user.provider) {
        case "LOCAL":
            dependencies.authenService.localLogin(req.user.email, req.user.password, function (err, user) {
                if (err) {
                    next(err);
                } else {
                    req.user = user;
                    next();
                }
            })
            break;
    }
}

AuthenController.prototype.generateAccessToken = function(req, res, next) {
    dependencies.tokenService.generateAccessToken(req.user, function (err, authenObj) {
        if (err) {
            next(err);
        } else {
            res.authenObj = authenObj;
            next();
        }
    })
}

module.exports = AuthenController;