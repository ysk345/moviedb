const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the movie schema
const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  imgURL: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  
  //feature to work on: add a new "genre" everytime a new movie is created
  //Check if genre has been  created already first (check for caps, double spaces, and trim)

  genre: {
    type: String,
    required: true,
  },
  //embed the trailer from youtube
  // trailerURL: {
  //   type: String,
  //   required: false,
  // },
  director: {
    type: String,
    required: true,
  },
  //casting will be an array of strings (actors/actresses only)
  // cast: [{
  //   type: String,
  //   required: true,
  // }],
});

// Create the "movie" model
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
