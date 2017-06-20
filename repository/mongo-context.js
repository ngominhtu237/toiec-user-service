var mongoose = require('mongoose');

module.exports = function(config) {
    var db = mongoose.connect(config.connectionString, { uri_decode_auth: true });

    var TokenModel = require('./mongo-models/token');

    return {
        mongoContext: db,
        Token: TokenModel
    }
}