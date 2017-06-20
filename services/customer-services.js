var async = require('async');
var objectAssign = require('object-assign');
var bcrypt = require('bcryptjs');
var shortid = require('shortid');

var CustomerService = function (userRepository, userProviderRepository) {
    this.userRepository = userRepository;
    this.userProviderRepository = userProviderRepository;
}

module.exports = CustomerService;