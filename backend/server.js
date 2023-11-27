const Genre = require("./model/genre.model");
const Movie = require("./model/movie.model");
const Review = require("./model/review.model");
const User = require("./model/user.model");
const config = require("./config.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const jwt = require("jwt-simple");
const accountController = require("./controllers/accountContraller.js");
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
app.use(bodyParser.urlencoded({ extended: false }));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
const params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
app.use(
  session({
    secret: "WebKaholics",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// Define routes for movies
//Endpoint - add movie
app.post("/add", async (req, res) => {
  const newMovie = new Movie(req.body);

  try {
    // Check if the genre already exists
    const genreName = req.body.genre;
    const existingGenre = await Genre.findOne({ name: genreName });

    if (!existingGenre) {
      // Genre doesn't exist, create a new one
      const newGenre = new Genre({ name: genreName });
      await newGenre.save();
    }

    // Save the movie
    const movie = await newMovie.save();

    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Define routes for Genres
app.post("/api/genres", (req, res) => {
  const newGenre = new Genre(req.body);
  newGenre
    .save()
    .then((genre) => {
      res.json(genre);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Database connection
mongoose.connect(
  "mongodb+srv://ysk345:2wTYkXrUEqf8hfcP@cluster0.u7rsivo.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("DB connected...");
});

connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

//get all movies
app.get("/api/movies", (req, res) => {
  Movie.find()
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Movies Database" });
});

//fetch a single movie
app.get("/api/movies/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
      }
      res.json(movie);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.put("/api/movies/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  const updatedData = req.body;

  Movie.findByIdAndUpdate(movieId, updatedData, { new: true })
    .then((updatedMovie) => {
      if (!updatedMovie) {
        return res.status(404).json({ error: "Movie not found" });
      }
      res.json(updatedMovie);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Find movies by name
app.get("/api/movies/search", (req, res) => {
  const title = req.query.name;
  console.log("Searching for movie:", title); //check title to debug
  const regex = new RegExp(title, "i");
  console.log("Regex:", regex);
  const query = { title: { $regex: regex } };
  console.log("Query:", query);
  Movie.find(query)
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.delete("/api/movies/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  Movie.findByIdAndRemove(movieId)
    .then((deletedMovie) => {
      if (!deletedMovie) {
        return res.status(404).json({ error: "Movie not found" });
      }
      res.json(deletedMovie);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Delete all movies
app.delete("/api/movies", (req, res) => {
  Movie.deleteMany({})
    .then(() => {
      res.json({ message: "All movies deleted" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.get("/api/genres", (req, res) => {
  Genre.find()
    .then((genres) => {
      res.json(genres);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//REVIEWS
// Create a new review
app.post("/api/reviews", async (req, res) => {
  const newReview = new Review(req.body);

  try {
    // Save the review
    const review = await newReview.save();

    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all reviews
app.get("/api/reviews", (req, res) => {
  Review.find()
    .then((reviews) => {
      res.json(reviews);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Search for reviews by movie title
app.get("/api/reviews/search", (req, res) => {
  // Check if title is present in the query parameters
  const title = req.query.title ? req.query.title.trim() : "";

  // If title is empty, return an empty array
  if (!title) {
    res.json([]);
    return;
  }

  // First, find the movie with the given title
  Movie.findOne({ title: { $regex: new RegExp(title, "i") } })
    .then((movie) => {
      if (!movie) {
        // If no movie is found, return an empty array
        res.json([]);
      } else {
        // If a movie is found, find all reviews that reference this movie
        Review.find({ movieID: movie._id })
          .then((reviews) => {
            res.json(reviews);
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Get a review by id
app.get("/api/reviews/:reviewId", (req, res) => {
  const reviewId = req.params.reviewId;

  Review.findById(reviewId)
    .then((review) => {
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }

      res.json(review);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Update a review by id
app.put("/api/reviews/:reviewId", (req, res) => {
  const reviewId = req.params.reviewId;
  const updatedData = req.body;

  Review.findByIdAndUpdate(reviewId, updatedData, { new: true })
    .then((updatedReview) => {
      if (!updatedReview) {
        return res.status(404).json({ error: "Review not found" });
      }

      res.json(updatedReview);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Delete a review by id
app.delete("/api/reviews/:reviewId", (req, res) => {
  const reviewId = req.params.reviewId;

  Review.findByIdAndRemove(reviewId)
    .then((deletedReview) => {
      if (!deletedReview) {
        return res.status(404).json({ error: "Review not found" });
      }

      res.json(deletedReview);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.get("/", (req, res) => {
  res.send("Introduction JWT Auth");
});
app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  accountController.profile
);
app.post("/login", accountController.login);
app.post("/register", accountController.register);

module.exports = function () {
  var strategy = new Strategy(params, function (payload, done) {
    User.findById(payload.id, function (err, user) {
      if (err) {
        return done(new Error("UserNotFound"), null);
      } else if (payload.expire <= Date.now()) {
        return done(new Error("TokenExpired"), null);
      } else {
        return done(null, user);
      }
    });
  });

  passport.use(strategy);

  return {
    initialize: function () {
      return passport.initialize();
    },
  };
};
app.listen(8081, () => {
  console.log("Server is running on 8081....");
});
