module.exports = function (sequelize, DataTypes) {
    return sequelize.define('userprovider', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.STRING(14),
            allowNull: false
        },
        providerId: {
            type: DataTypes.STRING(50)
        },
        providerType: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(30)
        },
        password: {
            type: DataTypes.STRING(512)
        },
        providerInfo: {
            type: DataTypes.TEXT
        }
    })
}