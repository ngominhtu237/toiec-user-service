var async = require('async');
var objectAssign = require('object-assign');
var bcrypt = require('bcryptjs');
var shortid = require('shortid');

var AuthenService = function (userRepository, userProviderRepository) {
    this.userRepository = userRepository;
    this.userProviderRepository = userProviderRepository;
}

AuthenService.prototype.localSignup = function (email, password, callback) {
    var self = this;

    self.userProviderRepository.findBy({
        email: email,
        providerType: 'LOCAL'
    }, function (err, userProvider) {
        if (!userProvider) {

            bcrypt.hash(password, 15, function (err, hash) {
                if (err) callback(err, null);

                var userIdGene = shortid.generate();
                var user = {
                    id: userIdGene
                }

                var userProvider = {
                    userId: userIdGene,
                    providerType: 'LOCAL',
                    email: email,
                    password: hash
                }

                self.userRepository.save(user, function (err, result) {
                    self.userProviderRepository.save(userProvider, function (err, result) {
                        callback(null, userProvider);
                    })
                })
            })
        } else {
            return callback({ type: 'Duplicate' })
        }
    })
}

AuthenService.prototype.localLogin = function(email, password, callback) {
    var self = this;

    self.userProviderRepository.findBy({
        email: email,
        providerType: 'LOCAL'
    }, function (err, userProvider) {
        if (!userProvider) callback({ type: 'Unauthorized' })

        bcrypt.compare(password, userProvider.password, function (err, res) {
            if (err) callback(err);
            if (res === true) {
                callback(null, userProvider);
                //getUserByUserId(self, userProvider.userId, callback);
            } else {
                return callback({
                    type: 'Unauthorized'
                })
            }
        });
    })
}

module.exports = AuthenService;