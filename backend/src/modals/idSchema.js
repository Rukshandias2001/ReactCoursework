const mongoose = require('mongoose');
const idSchema = new mongoose.Schema({
  id:String,
  type: String,
  bedrooms: Number,
  price: Number,
  tenure: String,
  description: String,
  location: String,
  plan: String,
  url: String,
  postalCode: String,
  map: String
});

const propertiesSchema = new mongoose.Schema({
  details: idSchema, // Define details as an embedded document
  added: {
    month: String,
    day: Number,
    year: Number
  },
  pictures: {
    picture: String,
    picture2: String,
    picture3: String
  }
});

const idProperty = mongoose.model('favourites',propertiesSchema);
module.exports= idProperty;