const Genre = require('./model/genre.model');
const Movie = require('./model/movie.model');
const Review = require('./model/review.model');
const User = require('./model/user.model');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(
  session({
    secret: 'WebKaholics',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session()); 

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect password' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

  // Passport serialize and deserialize user methods
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Login route
app.post('/api/users/login', passport.authenticate('local'), (req, res) => {
  // Successful authentication, send back the user information
  res.json(req.user);
});

// Profile route (requires authentication)
app.get('/api/users/profile', (req, res) => {
  if (req.isAuthenticated()) {
    // If the user is authenticated, send back the user information
    res.json(req.user);
  } else {
    // If not authenticated, return an error status
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Update user profile route
app.put('/api/users/profile', async (req, res) => {
  const userId = req.user._id; // Assuming we are storing user information in req.user after authentication
  const { username, email } = req.body;

  try {
    // Check if the new username or email already exists
    const existingUser = await User.findOne({ $and: [{ _id: { $ne: userId } }, { $or: [{ username }, { email }] }] });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Update user information
    const updatedUser = await User.findByIdAndUpdate(userId, { username, email }, { new: true });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Define routes for movies
//Endpoint - add movie
app.post('/add', async (req, res) => {
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
app.post('/api/genres', (req, res) => {
  const newGenre = new Genre(req.body);
  newGenre.save()
    .then(genre => {
      res.json(genre);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Database connection
mongoose.connect('mongodb+srv://ysk345:2wTYkXrUEqf8hfcP@cluster0.u7rsivo.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("DB connected...");
});

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

//get all movies
app.get('/api/movies', (req, res) => {
  Movie.find()
    .then(movies => {
      res.json(movies);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Movies Database" });
  });

  //fetch a single movie
app.get('/api/movies/:movieId', (req, res) => {
  const movieId = req.params.movieId;
  Movie.findById(movieId)
    .then(movie => {
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      res.json(movie);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

app.put('/api/movies/:movieId', (req, res) => {
  const movieId = req.params.movieId;
  const updatedData = req.body;

  Movie.findByIdAndUpdate(movieId, updatedData, { new: true })
    .then(updatedMovie => {
      if (!updatedMovie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      res.json(updatedMovie);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Find movies by name
app.get('/api/movies/search', (req, res) => {
  const title = req.query.name;
  console.log('Searching for movie:', title); //check title to debug 
  const regex = new RegExp(title, 'i');
  console.log('Regex:', regex);
  const query = { title: { $regex: regex } };
  console.log('Query:', query);
  Movie.find(query)
    .then(movies => {
      res.json(movies);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});



app.delete('/api/movies/:movieId', (req, res) => {
  const movieId = req.params.movieId;
  Movie.findByIdAndRemove(movieId)
    .then(deletedMovie => {
      if (!deletedMovie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      res.json(deletedMovie);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Delete all movies
app.delete('/api/movies', (req, res) => {
    Movie.deleteMany({})
      .then(() => {
        res.json({ message: 'All movies deleted' });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  

app.get('/api/genres', (req, res) => {
  Genre.find()
    .then(genres => {
      res.json(genres);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

//REVIEWS
// Create a new review
app.post('/api/reviews', async (req, res) => {
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
app.get('/api/reviews', (req, res) => {
  Review.find()
    .then(reviews => {
      res.json(reviews);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Search for reviews by movie title
app.get('/api/reviews/search', (req, res) => {
  // Check if title is present in the query parameters
  const title = req.query.title ? req.query.title.trim() : '';

  // If title is empty, return an empty array
  if (!title) {
    res.json([]);
    return;
  }

  // First, find the movie with the given title
  Movie.findOne({ title: { $regex: new RegExp(title, 'i') } })
    .then(movie => {
      if (!movie) {
        // If no movie is found, return an empty array
        res.json([]);
      } else {
        // If a movie is found, find all reviews that reference this movie
        Review.find({ movieID: movie._id })
          .then(reviews => {
            res.json(reviews);
          })
          .catch(err => {
            res.status(500).json({ error: err.message });
          });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Get a review by id
app.get('/api/reviews/:reviewId', (req, res) => {
  const reviewId = req.params.reviewId;
  
  Review.findById(reviewId)
    .then(review => {
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
      
      res.json(review);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Update a review by id
app.put('/api/reviews/:reviewId', (req, res) => {
  const reviewId = req.params.reviewId;
  const updatedData = req.body;
  
  Review.findByIdAndUpdate(reviewId, updatedData, { new: true })
    .then(updatedReview => {
      if (!updatedReview) {
        return res.status(404).json({ error: 'Review not found' });
      }
      
      res.json(updatedReview);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Delete a review by id
app.delete('/api/reviews/:reviewId', (req, res) => {
  const reviewId = req.params.reviewId;
  
  Review.findByIdAndRemove(reviewId)
    .then(deletedReview => {
      if (!deletedReview) {
        return res.status(404).json({ error: 'Review not found' });
      }
      
      res.json(deletedReview);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

//USERS
//Creating new user
app.post('/api/users/register', async (req, res) => {
  const { username, email, password } = req.body;

  //check if user exists
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const newUser = new User({ username, email, password });
    //using bcrypt to hash the password
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();

    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(8081, () => {
  console.log("Server is running on 8081....");
});
