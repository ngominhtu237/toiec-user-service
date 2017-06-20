var UserProviderRepository = function (dbContext) {
    this.dbContext = dbContext;
    this.UserProvider = dbContext.UserProvider;
}

UserProviderRepository.prototype.findBy = function(condition, callback) {
    this.UserProvider
    .findOne({
        where : condition
    })
    .then(function(result){
        callback(null, result.dataValues);
    })
    .catch(function(err){
        callback(err, null);
    })
}

UserProviderRepository.prototype.save = function(userProvider, callback) {
    if(userProvider.providerInfo) userProvider.providerInfo = JSON.stringify(userProvider.providerInfo);

    this.UserProvider
    .create(userProvider)
    .then(function(result){
        callback(null, result);
    })
    .catch(function(err){
        callback(err, null);
    })
}

module.exports = UserProviderRepository;