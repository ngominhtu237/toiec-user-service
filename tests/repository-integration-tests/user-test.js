var chai = require('chai');
var assert = chai.assert;

var shortid = require('shortid');
var config = require('../../config/config');

var MySQLContext = require('../../repository/mysql-context');
var UserRepository = require('../../repository/user-repository');

var mysqlContext = MySQLContext(config.mysql);
var userRepository = new UserRepository(mysqlContext);

describe('Save new User', function () {
    it('must persist success and correctly', function (done) {
        this.timeout(18000);

        mysqlContext.sequelize.sync().then(function () {
            var userId = shortid.generate();

            var userObj = {
                id: userId,
                firstName: 'Tu',
                lastName: 'Ngo',
                phone: '01638558868'
            }

            userRepository.save(userObj, function (err, result) {
                assert.equal(result.id, userObj.id);
                assert.equal(result.firstName, userObj.firstName);
                assert.equal(result.lastName, userObj.lastName);

                done();
            });
        })
    })
})

// describe('Get exist User by id', function () {
//     it('must get correct data', function (done) {
//         this.timeout(18000);

//         mysqlContext.sequelize.sync().then(function () {
//             var userId = shortid.generate();

//             var userObj = {
//                 id: userId,
//                 firstName: 'Phan Xu',
//                 lastName: 'Nguoi',
//                 phone: '01638558869'
//             }

//             userRepository.save(userObj, function (err, result) {
//                 userRepository.findBy({ id: userId }, function (err, result) {
//                     assert.equal(result.id, userObj.id);
//                     assert.equal(result.firstName, userObj.firstName);
//                     assert.equal(result.lastName, userObj.lastName);

//                     done();
//                 })
//             });
//         })
//     })
// })

// describe('Update exist User', function () {
//     it('pdate success and correctly', function (done) {
//         this.timeout(18000);

//         mysqlContext.sequelize.sync().then(function () {
//             var userId = shortid.generate();
//             var saltKey = shortid.generate();

//             var userObj = {
//                 id: userId,
//                 firstName: 'Phan Xu',
//                 lastName: 'Nguoi',
//                 phone: '0163313313'
//             }

//             userRepository.save(userObj, function (err, result) {
//                 userRepository.update(userId, { sex: true, phone: '0900007789', lastname: 'Dai CA' }, function (err, user) {
//                     userRepository.findBy({ id: userId }, function (err, result) {
//                         assert.equal(result.id, userObj.id);
//                         assert.equal(result.firstName, userObj.firstName);
//                         assert.equal(result.phone, '0900007789');
//                         assert.equal(result.sex, true);

//                         done();
//                     })
//                 })
//             });
//         })
//     })
// })
