//middleware for JSON Web Tokens (JWT)
var User = require("../model/user.model.js");
var passport = require("passport");
var passportJWT = require("passport-jwt");
var config = require("../config.js");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;

var params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  };

  //The newer versions of Mongoose use Promises instead of callbacks for most functions.
  module.exports = function () {
    var strategy = new Strategy(params, function (payload, done) {
      User.findById(payload.id)
        .then((user) => {
          if (!user) {
            return done(new Error("UserNotFound"), null);
          } else if (payload.expire <= Date.now()) {
            return done(new Error("TokenExpired"), null);
          } else {
            return done(null, user);
          }
        })
        .catch((err) => {
          return done(err, null);
        });
    });

passport.use(strategy);

  return { initialize: function() { return passport.initialize() }};
};