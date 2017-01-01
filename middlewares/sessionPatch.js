var User = require('../models/user').User;
var Profile = require('../models/user').Profile;
var lookup = require('lodash/get');

module.exports = function (req, res, next) {
    req.setUser = function(user) {
        if (!user instanceof User) {
            throw new Error('User must implements interface `User`');
        }
        this.user = user;
        return this;
    };

    req.getAppUser = function() {
        if (this.user instanceof User) {
            return {
                isGuest: false,
                email: this.user.email,
                login: this.user.login,
                firstName: lookup(this.user, 'profile.firstName'),
                lastName: lookup(this.user, 'profile.lastName')
            };
        } else {
            return {isGuest: true};
        }
    };

    let authHeader = req.headers.authorization;
    if (authHeader && authHeader.length === 71) {
        const token = authHeader.substr(7);
        User.findOne({authToken: token}).populate('profile').exec((err, user) => {
            if (err) return next(err);
            req.setUser(user);
            next();
        });
    } else {
        next();
    }
};