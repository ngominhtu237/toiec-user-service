var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    config = require('../../config/config')

var Token = new Schema({
    accessToken: String,
    refreshToken: String,
    expiredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

var TokenModel = mongoose.model('Token', Token);

module.exports = TokenModel;