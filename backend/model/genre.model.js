const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Genre schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

// Create the "genre" model
const Genre = mongoose.model('Genre', categorySchema);

module.exports = Genre;
