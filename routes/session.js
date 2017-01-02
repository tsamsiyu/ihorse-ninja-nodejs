var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var UnprocessibleEntityHttpError = require('./http/UnprocessibleEntityHttpError');

router.options('/signup', function (req, res, next) {
  res.end();
});

router.post('/signup', function (req, res, next) {
  if (res.user) return next();

  if (req.body.User) {
    User.signup(req.body.User, function (err, user, errors) {
      if (err) return next(err);

      if (errors) {
        next(new UnprocessibleEntityHttpError(errors));
      } else {
        res.json({user: req.getAppUser(), token: user.authToken});
      }
    });
  } else {
    next(400);
  }
});

router.options('/signin', function (req, res, next) {
  res.end();
});

router.post('/signin', function (req, res, next) {
  if (res.user) return next(404);

  if (req.body.User) {
    User.signin(req.body.User, function (err, user, errors) {
      if (err) return next(err);

      if (errors) {
        next(new UnprocessibleEntityHttpError(errors));
      } else {
        req.setUser(user);
        res.json({user: req.getAppUser(), token: user.authToken});
      }
    });
  } else {
    next(400)
  }
});

router.post('/signout', function (req, res, next) {
  if (req.user) {
    req.session.destroy();
    res.json({status: true});
  } else {
    next(401)
  }
});

router.options('/session', function (req, res, next) {
  res.end();
});

router.get('/session', function (req, res, next) {
  res.json(req.getAppUser());
});

module.exports = router;
