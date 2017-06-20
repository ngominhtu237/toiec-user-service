var jwt = require('jsonwebtoken'),
    UUID = require('node-uuid'),
    config = require('../config/config');

var TokenService = function (tokenRepository) {
    this.tokenRepository = tokenRepository;
}

TokenService.prototype.generateAccessToken = function (userInfo, callback) {
    delete userInfo.providers;

    var authenObj = signAccessToken(userInfo);

    this.tokenRepository.saveRefreshToken(authenObj.accessToken, authenObj.refreshToken, function (err, result) {
        if (err) {
            callback(err, null);
        }
        else {
            return callback(null, authenObj);
        }
    });
}

// TokenService.prototype.refreshToken = function (accessToken, refreshToken, userInfo, callback) {
//     this.tokenRepository.getRefreshToken(refreshToken, accessToken, function (err, result) {
//         if (err) return callback(err);

//         if (result) this.generateAccessToken(userInfo, callback)
//         else return callback({ type: 'Unauthorized' });
//     });
// }

function signAccessToken(userInfo) {
    return {
        refreshToken: UUID.v4(),
        expiresIn: config.authen.tokenExpiresIn,
        accessToken: jwt.sign(userInfo, config.authen.secret, {
            expiresIn: config.authen.tokenExpiresIn
        })
    };
}

module.exports = TokenService;