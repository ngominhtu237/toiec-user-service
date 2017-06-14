module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            type: DataTypes.STRING(14),
            unique: true,
            primaryKey: true,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(20),
            unique: true
        },
        firstName: {
            type: DataTypes.STRING(30)
        },
        lastName: {
            type: DataTypes.STRING(30)
        },
        birthday: {
            type: DataTypes.DATE
        },
        sex: {
            type: DataTypes.BOOLEAN
        },
        address: {
            type: DataTypes.STRING(200)
        }
    })
}