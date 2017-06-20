var UserRepository = function (dbContext) {
    this.dbContext = dbContext;
    this.User = dbContext.User;
}

UserRepository.prototype.findBy = function (condition, callback) {
    this.User
        .findOne({
            where: condition
        })
        .then(function (result) {
            callback(null, result.dataValues);
        })
        .catch(function (err) {
            callback(err, null);
        })
}

UserRepository.prototype.save = function (user, callback) {
    this.User
        .create(user)
        .then(function (result) {
            callback(null, result);
        })
        .catch(function (err) {
            callback(err, null);
        })
}

UserRepository.prototype.update = function (userId, user, callback) {
    this.User
        .update(user, {
            where: { 'id': userId }
        })
        .then(function (result) {
            if (result.every(function (val) {
                return val == 1;
            })) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        })
        .catch(function (err) {
            callback(err, null);
        })
}

module.exports = UserRepository;