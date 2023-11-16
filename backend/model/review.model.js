const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the review schema
const reviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: false,
  },
  movieID: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
 
  
});

// Create the "review" model
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
