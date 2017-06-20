var Sequelize = require('sequelize');

var MySQLContext = function(config) {
    
    var sequelize = new Sequelize(config.database, config.username, config.password, config);

    var User = sequelize.import('./mysql-models/user');
    var UserProvider = sequelize.import('./mysql-models/user-provider');

    return {
        User: User,
        UserProvider: UserProvider,
        sequelize: sequelize
    }
}

module.exports = MySQLContext;