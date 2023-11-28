const User = require("../model/user.model")
const config = require("../config.js")
const jwt = require("jwt-simple");

exports.login = function (req, res) {
    User.findOne({ username: req.body.username })
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        var payload = { 
          id: user.id, 
          expire: Date.now() + 1000 * 60 * 60 * 24 * 7 
        };
  
        var token = jwt.encode(payload, config.jwtSecret);
  
        res.json({ token: token });
      })
      .catch(err => {
        console.log("Error:", err);
        res.status(500).json({ message: 'Internal server error' });
      });
  };

exports.register = function (req, res) {
  User.register(
    new User({ 
      username: req.body.username,
      email: req.body.email       
    }), req.body.password, function (err, msg) {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "Successful" });
      }
    }
  );
};

exports.profile = function(req, res) {
  res.json({
    message: 'You made it to the secured profile',
    user: req.user,
    token: req.query.secret_token
  })
}