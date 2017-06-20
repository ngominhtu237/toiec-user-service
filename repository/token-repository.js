var TokenRepository = function (mongoDbContext) {
    this.dbContext = mongoDbContext.mongoContext;
    this.Token = mongoDbContext.Token;
}

TokenRepository.prototype.saveRefreshToken = function (accessToken, refreshToken, callback) {
    var refreshTokenObj = new this.Token({
        'accessToken': accessToken,
        'refreshToken': refreshToken
    });

    refreshTokenObj.save()
        .then(function (result) {
            callback(null, result);
        })
        .catch(function (err) {
            callback(err, null);
        })
}

// TokenRepository.prototype.getRefreshToken = function (accessToken, refreshToken, callback) {
//     this.Token.findOne({
//         'refreshToken': refreshToken,
//         'accessToken': accessToken
//     })
//         .exec()
//         .then(function (result) {
//             callback(null, result);
//         })
//         .catch(function (err) {
//             callback(err, null);
//         })
// }

// TokenRepository.prototype.deleteRefreshToken = function () {

// }

module.exports = TokenRepository;