module.exports = {
    port: 3000,
    mysql: {
        username: 'root',
        password : 'caocaolatre',
        database: 'toiecdb',
        host: 'toiec-db.c4xi3jtduch9.us-east-2.rds.amazonaws.com',
        dialect: "mysql"
    },
    mongo: {
        connectionString: 'mongodb://peterngo:nmtdat@ds131742.mlab.com:31742/toiectest'
    },
    authen: {
        secret: 'ilove',
        tokenExpiresIn: 604800,
        refreshTokenExpiresIn: 804800
    }
}