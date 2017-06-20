module.exports = {
    port: 3000,
    mysql: {
        username: 'root',
        password : '',
        database: 'toiec-source',
        host: '',
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