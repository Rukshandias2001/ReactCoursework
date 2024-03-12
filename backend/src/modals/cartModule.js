const mongoose = require('mongoose');
const cartSchema  = new mongoose.Schema({
  id: String,
  type: String,
  bedrooms: Number,
  tenure: String,
  description: String,
  location: String,
  plan: String,
  url: String,
  postalCode: String,
  map: String
  
  
}) 

const priceSchema = new mongoose.Schema({
  price: Number,
})

const propertiesSchema = new mongoose.Schema({
  details: cartSchema, // Define details as an embedded document
  price:[priceSchema],
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

const properties = mongoose.model('carts',propertiesSchema);
module.exports = properties;