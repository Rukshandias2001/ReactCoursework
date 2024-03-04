const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username:{
    type:String,
    unique:true
  },
  password:{
    type:String,
    
  }
})
const user = mongoose.model('userSchema',userSchema);
module.exports = user;