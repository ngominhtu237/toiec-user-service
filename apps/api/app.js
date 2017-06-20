var express = require('express');
var queryHandler = require('express-api-queryhandler');
var bodyParser = require('body-parser');
var config = require('../../config/config');

var app = express();
app.use(queryHandler.fields());
app.use(queryHandler.filter());
app.use(queryHandler.pagination({ limit: 100 }));
app.use(queryHandler.sort());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DataContext
var mySqlDataContext = require('../../repository/mysql-context')(config.mysql);
var mongoDataContext = require('../../repository/mongo-context')(config.mongo);

//Repository
var UserRepository = require('../../repository/user-repository');
var UserProviderRepository = require('../../repository/user-provider-repository');
var TokenRepository = require('../../repository/token-repository');
var userRepository = new UserRepository(mySqlDataContext);
var userProviderRepository = new UserProviderRepository(mySqlDataContext);
var tokenRepository = new TokenRepository(mongoDataContext);

//Services
var AuthenService = require('../../services/authen-services');
var CustomerService = require('../../services/customer-services');
var TokenService = require('../../services/token-services');
var authenService = new AuthenService(userRepository, userProviderRepository);
var customerService = new CustomerService(userRepository, userProviderRepository);
var tokenService = new TokenService(tokenRepository);

//Controller
var AuthenController = require('../api/controllers/authen-controller');
//var CustomerController = require('../api/controllers/customer-controller');
var authenController = new AuthenController(authenService, tokenService);
//var customerController = new CustomerController(customerService)

require('./routes/authen-routes')(app, authenController);
//require('./routes/customer-routes')(app, customerController);

app.use(function (err, req, res, next) {
    console.error(new Date() + " - " + JSON.stringify(err, null, '\t'));

    if (err.type) {
        switch (err.type) {
            case 'Bad Request':
                res.status(400).send({ error: err });
                break;
            case 'Request Failed':
                res.status(502).send({ error: 'Request Failed' });
                break;
            case 'Not Found':
                res.status(404).send({ error: 'Not Found' });
                break;
            case 'Unauthorized':
                res.status(401).send('Unauthorized');
                break;
            case 'Duplicate':
                res.status(409).send('Duplicate');
                break;
        }
    } else if (err.oauthError) {
        return res.status(401).send('Unauthorized');
    } else {
        next(err);
    }
})

app.use(function (err, req, res, next) {
    res.status(500).send({ error: 'Something failed!' });
})

var port = config.port;
app.listen(port, function () {
    console.log("server is listening on port: ", port);
});

module.exports = app;
