const mongoose = require('mongoose');

const propertyDetailsSchema = new mongoose.Schema({
  id: String,
  type: String,
  bedrooms: Number,
  price: Number,
  tenure: String,
  description: String,
  location: String,
  plan: String,
  url: String,
  postalCode: String,
  map: String,
  pictures:String
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  favorites: [propertyDetailsSchema] // Embedding property details as an array of favorites
});

const User = mongoose.model('User', userSchema);

module.exports = User;
