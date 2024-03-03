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
  map: String
});

const propertiesSchema = new mongoose.Schema({
  details: propertyDetailsSchema, // Define details as an embedded document
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

const Property = mongoose.model('Property', propertiesSchema);
module.exports = Property;
