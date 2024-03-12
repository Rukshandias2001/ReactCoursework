const express = require('express');
const router = express.Router();
const cartSchema = require('../modals/cartModule');

router.route('/add').post(async(req,res)=>{
  const {detail,price,added,pictures} = req.body;
  

  

});