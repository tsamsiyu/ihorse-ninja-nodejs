// const crypto = require('crypto');
// const mongoose = require('mongoose');
// const userValidators = require('../../validators/user').validators;
// const Profile = require('./Profile').Profile;
// const validate = require('../../libs/validate');
//
// const Schema = mongoose.Schema;
//
// const schema = new Schema({
//     login: {
//         type: String
//     },
//     email: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     hashedPassword: {
//         type: String,
//         required: true
//     },
//     salt: {
//         type: String,
//         required: true
//     },
//     authToken: {
//         type: String,
//         required: true
//     },
//     created: {
//         type: Date,
//         default: Date.now
//     }
// });
//
// schema.methods.encryptPassword = function (password) {
//     return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
// };
//
// schema.methods.generateAuthToken = function () {
//     this.authToken = crypto.randomBytes(32).toString('hex');
// };
//
// schema.virtual('password')
//     .set(function (password) {
//         this._plainPassword = password;
//         this.salt = Math.random() + '';
//         this.hashedPassword = this.encryptPassword(password);
//     })
//     .get(function () {
//         return this._plainPassword;
//     });
//
// schema.virtual('profile', {
//     ref: 'Profile',
//     localField: '_id',
//     foreignField: 'userId'
// });
//
// var User = mongoose.model('User', schema);
//
// User.signup = function (attributes, cb) {
//     userValidators.signup(attributes).then(function (validatedUser) {
//         var user = new User;
//         user.fill(attributes, ['login', 'email', 'password']);
//         user.generateAuthToken();
//
//         var profile = new Profile;
//         profile.fill(attributes, ['firstName', 'lastName', 'birthday']);
//
//         user.save(function (uErr, uModel, uAffected) {
//             if (uErr) return cb(uErr);
//             profile.set('userId', user.get('_id')).save((pErr, profile) => {
//                 cb(pErr, user);
//             });
//         });
//     }, function (errors) {
//         cb(null, null, errors);
//     });
// };
//
// User.signin = function (attributes, cb) {
//     userValidators.signin(attributes).then(function (validatedUser) {
//         const {email, login} = attributes;
//         let query = {};
//         if (email) {
//             query.email = email;
//         } else {
//             query.login = login;
//         }
//         User.findOne(query, function (err, user) {
//             if (err) return cb(err);
//             if (user && user.encryptPassword(attributes.password) === user.hashedPassword) {
//                 cb(null, user);
//             } else {
//                 cb(null, null, {password: "Such user doesn't exist"});
//             }
//         });
//     }, function (errors) {
//         cb(null, null, errors);
//     });
// };
//
// module.exports.User = User;