const passport = require("passport");
const User = require("../model/user.model.js");
const config = require("../config.js");
const jwt = require("jwt-simple");

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // Error from passport middleware
    if (err) {
      return res.status(500).json({
        message: "Error during authentication",
        error: err.toString(),
      });
    }
    // If passport did not find a user, check if it's a user not found or wrong password scenario
    if (!user) {
      // "info" contains a message set by passport-local for missing username/password
      // You can customize this message based on the "info" content or just set a custom message
      const message =
        info.name === "IncorrectPasswordError"
          ? "Wrong password"
          : "User not found";
      return res.status(401).json({ message });
    }
    // If user is found, proceed to log in the user
    req.logIn(user, { session: false }, (loginErr) => {
      if (loginErr) {
        return res
          .status(500)
          .json({ message: "Error logging in", error: loginErr.toString() });
      }
      // User is authenticated, create a token
      const payload = {
        id: user.id,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
      };
      const token = jwt.encode(payload, config.jwtSecret);
      return res.json({ token });
    });
  })(req, res, next);
};

exports.register = function (req, res) {
  User.register(
    new User({
      email: req.body.email,
      username: req.body.username,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        return res.status(500).json({ err });
      }
      res.json({ message: "Successfully created new user.", user });
    }
  );
};

exports.profile = function (req, res) {
  res.json({
    message: "You made it to the secured profile",
    user: req.user,
    token: req.query.secret_token,
  });
};
